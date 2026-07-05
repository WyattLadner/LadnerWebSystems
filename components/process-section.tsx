import { StatsRow } from "@/components/stats-section"

const steps = [
  {
    number: "01",
    title: "Audit",
    description:
      "We look at your current online presence and identify exactly what's costing you customers.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We design and build your site or system, tailored to your business. No templates, no cookie-cutter layouts.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "You go live. We make sure everything works and you know how to use it.",
  },
]

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-20 bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="reveal text-center text-xs font-medium uppercase tracking-[0.12em] text-teal">
          The Process
        </p>
        <h2 className="reveal mt-3 text-center font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-foreground">
          From audit to launch in under a week
        </h2>
        <div className="relative mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-teal-border sm:block" />
          {steps.map((step, index) => (
            <div
              key={step.number}
              style={{ transitionDelay: `${index * 0.1}s` }}
              className="reveal relative border-t-2 border-teal pt-8 text-center"
            >
              <span className="pointer-events-none absolute inset-x-0 top-6 select-none font-heading text-[5rem] font-extrabold leading-none text-teal-dim">
                {step.number}
              </span>
              <h3 className="relative mt-8 font-heading text-[22px] font-bold text-foreground">
                {step.title}
              </h3>
              <p className="relative mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 mb-10 border-t border-[rgba(0,180,216,0.15)]" />

        <StatsRow />
      </div>
    </section>
  )
}
