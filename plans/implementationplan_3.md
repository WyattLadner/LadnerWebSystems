# Implementation Plan 3 — LWS Website Full Redesign

## Vision
Bold and dramatic meets techy and dynamic. The site should make visitors feel **impressed** within 3 seconds. Every element is intentional. Motion serves arrival, not decoration — things animate once on scroll or load, then stop. The overall feeling: precision meets power.

## Design System

### Typography
Import from Google Fonts:
```
Syne (weights: 400, 700, 800) — display headings, hero text, stat numbers
Inter (weights: 400, 500) — body text, labels, captions
```

Add to the project's font configuration or `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

Apply globally:
- All headings: `font-family: 'Syne', sans-serif`
- All body text, labels, captions: `font-family: 'Inter', sans-serif`

### Color Tokens
```css
--bg: #0a0a0a              /* near-black page background */
--surface: #111111          /* card/section background */
--surface-2: #1a1a1a        /* elevated surface */
--teal: #00b4d8             /* primary accent */
--teal-dim: rgba(0,180,216,0.12)  /* subtle teal fill */
--teal-border: rgba(0,180,216,0.25) /* teal border */
--white: #f1f5f9            /* primary text */
--muted: #64748b            /* secondary text */
--faint: #1e293b            /* very subtle borders */
```

### Motion Rules
- Load animations: `opacity 0 → 1`, `translateY(24px) → 0`, duration `0.6s`, easing `cubic-bezier(0.16, 1, 0.3, 1)`
- Scroll triggers: use `IntersectionObserver` with `threshold: 0.15`
- Nothing loops or moves continuously except the dot grid (very slow, subtle)
- Stagger child elements by `0.1s` delay increments
- Respect `prefers-reduced-motion` — wrap all animations in a media query check

---

## Task 1 — Global Setup

**Remove:**
- All existing orb/glow animations
- Current font imports
- Current hero background effects

**Add:**
- Syne + Inter Google Fonts
- CSS custom properties from Design System above
- Global `body` background: `var(--bg)`
- Smooth scrolling: `html { scroll-behavior: smooth; }`
- A global `.reveal` class that starts hidden and animates in when `.visible` is added via IntersectionObserver:
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
- IntersectionObserver script at bottom of page that adds `.visible` to all `.reveal` elements when they enter viewport

---

## Task 2 — Navigation

**Design:**
- Fixed top, full width
- On load: fully transparent, no border
- On scroll past 60px: background `rgba(10,10,10,0.92)`, backdrop-filter `blur(12px)`, bottom border `1px solid var(--faint)`
- Transition: `all 0.3s ease`
- Logo: existing LWS logo image, height `36px`
- Nav links: Inter 14px, color `var(--muted)`, hover color `var(--white)`, transition `0.2s`
- CTA button "Get in Touch": teal background, white text, `border-radius: 6px`, `padding: 8px 20px`, hover `opacity: 0.9`
- No change to existing nav links or functionality

**Scroll behavior JS:**
```javascript
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav')
  if (window.scrollY > 60) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
})
```

---

## Task 3 — Hero Section (Full Redesign)

**Layout:** Full viewport height (`100vh`), flex column, content vertically centered, text centered.

**Background — Animated Dot Grid:**
Add a `<canvas>` element behind the hero content. Use JavaScript to draw a grid of small dots (`radius: 1px`, color `rgba(0,180,216,0.15)`) spaced `40px` apart across the full canvas. Animate the entire grid with a very slow sine wave that makes the dots pulse in opacity — each dot's opacity is `0.05 + 0.1 * Math.sin(time * 0.001 + x * 0.01 + y * 0.01)`. This creates a slow, living grid effect. Canvas should be `position: absolute`, `inset: 0`, `z-index: 0`. All hero content sits above it at `z-index: 1`.

**Content structure (top to bottom, all centered):**

1. **Eyebrow label** — `Built for local businesses` — Inter 12px, `letter-spacing: 0.12em`, `text-transform: uppercase`, color `var(--teal)`. Animate in on load with 0s delay.

2. **Headline** — Two lines, Syne font:
   - Line 1: `Your customers are searching.` — `font-size: clamp(2.5rem, 5vw, 4.5rem)`, `font-weight: 400`, color `var(--white)`
   - Line 2: `Make sure they find you.` — same size, `font-weight: 800`, color `var(--white)`
   - A thin teal horizontal line (`2px`, `width: 60px`, `background: var(--teal)`) sits between the two lines, centered. It animates in by growing from `width: 0` to `width: 60px` over `0.4s` with `0.3s` delay.
   - Animate headline in on load with `0.15s` delay.

3. **Subheadline** — `We build websites and lead-capture systems for local businesses that are tired of losing customers to competitors with a better online presence.` — Inter 18px, `font-weight: 400`, color `var(--muted)`, `max-width: 560px`, centered. Animate in with `0.3s` delay.

