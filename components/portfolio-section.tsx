import { ArrowRight } from "lucide-react"

const projects = [
  {
    name: "Flatline MMA",
    location: "Bay Saint Louis, MS",
    tags: ["Website", "Booking System", "Mobile Optimized"],
    description:
      "A full website and booking system for a premier mixed martial arts gym. Built from scratch — video hero, coach profiles, program pages, and a direct contact flow.",
    url: "https://flatlinemma.vercel.app",
  },
]

export function PortfolioSection() {
  return (
    <section
      id="work"
      className="scroll-mt-24 bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-medium tracking-wide text-primary">
          RECENT WORK
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold text-foreground sm:text-3xl">
          What we&apos;ve built
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group overflow-hidden rounded-xl border border-border/40 bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex aspect-video w-full items-center justify-center bg-secondary text-lg font-semibold text-muted-foreground">
                Flatline MMA
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {project.location}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  View site <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
