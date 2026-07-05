# Implementation Plan 4 — LWS Website Polish + Hero Dynamics

## Overview
This plan has two categories: bug fixes/polish from the current build, and new hero dynamic animations. Complete all fixes first (Tasks 1-6), then add animations (Tasks 7-11). Test each task before moving to the next.

---

## PART 1 — FIXES & POLISH

### Task 1 — Stats Section: Remove Dollar Sign
**File:** Find the stats section component or page file.

**Change:** The middle stat currently displays `$0`. Remove the `$` symbol. It should read `0` with the label `templates used` below it.

The stat should display exactly: large teal `0` on top, `templates used` in muted text below. No currency symbol anywhere near it.

---

### Task 2 — Logo Size
**File:** Header component and Footer component.

**Change:**
- Header logo: increase to `height: 48px`, `width: auto`. Make sure it's not being constrained by a parent container.
- Footer logo: increase to `height: 40px`, `width: auto`.

If the logo appears blurry at larger sizes, check if there's a higher resolution version in the images folder and use that instead.

---

### Task 3 — Remove Pricing Line
**File:** Contact section component or page file.

**Remove entirely:** The line that reads *"Most local business projects run between $1,500 and $4,000. Every project is scoped to what you actually need — no retainers, no surprise invoices."*

Do not replace it with anything. The contact section should go directly from the subheadline to the form.

---

### Task 4 — Portfolio Gradient Fix
**File:** Portfolio/Recent Work section component.

**Change:** The dark gradient overlay on the right side of the Flatline MMA image is too strong — it blacks out too much of the photo.

Replace the current gradient with a much more subtle version:
```css
background: linear-gradient(to right, transparent 30%, rgba(10,10,10,0.4) 70%, var(--bg) 100%);
```

The goal: the image should be clearly visible and recognizable across most of its width, with only a gentle fade into the dark background on the far right edge where it meets the text column. The fighters and the site content should be clearly visible.

---

### Task 5 — Footer Redesign
**File:** Footer component.

**Replace the current footer with this structure:**

Layout: Three columns on desktop, stacked on mobile.

**Left column:**
- LWS logo image, `height: 40px`
- Below logo: tagline in Inter 13px, muted color — `Web systems for local businesses`

**Center column:**
- Single nav link: `Get in Touch` — clicking scrolls smoothly to the contact form (use `href="#contact"` or equivalent anchor)
- Style: Inter 14px, muted color, hover: white

**Right column:**
- Copyright: `© 2026 Ladner Web Systems` — Inter 13px, muted color, right-aligned

**Global footer styles:**
- Background: `#0a0a0a` (same as page background, no visible separation needed)
- Top border: `1px solid rgba(255,255,255,0.06)`
- Padding: `2.5rem 0`
- Max-width container centered

---

### Task 6 — Ticker Fix: Size, Centering, Layout Shift
**File:** Hero section component.

**Current problems:**
1. The ticker line is too small
2. It's not properly centered
3. The line shifts left/right as words of different lengths swap in

**Fix all three:**

HTML structure should be:
```html
<p class="ticker-line">
  For <span class="ticker-word">plumbers</span>
</p>
```

CSS:
```css
.ticker-line {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2.2vw, 1.6rem);
  color: var(--muted);
  text-align: center;
  width: 100%;
  display: block;
  margin: 1rem 0;
}

.ticker-word {
  display: inline-block;
  min-width: 180px;
  text-align: center;
  color: var(--teal);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: rgba(0,180,216,0.4);
  text-underline-offset: 4px;
  transition: opacity 0.3s ease;
}
```

The `min-width: 180px` on `.ticker-word` ensures the line never shifts when the word changes length. The word fades out, swaps, fades back in — the surrounding "For" text never moves.

Word cycle order: `plumbers → electricians → salons → restaurants → contractors → gyms → landscapers → cafes`

Fade timing: each word stays visible for 2.5 seconds, fade transition takes 0.4 seconds.

---

## PART 2 — HERO DYNAMIC ANIMATIONS

### Task 7 — Mouse-Reactive Dot Grid
**File:** Hero section component. The canvas element should already exist from the previous implementation plan. If not, add it.

**Replace the current static dot grid with a mouse-reactive version:**

```javascript
const canvas = document.getElementById('hero-canvas')
const ctx = canvas.getContext('2d')
let mouse = { x: canvas.width / 2, y: canvas.height / 2 }
let animFrame

function resizeCanvas() {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

window.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
})

function drawGrid(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  const spacing = 40
  const cols = Math.ceil(canvas.width / spacing)
  const rows = Math.ceil(canvas.height / spacing)
  
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const baseX = i * spacing
      const baseY = j * spacing
      
      // Distance from mouse
      const dx = mouse.x - baseX
      const dy = mouse.y - baseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 120
      
      // Repel dots away from cursor
      let x = baseX
      let y = baseY
      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist
        x = baseX - (dx / dist) * force * 12
        y = baseY - (dy / dist) * force * 12
      }
      
      // Pulse opacity with slow sine wave
      const pulse = 0.08 + 0.06 * Math.sin(time * 0.0008 + i * 0.3 + j * 0.3)
      // Dots near cursor glow brighter
      const proximity = dist < maxDist ? (maxDist - dist) / maxDist * 0.2 : 0
      const opacity = pulse + proximity
      
      ctx.beginPath()
      ctx.arc(x, y, 1.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 180, 216, ${opacity})`
      ctx.fill()
    }
  }
  
  animFrame = requestAnimationFrame(drawGrid)
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()
requestAnimationFrame(drawGrid)

