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
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
          Everything a local business needs to get found and get calls
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Built specifically for local service businesses, not corporate teams.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group bg-card border border-border/40 transition-all hover:bg-card/80 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader className="pb-2">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="size-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
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
