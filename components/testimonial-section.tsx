import { Quote } from "lucide-react"

export function TestimonialSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* TODO: confirm quote with client */}
      <div className="mx-auto max-w-[700px] rounded-xl border-l-4 border-primary bg-card px-6 py-10 sm:px-10">
        <Quote className="size-8 text-primary" />
        <p className="mt-4 text-xl font-light italic leading-relaxed text-foreground sm:text-2xl">
          Before working with Ladner Web Systems, we didn&apos;t have a website at all. Now we have something we&apos;re actually proud to send people to — and it does exactly what we needed.
        </p>
        <p className="mt-6 text-sm font-medium text-muted-foreground">
          — Cameron Boughton, Flatline MMA, Bay Saint Louis MS
        </p>
      </div>
    </section>
  )
}
