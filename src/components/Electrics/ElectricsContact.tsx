"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ElectricsSection } from "@/components/Electrics/ElectricsSection";
import { LightningBolt } from "@/components/Electrics/LightningBolt";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]";

const inputClass =
  "w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-[var(--text-muted)] focus:border-[#905bf4] focus:ring-2 focus:ring-[#905bf4]/25 focus:ring-offset-0";

/** Muted blue → full blue on hover */
const submitPrimaryBtn =
  "mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#905bf4]/82 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#905bf4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#905bf4]/45 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:self-start";

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10MB total across all attachments

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function ElectricsContact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const accentRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    const frame = window.requestAnimationFrame(updateIsMobile);
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Left accent charges top → bottom as the contact details scroll into view (same clip fill as the bolts).
  const { scrollYProgress } = useScroll({
    target: accentRef,
    offset: ["start 0.9", "end 0.6"],
  });
  const scrollCharge = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true });
  const staticCharge = useMotionValue(1);
  const charge = reduceMotion ? staticCharge : scrollCharge;

  const visibleClass = isVisible ? "is-visible" : "";
  const textRevealClass = isMobile ? "reveal-fade-up" : "reveal-slide-left";
  const formRevealClass = isMobile ? "reveal-fade-up" : "reveal-slide-right";

  function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length) {
      setFiles((prev) => {
        const combined = [...prev];
        for (const file of selected) {
          const isDuplicate = combined.some(
            (existing) =>
              existing.name === file.name &&
              existing.size === file.size &&
              existing.lastModified === file.lastModified,
          );
          if (!isDuplicate && combined.length < MAX_FILES) combined.push(file);
        }
        return combined;
      });
      if (status === "error") setStatus("idle");
    }
    // Reset the native input so picking the same file again still fires onChange and selections append.
    event.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setErrorMessage("Please complete your name, email and message.");
      setStatus("error");
      return;
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setErrorMessage("Attachments are too large (10MB total maximum).");
      setStatus("error");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMessage("Please wait a moment for the verification to finish, then try again.");
      setStatus("error");
      return;
    }

    // Attachments are managed in state, so attach them explicitly rather than from the input.
    formData.delete("attachments");
    files.forEach((file) => formData.append("attachments", file));
    formData.set("turnstileToken", turnstileToken);

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        // Token is single-use; reset the widget so a retry gets a fresh one.
        turnstileRef.current?.reset();
        setTurnstileToken("");
        return;
      }

      form.reset();
      setFiles([]);
      turnstileRef.current?.reset();
      setTurnstileToken("");
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  }

  return (
    <ElectricsSection id="contact" majorSeam>
      <div ref={sectionRef}>
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#905bf4] md:text-xs">
            Need a quote or advice?
          </p>
          <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Get in touch</h2>
          <p className="text-muted mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
            Send a quick message or email us - we&apos;ll reply as soon as we can, usually the same day.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-3xl border-t border-[#4b378c]/30 pt-8 md:mt-10 md:pt-10 lg:mt-12 lg:max-w-5xl lg:pt-12">
          <div
            className="grid gap-8 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-0 lg:divide-x lg:divide-[#4b378c]/30"
          >
            <aside className={`lg:pr-10 ${textRevealClass} ${visibleClass}`}>
            <div ref={accentRef} className="relative pl-7">
              {/* Charging left accent: the same brand lightning bolt as the services section */}
              <LightningBolt
                progress={charge}
                className="pointer-events-none absolute left-0 top-0 h-full w-[18px]"
              />
              <div>
                <p className={labelClass}>Email</p>
                <a
                  href="mailto:info@excelelectrics.com"
                  className="mt-1.5 block text-base font-semibold text-[color:var(--foreground)] underline-offset-2 hover:underline"
                >
                  info@excelelectrics.com
                </a>
              </div>
              <div className="mt-6">
                <p className={labelClass}>Phone</p>
                <a
                  href="tel:+447730591822"
                  className="mt-1.5 block text-[15px] font-medium text-foreground hover:text-[#905bf4]"
                >
                  07730591822
                </a>
                <p className="text-muted mt-1 text-xs leading-snug">Mon-Fri, 08:00-17:00</p>
              </div>
              <div className="mt-6">
                <address className="text-[15px] font-medium leading-snug text-foreground not-italic">
                  124 City Road
                  <br />
                  London, EC1V 2NX
                </address>
                <p className="text-muted mt-1 text-xs leading-snug">Registered office</p>
              </div>
            </div>
          </aside>

            <form
              className={`flex flex-col gap-4 lg:min-w-0 lg:pl-10 ${formRevealClass} ${visibleClass}`}
              onSubmit={handleSubmit}
              noValidate
            >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="enquiry-company">Company</label>
              <input
                id="enquiry-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="enquiry-name" className={labelClass}>
                Name <span aria-hidden className="text-[#e03131]">*</span>
              </label>
              <input
                id="enquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-2">
                <label htmlFor="enquiry-email" className={labelClass}>
                  Email <span aria-hidden className="text-[#e03131]">*</span>
                </label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="enquiry-phone" className={labelClass}>
                  Phone <span className="font-normal normal-case text-[var(--text-muted)]">(optional)</span>
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="Best number for a call-back"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="enquiry-message" className={labelClass}>
                Message <span aria-hidden className="text-[#e03131]">*</span>
              </label>
              <textarea
                id="enquiry-message"
                name="message"
                rows={4}
                required
                aria-required="true"
                className={`${inputClass} min-h-[100px] resize-y`}
                placeholder="Briefly describe the job or question."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="enquiry-attachments" className={labelClass}>
                Upload supporting images{" "}
                <span className="font-normal normal-case text-[var(--text-muted)]">(optional)</span>
              </label>
              <input
                id="enquiry-attachments"
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFilesSelected}
                disabled={files.length >= MAX_FILES}
                className="block w-full cursor-pointer text-sm text-[var(--text-muted)] file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#905bf4]/12 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#905bf4] hover:file:bg-[#905bf4]/20 disabled:cursor-not-allowed disabled:opacity-60"
              />
              {files.length > 0 && (
                <ul className="space-y-1.5">
                  {files.map((file, index) => (
                    <li
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      className="flex items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                    >
                      <span className="min-w-0 flex-1 truncate text-foreground">{file.name}</span>
                      <span className="shrink-0 text-xs text-[var(--text-muted)]">{formatBytes(file.size)}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        aria-label={`Remove ${file.name}`}
                        className="shrink-0 rounded p-1 text-[var(--text-muted)] transition-colors hover:text-[#e03131]"
                      >
                        <IconClose className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-muted text-xs leading-snug">
                {files.length >= MAX_FILES
                  ? "Maximum of 5 files reached. Remove one to add another."
                  : "Add any supporting photos of the job. Images, PDFs or Word documents - up to 5 files, 10MB total."}
              </p>
            </div>
            {TURNSTILE_SITE_KEY && (
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken("")}
                onError={() => setTurnstileToken("")}
                options={{ theme: "auto", size: "flexible" }}
              />
            )}
            <button type="submit" className={submitPrimaryBtn} disabled={status === "sending"}>
              <span className="inline-flex shrink-0" aria-hidden>
                <IconMail className="h-5 w-5" />
              </span>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            <div aria-live="polite" className="min-h-[1.25rem]">
              {status === "success" && (
                <p className="text-sm font-medium text-[#2f9e44]">
                  Thanks - your message has been sent. We&apos;ll reply as soon as we can, usually the same day.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-[#e03131]">{errorMessage}</p>
              )}
            </div>
            </form>
          </div>
        </div>
      </div>
    </ElectricsSection>
  );
}
