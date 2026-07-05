import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Image
            src="/Ladner_Systems.png"
            alt="Ladner Web Systems Logo"
            width={156}
            height={40}
            className="h-10 w-auto"
          />
          <p className="text-[13px] text-muted-foreground">
            Web systems for local businesses
          </p>
        </div>

        <div className="flex justify-center">
          <a
            href="#contact"
            className="text-sm text-muted-foreground transition-colors hover:text-white"
          >
            Get in Touch
          </a>
        </div>

        <p className="text-center text-[13px] text-muted-foreground sm:text-right">
          &copy; {currentYear} Ladner Web Systems
        </p>
      </div>
    </footer>
  )
}
