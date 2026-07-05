"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 7, prefix: "", label: "days from start to launch" },
  { value: 0, prefix: "", label: "templates used" },
  { value: 1, prefix: "", label: "flat rate, no surprises" },
]

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target)
      return
    }

    const duration = 1500
    const start = performance.now()
    let raf = 0

    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [active, target])

  return value
}

function Stat({ stat }: { stat: (typeof stats)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const value = useCountUp(stat.value, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-[4rem] font-extrabold text-teal">
        {stat.prefix}
        {value}
      </div>
      <p className="mt-3 text-[15px] text-muted-foreground">{stat.label}</p>
    </div>
  )
}

export function StatsRow() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-3">
      {stats.map((stat) => (
        <Stat key={stat.label} stat={stat} />
      ))}
    </div>
  )
}
