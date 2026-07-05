# Implementation Plan 2 — LWS Website Improvements

## Context
This is the Ladner Web Systems website at `ladnerwebsystems.vercel.app`. It is a Next.js/React site deployed on Vercel. The site is dark-themed (navy + teal) and already has an animated hero section with floating glowing orbs. Do not change the color scheme or remove any existing animations.

## Execution Order
Complete tasks in this exact order. Do not skip ahead. Verify each section renders correctly before moving to the next.

---

## Task 1 — Hero Section: Full Viewport Height

**Goal:** Make the hero section fill the entire browser window on load.

**What to change:**
- Set the hero section height to `100vh` (full viewport height)
- Ensure the animated orbs and content are vertically centered within this full height
- The hero content (headline, subheadline, CTA button) should sit in the center of the screen
- Do not change the orb animations, colors, or any existing visual effects

---

## Task 2 — Transparent Sticky Navigation

**Goal:** Nav blends into the hero on load, gains a solid background when the user scrolls.

**What to change:**
- On page load: nav background is fully transparent, no border, no shadow
- When user scrolls past 80px: nav transitions to solid dark navy background (`#0a0f1e` or current nav color) with a subtle bottom border
- Transition should be smooth: `transition: all 0.3s ease`
- Nav links and logo must remain visible in both states (ensure contrast on the transparent state — use white or light text)
- This is a scroll event listener in JS or a CSS scroll-driven approach depending on the framework

---

## Task 3 — Rewrite All Copy

**Goal:** Replace existing copy with sharper, more conversion-focused text. Do not change layout or structure — only the text content.

### Hero Section
- **Headline:** `Your customers are searching. Make sure they find you.`
- **Subheadline:** `We build websites and lead-capture systems for local businesses that are tired of losing customers to competitors with a better online presence.`
- **Primary CTA button:** `See how it works`
- **Secondary CTA button (if exists):** `View our work`

### "What We Build" Section
- **Section header:** `Everything a local business needs to get found and get calls`
- **Section subheader (if exists):** Remove or replace with: `Built specifically for local service businesses, not corporate teams.`

### Service Card Copy (match to existing cards by title)
| Old Title | New Title | New Description |
|---|---|---|
| Lead-Capture Forms | Lead-Capture Forms | Turn website visitors into real inquiries — not just traffic |
| Websites for Local Businesses | Websites for Local Businesses | A site that works as hard as you do, built in under a week |
| Quote Request Systems | Quote Request Systems | Make it easy for customers to ask for a quote — so more of them actually do |
| Appointment Request Systems | Appointment Request Systems | Fill your schedule without playing phone tag |
| Follow-Up and Intake Workflows | Follow-Up Workflows | Never let a lead go cold — automated follow-ups that run themselves |
| Calendar and Booking Workflows | Calendar and Booking | Connect your site to your schedule in one click |

### "Designed to Turn Visitors Into Requests" Section
- **Header:** `Built to convert visitors into customers`
- Keep the six feature icons but update their labels:
  - Clearer calls to action → `Calls to action that actually work`
  - Easier customer contact → `Contact that takes seconds, not steps`
  - Better lead capture → `Every visitor is a potential lead`
  - Faster follow-up → `Follow-ups that run while you sleep`
  - More organized intake → `Every request, organized automatically`
  - Stronger online presence → `Show up where your customers are searching`

### "Built for Local Businesses" Section
- **Header:** `Built for Local Businesses`
- **Subheader:** `If you're running a home service business, a salon, a gym, a restaurant, or any local operation — and you're losing customers because your online presence isn't keeping up — this is built for you.`
- Keep the existing bullet list items as-is

### Contact Section
- **Header:** `Ready to get more customers from your website?`
- **Subheader:** `Fill out the form and we'll be in touch within 24 hours.`

---

## Task 4 — Add "How It Works" Process Section

**Goal:** Add a simple 3-step process section between "What We Build" and "Built for Local Businesses."

**Placement:** Insert after the "Designed to Turn Visitors Into Requests" section, before "Built for Local Businesses."

**Design:**
- Dark background matching the site
- Teal section eyebrow label: `THE PROCESS`
- Header: `From audit to launch in under a week`
- Three steps in a horizontal row (stack vertically on mobile)
- Each step has: step number in teal, title, short description

