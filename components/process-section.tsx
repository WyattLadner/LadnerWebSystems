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
      className="scroll-mt-24 bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-medium tracking-wide text-primary">
          THE PROCESS
        </p>
        <h2 className="mt-3 text-center text-2xl font-bold text-foreground sm:text-3xl">
          From audit to launch in under a week
        </h2>
        <div className="relative mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-primary/30 sm:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 bg-background px-4 text-4xl font-bold text-primary">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
