import {
  Monitor,
  ClipboardList,
  Calendar,
  Inbox,
  Route,
  CalendarDays,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Lead-Capture Forms",
    description: "Turn website visitors into real inquiries — not just traffic",
    icon: Inbox,
  },
  {
    title: "Websites for Local Businesses",
    description: "A site that works as hard as you do, built in under a week",
    icon: Monitor,
  },
  {
    title: "Quote Request Systems",
    description: "Make it easy for customers to ask for a quote — so more of them actually do",
    icon: ClipboardList,
  },
  {
    title: "Appointment Request Systems",
    description: "Fill your schedule without playing phone tag",
    icon: Calendar,
  },
  {
    title: "Follow-Up Workflows",
    description: "Never let a lead go cold — automated follow-ups that run themselves",
    icon: Route,
  },
  {
    title: "Calendar and Booking",
    description: "Connect your site to your schedule in one click",
    icon: CalendarDays,
  },
]

export function ServicesSection() {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl relative z-10">
        <p className="reveal text-center text-xs font-medium uppercase tracking-[0.12em] text-teal">
          What we build
        </p>
        <h2 className="reveal mt-3 text-center font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground">
          Everything a local business needs to get found and get calls
        </h2>
        <p className="reveal mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground">
          Built specifically for local service businesses, not corporate teams.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.title}
              style={{ transitionDelay: `${index * 0.1}s` }}
              className="reveal group border border-faint bg-card transition-all hover:border-teal-border hover:shadow-[0_-2px_0_0_var(--teal),0_0_20px_var(--teal-dim)]"
            >
              <CardHeader className="pb-2">
                <service.icon className="mb-2 size-5.5 text-teal" />
                <CardTitle className="font-heading text-[17px] font-bold text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
