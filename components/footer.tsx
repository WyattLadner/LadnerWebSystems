import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-faint bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Image
          src="/Ladner_Systems.png"
          alt="Ladner Web Systems Logo"
          width={120}
          height={32}
          className="h-8 w-auto"
        />
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Ladner Web Systems. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
