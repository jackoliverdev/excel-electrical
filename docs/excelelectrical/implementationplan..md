# Excel Electrics — implementation plan

This document turns Matt’s `brief.txt` and the approved logo into a concrete build plan: global tokens, page structure, and layout behaviour. Colours from the brand lock-up: **blue `#0051da`**, **gold `#f3b711`**, with black/dark grey for the “ELECTRICS” wordmark weight.

---

## 1. How to read Matt’s brief (scope)

The copy is **homeowner-first**, friendly, and local: safe electrics, fire safety at home (alarms/detection), access systems, and garage doors/gates. Tone is “small jobs welcome”, clear pricing, reliable attendance — not principal-contractor / passive-fire programme language.

**Services to surface (grouped):**

| Section in brief | What to build on the site |
|------------------|---------------------------|
| Electrical work | Fault finding, lights/sockets/upgrades, consumer units, EICR, EICs |
| Fire safety | Smoke/heat alarms, home fire alarm systems, replacements, standards |
| Access & security | Door entry, intercoms, keypads/fobs, repairs/upgrades |
| Garage doors & gates | Automation, electric gates, conversions, servicing |

**Areas covered (from brief):** Essex, Suffolk, Cambridge, London, Hertfordshire — note spelling **Hertfordshire** (brief file has “Herfordshire”).

**Contact:** `info@excelelectrics.com`, phone TBC, enquiry form TBC.

---

## 2. One page vs several pages — recommendation

**Matt’s structure is a single narrative:** hero → what we help with → why choose us → quote/advice → small jobs → local/areas. That strongly suggests **one primary landing experience**: a **long-form homepage** with clear sections, not a large multi-page brochure unless content grows later.

**Recommended approach:**

- **Primary site:** one **scroll-based homepage** containing all sections above. Keeps the “nice simple clean” feel Matt implies.
- **Header:** keep a **proper navbar** — not dozens of routes, but **logo + a few anchor links** (e.g. Services, Why us, Areas, Contact) that scroll to `#` IDs. On mobile, the same links live in a drawer. This is still “one page”; it just avoids endless scrolling without orientation.
- **Optional thin routes later:** Privacy policy / cookies (if you need compliance pages), or a dedicated `/contact` only if the form + tracking becomes heavy. Not required for v1 if everything sits on `/`.

**What we are *not* doing for v1:** a deep IA like the old Excel Fire site (many service silos) unless Matt expands the brief.

**Naming:** The logo reads **EXCEL ELECTRICS** with tagline **WIRE & FIRE**, and the brief uses **info@excelelectrics.com**. Align visible trading name with Matt (**Excel Electrics**). The repo folder name “excel-electrical” can stay; update **metadata, footer, and headings** to match the chosen public name consistently.

---

## 3. Global colours (to define in `globals.css`)

Map these to **CSS variables** on `:root` (light theme first; dark mode optional later — Matt’s brand feels **light, airy, and domestic**).

| Token (suggested) | Hex | Usage |
|-------------------|-----|--------|
| `--brand-blue` | `#0051da` | Primary actions, links, key headlines accents, icon strokes matching logo |
| `--brand-gold` | `#f3b711` | Tagline emphasis, secondary highlights, badges (“Local”, “Fully insured”), decorative rules sparingly |
| `--foreground` | `#0f172a`–`#12161d` | Body text (near-black) |
| `--muted` | mid grey | Supporting copy |
| `--background` | `#ffffff` or very soft cool grey `#f8fafc` | Page background |
| `--surface` | `#ffffff` | Cards / panels |
| `--border` | light neutral | Dividers, card outlines |

**Rules of thumb:**

- **Blue** carries trust and primary CTAs; **gold** is accent only — overuse will look dated.
- Pair blue buttons with **white** label text; ensure **contrast** meets WCAG for accessibility.
- Reserve **black** for strong wordmark-style headings if you echo the logo’s “ELECTRICS” weight.

**Tailwind v4 (`@theme inline`):** expose semantic colours, e.g. `brand-blue`, `brand-gold`, so components use `bg-brand-blue`, `text-brand-gold`, etc., rather than raw hex in JSX.

