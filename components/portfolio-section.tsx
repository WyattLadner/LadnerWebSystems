import { ArrowRight } from "lucide-react"

const tags = ["Website", "Booking System", "Mobile Optimized"]

export function PortfolioSection() {
  return (
    <section id="work" className="mt-28 scroll-mt-20 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="reveal-left relative min-h-125 bg-cover bg-top after:absolute after:inset-0 after:bg-[linear-gradient(to_right,transparent_30%,rgba(10,10,10,0.4)_70%,var(--bg)_100%)]"
          style={{ backgroundImage: "url(/flatline_hero.png)" }}
        />
        <div className="reveal-right flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-16 lg:p-16">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-teal">
            Recent Work
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold text-foreground">
            Flatline MMA
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Bay Saint Louis, MS
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-teal-border bg-teal-dim px-2.5 py-1 text-xs text-teal"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-md text-base leading-[1.7] text-muted-foreground">
            A full website and booking system for a premier mixed martial arts gym. Built from scratch — video hero, coach profiles, program pages, and a direct contact flow.
          </p>
          <a
            href="https://flatlinemma.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-teal transition-opacity hover:opacity-80"
          >
            View site <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
