import {
  MousePointerClick,
  PhoneCall,
  Inbox,
  Timer,
  CheckSquare,
  TrendingUp,
  Workflow
} from "lucide-react"

const trustPoints = [
  { title: "Calls to action that actually work", icon: MousePointerClick },
  { title: "Contact that takes seconds, not steps", icon: PhoneCall },
  { title: "Every visitor is a potential lead", icon: Inbox },
  { title: "Follow-ups that run while you sleep", icon: Timer },
  { title: "Every request, organized automatically", icon: CheckSquare },
  { title: "Show up where your customers are searching", icon: TrendingUp },
]

export function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="pointer-events-none absolute -right-8 top-8 opacity-[0.04]" aria-hidden="true">
        <Workflow className="size-48 text-primary" strokeWidth={1} />
      </div>
      <div className="pointer-events-none absolute -left-4 bottom-12 opacity-[0.03]" aria-hidden="true">
        <Workflow className="size-32 rotate-12 text-primary" strokeWidth={1} />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
          Built to convert visitors into customers
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                <point.icon className="size-6 text-primary" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {point.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
