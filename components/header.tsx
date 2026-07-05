"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "border-b border-border/60 bg-background shadow-md"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-0 sm:px-2 lg:px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/Ladner_Systems.png"
            alt="Ladner Web Systems Logo"
            width={240}
            height={80}
            className="h-45 w-auto sm:h-45"
            priority
          />
        </div>
        <div className="flex items-center gap-4">
          <Button size="sm" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
