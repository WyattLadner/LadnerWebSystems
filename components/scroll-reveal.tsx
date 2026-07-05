"use client"

import { useEffect } from "react"

export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