4. **Animated business type ticker** — A single line that reads: `For ` followed by a word that cycles through: `plumbers → electricians → salons → restaurants → contractors → gyms` — each word fades out and the next fades in every 2 seconds. Word is teal colored. Entire line is Inter 16px, color `var(--muted)`. Animate in with `0.4s` delay.

5. **CTA buttons row** — Two buttons side by side:
   - Primary: `See how it works` — teal background `var(--teal)`, white text, Syne 15px font-weight 700, `padding: 12px 28px`, `border-radius: 6px`
   - Secondary: `View our work` — transparent background, `border: 1px solid var(--faint)`, white text, same sizing. Hover: border becomes `var(--teal-border)`, text becomes `var(--teal)`
   - Animate in with `0.5s` delay

6. **Scroll indicator** — At the very bottom of the hero, centered: a small downward chevron icon that gently bobs up and down (CSS animation, `translateY(0) → translateY(6px)`, 1.5s infinite, ease-in-out). Color `var(--muted)`. Fades out when user scrolls.

---

## Task 4 — "What We Build" Section (Refined)

**Keep the existing 6-card grid but upgrade the cards:**

- Card background: `var(--surface)`, border `1px solid var(--faint)`
- On hover: border becomes `1px solid var(--teal-border)`, a very subtle teal glow appears on the top edge: `box-shadow: 0 -2px 0 0 var(--teal), 0 0 20px var(--teal-dim)`
- Icon: existing icons, but color them `var(--teal)`, size `22px`
- Card title: Syne 17px, font-weight 700, color `var(--white)`
- Card description: Inter 14px, color `var(--muted)`
- All cards get `.reveal` class, staggered by `0.1s` each

**Section header:**
- Eyebrow: `WHAT WE BUILD` — same eyebrow style as hero
- Headline: `Everything a local business needs to get found and get calls` — Syne, `clamp(1.8rem, 3vw, 2.5rem)`, font-weight 700
- Subheader: `Built specifically for local service businesses, not corporate teams.` — Inter 16px, `var(--muted)`

---

## Task 5 — "Built to Convert" Section (Refined)

Keep the 6-feature icon grid. Upgrade:
- Icons: teal, inside a small dark circle `background: var(--teal-dim)`, `border: 1px solid var(--teal-border)`, `border-radius: 50%`, `width: 52px height: 52px`
- Labels: Inter 14px, font-weight 500, color `var(--white)`
- Add `.reveal` with stagger

---

## Task 6 — Process Section (Upgraded)

Replace the current simple process section with a more dramatic version:

**Layout:** Full width, dark background `var(--bg)`. Three steps in a horizontal row on desktop, vertical on mobile.

**Each step:**
- Large step number: Syne, `font-size: 5rem`, `font-weight: 800`, color `var(--teal-dim)` (very faint teal, almost like a watermark behind the content)
- Step title: Syne 22px, font-weight 700, color `var(--white)`, sits over the number
- Description: Inter 15px, color `var(--muted)`
- A thin teal top border on each step card: `border-top: 2px solid var(--teal)`

**Between steps:** A horizontal teal line connecting them (`1px solid var(--teal-border)`) — hidden on mobile.

**Section header:**
- Eyebrow: `THE PROCESS`
- Headline: `From audit to launch in under a week` — Syne, large, font-weight 800

All step cards get `.reveal` with stagger.

---

## Task 7 — Portfolio Section (Full Redesign)

This is the centerpiece. Make it dramatic.

**Layout:** Two column, full width. Left column is the image, right column is the text. On mobile, stacks vertically image on top.

**Left column — image:**
- Full height of the section, `min-height: 500px`
- Background image: `flatline-mma.png` (find in public/images folder)
- `background-size: cover`, `background-position: center top`
- A subtle dark overlay: `::after` pseudo element, `background: linear-gradient(to right, transparent, var(--bg))` — this creates a fade from the image into the right column
- On scroll into view: image slides in from the left (`translateX(-40px) → 0`)

**Right column — text:**
- Padding `4rem 3rem`
- Eyebrow: `RECENT WORK` — teal, uppercase, Inter 12px
- Client name: `Flatline MMA` — Syne 3rem, font-weight 800, color `var(--white)`
- Location: `Bay Saint Louis, MS` — Inter 14px, `var(--muted)`
- Tags: `Website` `Booking System` `Mobile Optimized` — small pills, `background: var(--teal-dim)`, `border: 1px solid var(--teal-border)`, `color: var(--teal)`, `font-size: 12px`, `border-radius: 4px`, `padding: 4px 10px`
- Description: Inter 16px, `var(--muted)`, `line-height: 1.7`
- Link: `View site →` — teal color, Inter 15px font-weight 500, hover `opacity: 0.8`
- On scroll into view: text fades in from right (`translateX(40px) → 0`)

