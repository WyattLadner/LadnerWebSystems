"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const BUSINESS_TYPES = [
  "plumbers",
  "electricians",
  "salons",
  "restaurants",
  "contractors",
  "gyms",
  "landscapers",
  "cafes",
]

const LINE_1_WORDS = ["Your", "customers", "are", "searching."]
const LINE_2_WORDS = ["Make", "sure", "they", "find", "you."]

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]"

function fadeClass(visible: boolean, reducedMotion: boolean) {
  if (reducedMotion) return "opacity-100 translate-y-0"
  return `transition-all duration-600 ${EASE} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
}

function renderWords(
  words: string[],
  offset: number,
  headlineReveal: boolean,
  reducedMotion: boolean,
) {
  const nodes: ReactNode[] = []
  words.forEach((word, i) => {
    const globalIndex = offset + i
    nodes.push(
      <span
        key={`${word}-${globalIndex}`}
        style={reducedMotion ? undefined : { transitionDelay: `${globalIndex * 80}ms` }}
        className={
          reducedMotion
            ? "inline-block"
            : `inline-block transition-all duration-500 ${EASE} ${headlineReveal ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`
        }
      >
        {word}
      </span>,
    )
    if (i < words.length - 1) nodes.push(" ")
  })
  return nodes
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)

  const [reducedMotion, setReducedMotion] = useState(false)
  const [headlineReveal, setHeadlineReveal] = useState(false)
  const [eyebrowVisible, setEyebrowVisible] = useState(false)
  const [dividerAnimate, setDividerAnimate] = useState(false)
  const [subheadlineVisible, setSubheadlineVisible] = useState(false)
  const [tickerVisible, setTickerVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [chevronVisible, setChevronVisible] = useState(false)

  const [wordIndex, setWordIndex] = useState(0)
  const [tickerWordVisible, setTickerWordVisible] = useState(true)
  const [pastHero, setPastHero] = useState(false)

  // Final timing sequence
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReducedMotion(reduced)

    if (reduced) {
      setEyebrowVisible(true)
      setHeadlineReveal(true)
      setDividerAnimate(true)
      setSubheadlineVisible(true)
      setTickerVisible(true)
      setCtaVisible(true)
      setChevronVisible(true)
      return
    }

    const timers = [
      setTimeout(() => setEyebrowVisible(true), 100),
      setTimeout(() => setHeadlineReveal(true), 200),
      setTimeout(() => setDividerAnimate(true), 600),
      setTimeout(() => setSubheadlineVisible(true), 900),
      setTimeout(() => setTickerVisible(true), 1100),
      setTimeout(() => setCtaVisible(true), 1300),
      setTimeout(() => setChevronVisible(true), 1600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Business-type ticker word cycle
  useEffect(() => {
    if (reducedMotion) return
    const interval = setInterval(() => {
      setTickerWordVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % BUSINESS_TYPES.length)
        setTickerWordVisible(true)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [reducedMotion])

  // Scroll indicator fade + scroll-triggered headline split
  useEffect(() => {
    setPastHero(window.scrollY > 40)

    function handleScroll() {
      setPastHero(window.scrollY > 40)

      if (reducedMotion) return
      const hero = sectionRef.current
      if (!hero) return
      const heroHeight = hero.offsetHeight
      const scrollProgress = Math.min(window.scrollY / (heroHeight * 0.5), 1)
      const offset = scrollProgress * 40
      const opacity = Math.max(0, 1 - scrollProgress * 1.5)

      if (line1Ref.current) {
        line1Ref.current.style.transform = `translateY(${-offset}px)`
        line1Ref.current.style.opacity = String(opacity)
      }
      if (line2Ref.current) {
        line2Ref.current.style.transform = `translateY(${offset}px)`
        line2Ref.current.style.opacity = String(opacity)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [reducedMotion])

  // Mouse-reactive dot grid
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const spacing = 40
    const maxDist = 150
    const mouse = { x: -1000, y: -1000 }
    let raf = 0

    function resize() {
      const parent = canvas!.parentElement
      canvas!.width = parent ? parent.clientWidth : window.innerWidth
      canvas!.height = parent ? parent.clientHeight : window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    if (!prefersReduced) window.addEventListener("mousemove", handleMouseMove)

    function drawStatic() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (let x = 0; x < canvas!.width; x += spacing) {
        for (let y = 0; y < canvas!.height; y += spacing) {
          ctx!.beginPath()
          ctx!.arc(x, y, 1, 0, Math.PI * 2)
          ctx!.fillStyle = "rgba(0, 180, 216, 0.1)"
          ctx!.fill()
        }
      }
    }

    function drawGrid(time: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const cols = Math.ceil(canvas!.width / spacing)
      const rows = Math.ceil(canvas!.height / spacing)

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const baseX = i * spacing
          const baseY = j * spacing

          const dx = mouse.x - baseX
          const dy = mouse.y - baseY
          const dist = Math.sqrt(dx * dx + dy * dy)

          let x = baseX
          let y = baseY
          if (dist < maxDist && dist > 0) {
            const force = (maxDist - dist) / maxDist
            x = baseX - (dx / dist) * force * 28
            y = baseY - (dy / dist) * force * 28
          }

          const pulse = 0.18 + 0.17 * Math.sin(time * 0.0008 + i * 0.3 + j * 0.3)
          const proximity = dist < maxDist ? ((maxDist - dist) / maxDist) * 0.4 : 0
          const opacity = pulse + proximity

          ctx!.beginPath()
          ctx!.arc(x, y, 1.8, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(0, 180, 216, ${opacity})`
          ctx!.fill()
        }
      }
      raf = requestAnimationFrame(drawGrid)
    }

    if (prefersReduced) {
      drawStatic()
    } else {
      raf = requestAnimationFrame(drawGrid)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-125 w-200 -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,180,216,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <p
          className={`text-xs font-medium uppercase tracking-[0.12em] text-teal ${fadeClass(eyebrowVisible, reducedMotion)}`}
        >
          Built for local businesses
        </p>

        <h1 className="mt-6 font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-foreground">
          <span ref={line1Ref} className="block pb-[0.2em] font-normal leading-tight">
            {renderWords(LINE_1_WORDS, 0, headlineReveal, reducedMotion)}
          </span>
          <span
            className={`mx-auto my-3 block h-0.5 w-15 origin-left bg-teal ${
              reducedMotion
                ? ""
                : `transition-transform duration-500 ${EASE} ${dividerAnimate ? "scale-x-100" : "scale-x-0"}`
            }`}
          />
          <span
            ref={line2Ref}
            className="block font-extrabold [text-shadow:0_0_80px_rgba(0,180,216,0.25),0_0_160px_rgba(0,180,216,0.1)]"
          >
            {renderWords(LINE_2_WORDS, LINE_1_WORDS.length, headlineReveal, reducedMotion)}
          </span>
        </h1>

        <p
          className={`mx-auto mt-6 max-w-140 text-lg text-muted-foreground ${fadeClass(subheadlineVisible, reducedMotion)}`}
        >
          We build websites and lead-capture systems for local businesses that are tired of losing customers to competitors with a better online presence.
        </p>

        <div
          className={`mx-auto my-4 grid w-full grid-cols-2 items-baseline text-[clamp(1.1rem,2.2vw,1.6rem)] text-muted-foreground ${fadeClass(tickerVisible, reducedMotion)}`}
        >
          <span className="pr-[0.3em] text-right">For</span>
          <span
            className={`text-left font-bold text-teal no-underline transition-opacity duration-400 ${tickerWordVisible ? "opacity-100" : "opacity-0"}`}
          >
            {BUSINESS_TYPES[wordIndex]}
          </span>
        </div>

        <div
          className={`mt-8 flex flex-col justify-center gap-3 sm:flex-row ${fadeClass(ctaVisible, reducedMotion)}`}
        >
          <Button
            size="lg"
            asChild
            className="rounded-md font-heading text-[15px] font-bold"
          >
            <a href="#process">See how it works</a>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-md border-faint font-heading text-[15px] font-bold hover:border-teal-border hover:text-teal">
            <a href="#work">View our work</a>
          </Button>
        </div>
      </div>

      <a
        href="#work"
        aria-hidden="true"
        tabIndex={-1}
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-opacity duration-300 ${chevronVisible && !pastHero ? "opacity-100" : "opacity-0"}`}
      >
        <ChevronDown className="size-6 animate-chevron-bob" />
      </a>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,180,216,0.4) 20%, rgba(0,180,216,0.4) 80%, transparent)",
        }}
      />
    </section>
  )
}