// Clean up on page unload
window.addEventListener('unload', () => cancelAnimationFrame(animFrame))
```

**Important:** Wrap this entire script in a `prefers-reduced-motion` check:
```javascript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) {
  // run the animation above
}
```

---

### Task 8 — Word-by-Word Headline Reveal
**File:** Hero section component.

**How it works:** On page load, each word of the headline appears individually — sliding up from below and fading in — in sequence. The total reveal takes about 1.2 seconds.

**Implementation:**

Split both headline lines into individual word spans at render time:

Line 1 words: `Your`, `customers`, `are`, `searching.`
Line 2 words: `Make`, `sure`, `they`, `find`, `you.`

Each word gets wrapped in:
```html
<span class="word-reveal" style="display: inline-block; opacity: 0; transform: translateY(20px);">word</span>
```

On page load, run this after a short delay (100ms):
```javascript
const words = document.querySelectorAll('.word-reveal')
words.forEach((word, i) => {
  setTimeout(() => {
    word.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    word.style.opacity = '1'
    word.style.transform = 'translateY(0)'
  }, i * 80)
})
```

Stagger of `80ms` per word means the full reveal completes in about 720ms. Line 1 finishes just as Line 2 begins.

**Important:** The subheadline, ticker, and buttons should fade in AFTER the headline reveal completes. Add a delay of `800ms` to their reveal animations.

Respect `prefers-reduced-motion` — if set, show all words immediately with no animation.

---

### Task 9 — Teal Line Draws Itself
**File:** Hero section component.

**The teal horizontal line between the two headline lines should animate in like a pen stroke — growing from width 0 to its full width.**

Current state: the line probably appears instantly or fades in.

**Replace with:**
```css
.headline-divider {
  display: block;
  width: 60px;
  height: 2px;
  background: var(--teal);
  margin: 0.5rem auto;
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.headline-divider.animate {
  transform: scaleX(1);
}
```

Trigger the `.animate` class via JavaScript after the first line of the headline has finished revealing (delay: `400ms` after page load).

---

### Task 10 — Scroll-Triggered Headline Split
**File:** Hero section component.

**As the user scrolls down from the hero, the two headline lines drift apart and fade out, creating a dramatic cinematic exit.**

Implementation using scroll event listener:

```javascript
window.addEventListener('scroll', () => {
  const heroHeight = document.querySelector('.hero').offsetHeight
  const scrollProgress = Math.min(window.scrollY / (heroHeight * 0.5), 1)
  
  const line1 = document.querySelector('.headline-line-1')
  const line2 = document.querySelector('.headline-line-2')
  
  if (line1 && line2) {
    const offset = scrollProgress * 40
    const opacity = 1 - scrollProgress * 1.5
    
    line1.style.transform = `translateY(${-offset}px)`
    line1.style.opacity = Math.max(0, opacity)
    
    line2.style.transform = `translateY(${offset}px)`
    line2.style.opacity = Math.max(0, opacity)
  }
})
```

This means:
- At 0% scroll: both lines in normal position, full opacity
- At 50% scroll through hero height: lines have drifted 40px apart, nearly transparent

The effect stops once the hero is scrolled past — only applies while the hero is in view.

Respect `prefers-reduced-motion` — skip this entirely if set.

---

### Task 11 — Final Timing Sequence
**File:** Hero section component.

Ensure all animations fire in this exact order on page load:

| Time | Event |
|------|-------|
| 0ms | Page loads, dot grid starts |
| 100ms | Eyebrow label fades in |
| 200ms | Word-by-word headline reveal starts |
| 600ms | Teal divider line draws itself |
| 900ms | Subheadline fades in |
| 1100ms | Ticker line fades in |
| 1300ms | CTA buttons fade in |
| 1600ms | Scroll indicator chevron appears |

Each element except the word reveal should use simple CSS transitions triggered by adding a class via `setTimeout`.

---

## Definition of Done

**Fixes verified:**
- [ ] Stats shows `0` not `$0`
- [ ] Header logo is clearly visible at proper size
- [ ] Footer logo is clearly visible at proper size
- [ ] No pricing text in contact section
- [ ] Flatline MMA image is clearly visible — fighters recognizable
- [ ] Ticker is large, centered, and does not shift on word change
- [ ] Footer has logo, tagline, Get in Touch link, copyright

**Animations verified:**
- [ ] Dot grid reacts visibly to mouse movement — dots repel from cursor
- [ ] Headline words reveal one by one on page load
- [ ] Teal line draws itself after headline line 1 appears
- [ ] Scrolling causes headline lines to drift apart and fade
- [ ] All animations disabled when `prefers-reduced-motion` is set
- [ ] No janky layout shifts during any animation
- [ ] Performance: page still loads in under 3 seconds
- [ ] All animations work correctly on Chrome, Firefox, and Edge
