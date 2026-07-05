import {
  MousePointerClick,
  PhoneCall,
  Inbox,
  Timer,
  CheckSquare,
  TrendingUp,
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
    <section className="relative bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <h2 className="reveal text-center font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground">
          Built to convert visitors into customers
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point, index) => (
            <div
              key={point.title}
              style={{ transitionDelay: `${index * 0.1}s` }}
              className="reveal flex flex-col items-center text-center"
            >
              <div className="flex size-13 items-center justify-center rounded-full border border-teal-border bg-teal-dim">
                <point.icon className="size-6 text-teal" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-foreground">
                {point.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
