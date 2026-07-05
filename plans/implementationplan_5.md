# Implementation Plan 5 — LWS Website Polish Round 2

## Overview
Ten targeted fixes and enhancements. Complete in order. Each task is small and specific — do not combine or reorder them. Test each one before moving to the next.

---

## Task 1 — Ticker Fixed Width (No Layout Shift)

**Problem:** When the changing word in the hero ticker swaps (restaurants → cafes → plumbers), the word "For" shifts left and right because words have different character lengths.

**Fix:** Give the changing word span a fixed width so "For" never moves.

Find the ticker word span (likely `.ticker-word` or similar) and apply:
```css
display: inline-block;
min-width: 200px;
text-align: left;
```

The word fades out → swaps → fades back in during transition. "For" should remain completely stationary at all times regardless of which word is displayed. The entire ticker line stays centered on the page.

**Verify:** Watch the ticker cycle through at least 3 words and confirm "For" does not move at all.

---

## Task 2 — Logo Size

**Problem:** The logo in both the header/navbar and the footer is too small.

**Fix:**
- Header/navbar logo: `height: 52px`, `width: auto`
- Footer logo: `height: 44px`, `width: auto`

Check for any parent containers constraining the image:
- Remove any `overflow: hidden` on logo wrappers
- Remove any `max-height` or fixed-dimension wrappers
- If the logo is rendered as a CSS `background-image` rather than an `<img>` tag, convert it to an `<img>` tag

**Verify:** Logo should be clearly readable in both locations without appearing stretched or pixelated.

---

## Task 3 — Descender Fix: Hero "searching."

**Problem:** The letter "g" in "searching." in the hero headline has its descender (the tail below the baseline) clipped or cut off at the bottom of the text element.

**Fix:** On the first headline line element:
- Add `padding-bottom: 0.2em`
- Set `line-height: 1.25` if not already
- Check all parent elements for `overflow: hidden` — remove it from any element that wraps the headline text

Do not change the font size or visual appearance of the text — only fix the clipping.

**Verify:** The descender of the "g" in "searching." should be fully visible with clear space below it.

---

## Task 4 — Descender Fix: Contact Section Header

**Problem:** The same descender clipping issue occurs on the large heading in the contact section (likely "Ready to get more customers?").

**Fix:** Apply the same fix as Task 3 to the contact section heading element:
- Add `padding-bottom: 0.2em`
- Set `line-height: 1.25`
- Remove any `overflow: hidden` from parent wrappers

**Verify:** All letters in the contact heading render fully with no clipping at bottom.

---

## Task 5 — Remove Ticker Word Underline

**Problem:** The changing word in the hero ticker has a teal underline (`text-decoration: underline`) that should not be there.

**Fix:** Find `.ticker-word` or the equivalent selector and remove:
```css
text-decoration: none;
text-decoration-color: unset;
text-underline-offset: unset;
```

The word should be teal colored and bold with absolutely no underline or decoration of any kind.

**Verify:** Watch the ticker — no underline visible on any of the cycling words.

---

## Task 6 — Move Stats Into Process Section

**Problem:** The stats section (7 days / 0 templates / 1 flat rate) is a standalone section that should instead live inside the Process section where it's thematically relevant.

**Changes:**
1. Remove the stats as a completely standalone section
2. Inside the Process section, after the three steps (Audit / Build / Launch), add a horizontal divider — a thin line `1px solid rgba(0,180,216,0.15)` with `margin: 3rem 0 2.5rem`
3. Below that divider, place the three stats in a horizontal row — same design as before (large teal number, muted label below)
4. The stats row should have the same max-width and centering as the process steps above it

The combined section should read: headline → three process steps → divider → three stats. One cohesive section.

**Verify:** Stats no longer appear as their own section. They appear inside the process section below the steps. Page flow: Hero → What We Build → Built to Convert → Process+Stats → Portfolio → Testimonial → Free Audit CTA → Contact.

---

## Task 7 — More Space Between Process and Portfolio

**Problem:** The Process section and the Recent Work / Flatline MMA portfolio section are too close together.

**Fix:** Increase the vertical spacing between them. Add `margin-top: 7rem` or `padding-top: 7rem` to the portfolio section, or add `margin-bottom: 7rem` to the process section. Whichever is cleaner given the existing CSS.

**Verify:** There is a clear, generous visual pause between the process section and the portfolio section when scrolling.

---

## Task 8 — Hero Teal Radial Bloom

**Problem:** The hero content floats in a flat black void with no depth.

**Fix:** Add a faint teal radial gradient bloom behind the headline content. This should be a pseudo-element or absolutely positioned div behind the text content (z-index lower than text):

```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 800px;
height: 500px;
background: radial-gradient(ellipse at center, rgba(0,180,216,0.06) 0%, transparent 70%);
pointer-events: none;
z-index: 0;
```

This is centered on the headline area and creates the impression of a soft light source emanating from behind the text. Very subtle — if you have to look for it, it's right. If it's immediately obvious, reduce the opacity.

**Verify:** The hero background has visible but subtle depth. The bloom should not be distracting or garish.

---

## Task 9 — Hero Headline Text Glow

**Problem:** The bold headline "Make sure they find you." feels flat against the dark background.

**Fix:** Add a very subtle teal text glow to the second headline line only (the bold "Make sure they find you." line):

```css
text-shadow: 0 0 80px rgba(0,180,216,0.25), 0 0 160px rgba(0,180,216,0.1);
```

This is a luminous glow effect — the text should look like it's softly lit from within. Subtle is correct. If it looks like a neon sign, reduce opacity.

Do NOT apply this to the first headline line ("Your customers are searching.") — only to the bold second line.

**Verify:** The bold headline has a soft teal luminous quality. First line remains plain white. The difference between the two lines is now both weight AND glow.

---

## Task 10 — Hero Bottom Border Line

**Problem:** The hero section has no clear visual boundary at the bottom — it blurs into the next section.

**Fix:** Add a thin full-width teal horizontal line at the very bottom of the hero section:

```css
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: 1px;
background: linear-gradient(to right, transparent, rgba(0,180,216,0.4) 20%, rgba(0,180,216,0.4) 80%, transparent);
```

The line should fade in from transparent on the left edge, be solid teal across the middle 60% of the width, then fade back to transparent on the right edge. This creates a clean, elegant separator that frames the hero as its own world.

**Verify:** A thin teal line is visible at the very bottom of the hero section. It fades at both edges rather than ending abruptly.

---

## Definition of Done

- [ ] Ticker "For" never shifts position during word changes
- [ ] Logo clearly visible at correct size in header and footer
- [ ] "g" descender fully visible in hero "searching."
- [ ] No clipping on contact section heading
- [ ] No underline on ticker changing word
- [ ] Stats appear inside process section, not as standalone section
- [ ] Clear generous space between process and portfolio sections
- [ ] Subtle teal radial bloom visible in hero background
- [ ] Bold headline has soft teal text glow
- [ ] Thin teal line visible at bottom of hero section fading at edges
- [ ] No regressions — all previously working features still work
- [ ] Site still loads correctly on mobile (375px)
