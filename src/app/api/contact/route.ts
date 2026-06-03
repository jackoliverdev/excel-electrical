import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@excelelectrics.com";
// Until the sending domain is verified in Resend, fall back to the shared test sender.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Excel Electrics <onboarding@resend.dev>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string, remoteip: string | null): Promise<boolean> {
  // If no secret is configured (e.g. local without keys), skip verification gracefully.
  if (!TURNSTILE_SECRET) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret: TURNSTILE_SECRET, response: token });
    if (remoteip) body.append("remoteip", remoteip);

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verification error", err);
    return false;
  }
}

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10MB total across all attachments
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ ok: false, error: "Email service is not configured." }, { status: 500 });
  }

  // Construct lazily (inside the handler) so the build never fails when the key is absent.
  const resend = new Resend(process.env.RESEND_API_KEY);

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "company" field. Pretend success so bots get no signal.
  if (String(formData.get("company") ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const turnstileToken = String(formData.get("turnstileToken") ?? "");
  const remoteip = request.headers.get("CF-Connecting-IP") ?? request.headers.get("x-forwarded-for");
  const humanVerified = await verifyTurnstile(turnstileToken, remoteip);
  if (!humanVerified) {
    return Response.json(
      { ok: false, error: "Verification failed. Please refresh and try again." },
      { status: 400 },
    );
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "Please complete your name, email and message." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const files = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length > MAX_FILES) {
    return Response.json({ ok: false, error: `Please attach no more than ${MAX_FILES} files.` }, { status: 400 });
  }

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > MAX_TOTAL_BYTES) {
    return Response.json({ ok: false, error: "Attachments are too large (10MB total maximum)." }, { status: 400 });
  }

  const invalidFile = files.find((file) => file.type && !ALLOWED_FILE_TYPES.includes(file.type));
  if (invalidFile) {
    return Response.json(
      { ok: false, error: "Attachments must be images, PDFs or Word documents." },
      { status: 400 },
    );
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : "Not provided";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const attachmentNote = attachments.length
    ? `<p style="margin: 16px 0 0; color: #475569; font-size: 13px;">${attachments.length} attachment(s) included.</p>`
    : "";

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.5;">
      <h2 style="margin: 0 0 16px; color: #4b378c;">New website enquiry</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
      <p style="margin: 0 0 8px;"><strong>Phone:</strong> ${safePhone}</p>
      <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
      <p style="margin: 0; padding: 12px 16px; background: #f4f1fb; border-left: 3px solid #905bf4; border-radius: 4px;">${safeMessage}</p>
      ${attachmentNote}
    </div>
  `;

  const text = [
    "New website enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    "Message:",
    message,
    attachments.length ? `\n${attachments.length} attachment(s) included.` : "",
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      html,
      text,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return Response.json({ ok: false, error: "Could not send your message. Please try again." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return Response.json({ ok: false, error: "Could not send your message. Please try again." }, { status: 500 });
  }
}
