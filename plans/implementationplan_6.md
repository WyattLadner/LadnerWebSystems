# Implementation Plan 6 — LWS Website Polish Round 3

## Overview
Four targeted fixes. Complete in order. Test each one before moving to the next. Do not combine tasks.

---

## Task 1 — Mouse Tracking Dot Grid: Make More Visible

**Problem:** The mouse-reactive dot grid in the hero section is too subtle — the repel effect is barely noticeable when moving the cursor.

**Fix:** Find the canvas animation code and increase these values:

| Property | Current | New |
|---|---|---|
| Dot radius | `1.2` | `1.8` |
| Repel force multiplier | `12` | `28` |
| Base dot opacity minimum | `0.08` | `0.18` |
| Base dot opacity maximum | `0.14` | `0.35` |
| Proximity glow addition | `0.2` | `0.4` |
| Max repel distance | `120` | `150` |

The effect should be clearly and immediately visible when the user moves their mouse across the hero. Dots should visibly push away from the cursor in a satisfying wave. If the canvas code uses different variable names, find the equivalent values and scale them proportionally.

**Verify:** Move mouse across hero. Dots should visibly ripple away from cursor. Effect should be obvious without being overwhelming.

---

## Task 2 — Ticker Centering

**Problem:** The "For ___" ticker line is not centered on the page — it sits left of center.

**Fix:** Find the ticker container element and apply:
```css
display: flex;
justify-content: center;
align-items: center;
width: 100%;
text-align: center;
```

The word "For" and the changing word should together appear centered on the page as a unit. The fixed-width span on the changing word should remain in place (from plan 5) to prevent layout shift — only the centering of the whole line needs fixing.

If this is a React/Next.js component, make sure the parent container is full width and uses `text-align: center` or flex centering. Check that no parent element has a `max-width` or `margin` that's offsetting it to one side.

**Verify:** Watch the ticker cycle through several words. The "For [word]" unit should appear perfectly centered on the page at all times.

---

## Task 3 — Logo Size: Deep Fix

**Problem:** The logo in the header and footer is still appearing too small despite previous fix attempts. The root cause has not been identified.

**Investigation steps (do all of these before making changes):**
1. Open the header component file and find every reference to the logo image
2. Open the footer component file and find every reference to the logo image
3. Check if the logo uses Next.js `<Image>` component — if so, note the exact `width` and `height` props currently set
4. Check if Tailwind classes are controlling the size — note every `h-`, `w-`, `max-h-`, `max-w-` class on the logo element and its parent containers
5. Check if there is a wrapping `<div>` or `<nav>` with `overflow: hidden` or a fixed height that clips the logo
6. Report what you found before making any changes

**Then fix:**
- If using Next.js `<Image>`: set `width={180}` `height={56}` for header, `width={160}` `height={50}` for footer
- If using Tailwind classes: replace size classes with `h-14` for header, `h-12` for footer, keep `w-auto`
- If there's a constraining parent: increase its height or remove the constraint
- If multiple things are constraining it: fix all of them

**Report format:** For every line changed, show:
```
File: components/header.tsx line 23
Before: <Image src="/logo.png" width={80} height={24} />
After:  <Image src="/logo.png" width={180} height={56} />
```

**Verify:** Logo is clearly readable at a comfortable size in both header and footer. Should not appear stretched, pixelated, or cropped.

---

## Task 4 — Process Section Spacing

**Problem:** The process section feels compressed — all elements are too close together and the section lacks visual breathing room.

**Current structure:**
- Section eyebrow ("THE PROCESS")
- Section headline ("From audit to launch in under a week")
- Three step columns (Audit / Build / Launch) with teal top borders
- Divider line
- Three stats (7 / 0 / 1)

**Fix — increase spacing at every level:**

1. **Section top padding:** Increase to `7rem` (from whatever it currently is)
2. **Section bottom padding:** Increase to `7rem`
3. **Space between eyebrow and headline:** `1.5rem`
4. **Space between headline and the three steps:** `4rem` (was likely `2rem` or less)
5. **Height of each step column:** Add `padding: 2rem 1.5rem` inside each step card
6. **Space between the steps and the divider line:** `3rem`
7. **Space between the divider line and the stats:** `3rem`
8. **Space between each stat number and its label:** `0.75rem`

Do not change any text content, colors, or layout structure — only spacing values.

**Verify:** Scroll through the process section slowly. Each element should have clear visual separation. The section should feel like it has room to breathe rather than feeling dense.

---

## Definition of Done

- [ ] Mouse dot grid effect is clearly visible when moving cursor across hero
- [ ] "For [word]" ticker is perfectly centered on the page
- [ ] Logo is clearly readable at proper size in both header and footer
- [ ] Every changed logo line is documented with before/after
- [ ] Process section has generous spacing throughout
- [ ] No visual regressions on any other section
- [ ] Site renders correctly on mobile (375px)
- [ ] Site renders correctly on desktop (1440px)