**Step content:**
1. **Audit** — We look at your current online presence and identify exactly what's costing you customers.
2. **Build** — We design and build your site or system, tailored to your business. No templates, no cookie-cutter layouts.
3. **Launch** — You go live. We make sure everything works and you know how to use it.

**Style:** Step numbers should be large teal numerals (01, 02, 03). Thin teal connector line between steps on desktop. Clean and minimal.

---

## Task 5 — Add Portfolio Section

**Goal:** Showcase Flatline MMA as a completed project.

**Placement:** Insert after the "How It Works" section, before "Built for Local Businesses."

**Design:**
- Section eyebrow label: `RECENT WORK`
- Header: `What we've built`
- Single portfolio card (more can be added later)
- Card contains:
  - Screenshot of Flatline MMA website — use the URL `https://flatlinemma.vercel.app` and take a screenshot, OR use a placeholder image div with the text "Flatline MMA" if screenshots are not possible in this environment
  - Client name: `Flatline MMA`
  - Location: `Bay Saint Louis, MS`
  - Tags: `Website` `Booking System` `Mobile Optimized`
  - Short description: `A full website and booking system for a premier mixed martial arts gym. Built from scratch — video hero, coach profiles, program pages, and a direct contact flow.`
  - Link button: `View site →` linking to `https://flatlinemma.vercel.app`
- Card should have a teal border accent on hover
- Tags should be small teal pills

**Note:** If the project grows, this section should support a 2-3 card grid. Build it as a grid even with one card so adding more later is just adding a card component.

---

## Task 6 — Add Testimonial Section

**Goal:** Add a single testimonial to establish credibility.

**Placement:** Insert after the Portfolio section, before "Built for Local Businesses."

**Design:**
- No section header needed — let the quote stand alone
- Large teal opening quotation mark
- Quote text in larger font (20-22px), light weight, italic
- Attribution below: name, business, location
- Subtle teal left border accent on the quote block
- Dark card background, centered on the page, max-width 700px

**Content:**
> "Before working with Ladner Web Systems, we didn't have a website at all. Now we have something we're actually proud to send people to — and it does exactly what we needed."
> — Cameron Boughton, Flatline MMA, Bay Saint Louis MS

**Note:** If Cameron has not provided this quote in writing yet, use it as a placeholder and flag it with a comment in the code: `<!-- TODO: confirm quote with client -->`

---

## Task 7 — Add Free Audit CTA Section

**Goal:** Replace or supplement the existing contact CTA with a "Free Audit" hook above the contact form.

**Placement:** Insert directly above the existing contact form section.

**Design:**
- Full-width teal-tinted background section (very subtle — `rgba(0, 180, 216, 0.05)` or similar)
- Teal top border line
- Centered content
- Header: `Not sure where to start?`
- Subheader: `We'll audit your current online presence for free — no pitch, no pressure. You'll know exactly what's hurting you before you spend a dollar.`
- Button: `Get a free audit` — scrolls to the contact form below, or opens the form
- Small note below button: `Usually delivered within 48 hours. No strings attached.`

---

## Task 8 — Add Pricing Signal

**Goal:** Address the "how much does this cost?" question without committing to fixed prices.

**Placement:** Add to the contact section, below the form header and above the form itself.

**Design:** A single line of muted text, not a full section:

> `Most local business projects run between $1,500 and $4,000. Every project is scoped to what you actually need — no retainers, no surprise invoices.`

Style: `font-size: 14px`, `color: var(--text-muted)` or equivalent muted color, centered, italic.

---

## Task 9 — Mobile Responsiveness Check

**Goal:** Ensure all new sections look correct on mobile (375px width).

**Check each new section:**
- Hero: text should not overflow, orbs should not cause horizontal scroll
- Process steps: stack vertically, connector line hidden on mobile
- Portfolio card: full width, image on top
- Testimonial: full width, readable font size
- Free Audit CTA: centered, button full width on mobile

Fix any layout issues found during this check.

---

## What NOT to Change
- Color scheme (navy + teal)
- Existing animations (orbs, any hover effects)
- Logo
- Navigation link labels
- Footer content
- Any existing functionality (form submission, etc.)
- Font choices

---

## Definition of Done
All 9 tasks complete. Site renders correctly on desktop (1440px) and mobile (375px). All new copy is in place. No broken links. Flatline MMA portfolio card links to the correct URL. The transparent nav transitions correctly on scroll.
