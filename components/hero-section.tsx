"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const BUSINESS_TYPES = [
  "plumbers",
  "electricians",
  "salons",
  "restaurants",
  "contractors",
  "gyms",
]

const REVEAL_BASE =
  "transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"

function revealClass(mounted: boolean, delay: string, reducedMotion: boolean) {
  if (reducedMotion) return "opacity-100 translate-y-0"
  return `${REVEAL_BASE} ${delay} ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const interval = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % BUSINESS_TYPES.length)
        setWordVisible(true)
      }, 300)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setPastHero(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const spacing = 40
    let raf = 0

    function resize() {
      const parent = canvas!.parentElement
      canvas!.width = parent ? parent.clientWidth : window.innerWidth
      canvas!.height = parent ? parent.clientHeight : window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    function draw(time: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (let x = 0; x < canvas!.width; x += spacing) {
        for (let y = 0; y < canvas!.height; y += spacing) {
          const opacity = prefersReduced
            ? 0.1
            : 0.05 + 0.1 * Math.sin(time * 0.001 + x * 0.01 + y * 0.01)
          ctx!.fillStyle = `rgba(0, 180, 216, ${opacity})`
          ctx!.beginPath()
          ctx!.arc(x, y, 1, 0, Math.PI * 2)
          ctx!.fill()
        }
      }
      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <p
          className={`text-xs font-medium uppercase tracking-[0.12em] text-teal ${revealClass(mounted, "", reducedMotion)}`}
        >
          Built for local businesses
        </p>

        <h1
          className={`mt-6 font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-foreground ${revealClass(mounted, "delay-150", reducedMotion)}`}
        >
          <span className="block font-normal">
            Your customers are searching.
          </span>
          <span
            className={
              reducedMotion
                ? "mx-auto my-3 block h-0.5 w-15 bg-teal"
                : `mx-auto my-3 block h-0.5 bg-teal transition-all duration-400 delay-300 ${mounted ? "w-15" : "w-0"}`
            }
          />
          <span className="block font-extrabold">
            Make sure they find you.
          </span>
        </h1>

        <p
          className={`mx-auto mt-6 max-w-[560px] text-lg text-muted-foreground ${revealClass(mounted, "delay-300", reducedMotion)}`}
        >
          We build websites and lead-capture systems for local businesses that are tired of losing customers to competitors with a better online presence.
        </p>

        <p
          className={`mt-4 text-base text-muted-foreground ${revealClass(mounted, "delay-400", reducedMotion)}`}
        >
          For{" "}
          <span
            className={`inline-block font-medium text-teal transition-opacity duration-300 ${wordVisible ? "opacity-100" : "opacity-0"}`}
          >
            {BUSINESS_TYPES[wordIndex]}
          </span>
        </p>

        <div
          className={`mt-8 flex flex-col justify-center gap-3 sm:flex-row ${revealClass(mounted, "delay-500", reducedMotion)}`}
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
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-opacity duration-300 ${pastHero ? "opacity-0" : "opacity-100"}`}
      >
        <ChevronDown className="size-6 animate-chevron-bob" />
      </a>
    </section>
  )
}