---

## 4. Typography & logo usage

- **Headings:** bold, clean sans-serif (current **Geist** is fine; alternatives aligned to logo feel: **Inter**, **Montserrat** — only if you want closer parity to marketing mock-ups).
- **Logo asset:** `public/ExcelElectrics/ExcelElectrics.png` — use in **header** and **footer**; set explicit **width/height** and meaningful **alt** text (“Excel Electrics — Wire & Fire”).
- **Favicon:** replace legacy favicon with a simplified mark when available (lightning bolt element or monogram); until then, optional PNG favicon derived from logo.

---

## 5. Layout shell (App Router)

**`layout.tsx` (global):**

- **Header (sticky):** logo (links to `/`), horizontal nav with **anchor links** to homepage sections, primary CTA button (“Get a quote” / “Contact”) scrolling to `#contact` or opening tel when number exists.
- **Mobile:** hamburger → same anchors + CTA.
- **Main:** `{children}` — for v1, mostly the homepage sections.
- **Footer:** email, areas line, optional legal links; smaller logo or wordmark; keep **compact** — Matt’s brief ends on trust + local, not a mega footer.

**Theme:** default **light**. Dark theme toggle is optional; many domestic brands ship **light-only** for simplicity — decide when implementing.

**Environment:** keep `coming_soon` flag behaviour if you still need a soft launch.

---

## 6. Homepage section structure (single page)

Order follows Matt’s brief and a sensible conversion path:

1. **Hero** — Headline/subhead from brief (“Keeping your home safe & powered”, friendly local electricians), primary CTAs (call when TBC, scroll to enquiry).
2. **What we can help with** — Four blocks (Electrical · Fire safety · Access & security · Garage doors & gates) with bullets as in brief; icons optional (simple line icons, blue/gold).
3. **Why homeowners choose us** — Bullet list / checklist layout (tidy, qualified, pricing, punctuality, no job too small).
4. **Quote / advice** — Prominent strip: phone (placeholder), email, short **contact form** (name, phone, email, message, service interest).
5. **Supporting strips** — “Small jobs welcome” + “Local & reliable” + areas covered (Essex, Suffolk, Cambridge, London, Hertfordshire).
6. **Footer** — Repeat essentials + legal.

**Redirects:** `next.config.ts` currently sends many paths to `/`. When this build goes live, **remove or narrow redirects** so `/contact`, `/privacy`, etc. work if you add them; for a **pure one-pager**, only `/` may need to be public.

---

## 7. Components to introduce or refactor (conceptual)

- `SiteHeader` — logo + anchor nav + CTA (replace or simplify current Excel Fire–style mega menus).
- Section primitives: `Section`, `Container`, `Heading` for consistent vertical rhythm.
- `ServiceGrid` or four `ServiceCard` blocks aligned to Matt’s four groups.
- `ContactSection` — form + trust line (“Usually same day”).
- **Strip legacy content** — remove commercial/B2B carousel/testimonials unless Matt supplies homeowner-focused replacements.

---

## 8. Phased delivery

| Phase | Deliverables |
|-------|----------------|
| **A — Foundations** | CSS variables + `@theme` tokens; logo in header/footer; metadata + legal entity name aligned to Excel Electrics; strip conflicting old brand assets from critical path |
| **B — Homepage** | Implement section order above; mobile-first layout; anchor IDs wired to nav |
| **C — Contact** | Form (client or server action TBC); mail/API integration; phone when confirmed |
| **D — Polish** | Imagery (optional stock/local), favicon, analytics, cookie banner if needed |

---

## 9. Open decisions (confirm with Matt)

- Final **company legal name** vs **trading name** on site and in footer (Ltd? Registration number?).
- **Phone number** and whether to show **WhatsApp** (brief does not require it).
- **Reviews / Trustpilot** — brief does not ask for them; add only if provided.
- **Dark mode** — on or off for v1.

---

## 10. Quick reference — brand hex

```text
Primary blue:  #0051da
Accent gold:   #f3b711
```

Logo file: `public/ExcelElectrics/ExcelElectrics.png`

---

*Last updated: 29/04/2026*