---

## Task 8 — Testimonial Section

**Layout:** Centered, `max-width: 740px`, `margin: 0 auto`

**Design:**
- No card background — the quote floats on the dark page
- Large teal open-quote character: Syne `6rem`, `font-weight: 800`, `color: var(--teal)`, `line-height: 0.5`, `margin-bottom: 1rem`
- Quote text: Syne `1.4rem`, `font-weight: 400`, `font-style: italic`, color `var(--white)`, `line-height: 1.7`
- A thin teal left border: `border-left: 3px solid var(--teal)`, `padding-left: 2rem`
- Attribution: Inter 14px, `var(--muted)`, `margin-top: 1.5rem`
- `.reveal` on scroll

**Content:**
> "Before working with Ladner Web Systems, we didn't have a website at all. Now we have something we're actually proud to send people to — and it does exactly what we needed."
> — Cameron Boughton, Flatline MMA, Bay Saint Louis MS

---

## Task 9 — Stats Section (NEW)

Insert between Testimonial and "Built for Local Businesses."

**Layout:** Three stats, centered, horizontal row. Dark background.

**Each stat:**
- Number: Syne `4rem`, `font-weight: 800`, color `var(--teal)` — animates counting up from 0 when scrolled into view using `requestAnimationFrame`
- Label: Inter 15px, `var(--muted)`

**Stats:**
- `7` — days from start to launch
- `$0` — templates used (the zero is the joke — everything is custom)
- `1` — flat rate, no surprises

**Note:** The counting animation should use `requestAnimationFrame` and an easing function so it starts fast and slows at the end. Duration: 1.5s.

---

## Task 10 — Free Audit CTA Section

**Design:** Full width section with a subtle teal top border (`2px solid var(--teal)`). Background slightly lighter than page: `var(--surface)`.

**Content:**
- Headline: Syne `2rem`, font-weight 700: `Not sure where to start?`
- Subheader: Inter 16px, `var(--muted)`: `We'll audit your current online presence for free — no pitch, no pressure. You'll know exactly what's hurting you before you spend a dollar.`
- Button: teal, `Get a free audit`, scrolls to contact form
- Fine print: Inter 13px, `var(--muted)`: `Usually delivered within 48 hours. No strings attached.`

---

## Task 11 — Contact Section

**Keep existing form functionality exactly as-is.**

**Upgrade visually:**
- Section headline: Syne `2.5rem`, font-weight 800: `Ready to get more customers?`
- Subheader: Inter 16px, `var(--muted)`: `Fill out the form and we'll be in touch within 24 hours.`
- Pricing note: Inter 13px, italic, `var(--muted)`: `Most local business projects run between $1,500 and $4,000. Every project is scoped to what you actually need — no retainers, no surprise invoices.`
- Form card: `background: var(--surface)`, `border: 1px solid var(--faint)`, `border-radius: 12px`, `padding: 2.5rem`
- Form inputs: `background: var(--surface-2)`, `border: 1px solid var(--faint)`, `color: var(--white)`, focus state: `border-color: var(--teal)`, `box-shadow: 0 0 0 3px var(--teal-dim)`
- Submit button: full width, teal, Syne font-weight 700

---

## Task 12 — Remove "Built for Local Businesses" Section

This section (with the icon and bullet list) no longer fits the streamlined structure. Remove it entirely. The target audience is communicated through the hero copy and service cards.

---

## Task 13 — Footer

Simple, minimal:
- Dark background `var(--bg)`
- Top border `1px solid var(--faint)`
- LWS logo left, copyright center or right
- No extra links needed

---

## Final Page Structure (in order)
1. Nav (transparent → solid on scroll)
2. Hero (full screen, dot grid, animated content)
3. What We Build (6 cards)
4. Built to Convert (6 icons)
5. The Process (3 steps)
6. Recent Work (2-column, Flatline MMA)
7. Testimonial (floating quote)
8. Stats (3 counting numbers)
9. Free Audit CTA
10. Contact Form
11. Footer

---

## What NOT to Change
- Existing form submission functionality
- Navigation link destinations
- Logo files
- Vercel deployment config
- Any existing API or backend connections

---

## Definition of Done
- Site loads in under 3 seconds
- All animations trigger correctly on scroll
- Dot grid canvas renders without affecting performance (use `requestAnimationFrame`, cancel on page unload)
- Flatline MMA image displays correctly in portfolio section
- Ticker cycles through all business types correctly
- Stats count up when scrolled into view
- Nav transitions correctly on scroll
- Site looks correct on mobile (375px) and desktop (1440px)
- `prefers-reduced-motion` respected — all animations disabled when user has this set
