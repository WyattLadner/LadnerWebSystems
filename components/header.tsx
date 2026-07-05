"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-faint bg-[rgba(10,10,10,0.92)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Image
          src="/Ladner_Systems.png"
          alt="Ladner Web Systems Logo"
          width={187}
          height={48}
          className="h-12 w-auto"
          priority
        />
        <Button
          size="sm"
          asChild
          className="rounded-md bg-primary px-5 py-2 font-heading font-bold text-primary-foreground hover:bg-primary hover:opacity-90"
        >
          <a href="#contact">Get in Touch</a>
        </Button>
      </div>
    </header>
  )
}
