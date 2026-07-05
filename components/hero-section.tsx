import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      {/* Primary glowing orb */}
      <div className="absolute left-[10%] top-[5%] z-0 h-[420px] w-[420px] rounded-full bg-primary/50 blur-[110px] animate-orb-float" />
      <div className="absolute bottom-[5%] right-[10%] z-0 h-[360px] w-[360px] rounded-full bg-primary/45 blur-[100px] animate-orb-float-reverse" /><div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-3 text-sm font-medium tracking-wide text-primary">
          Built for local businesses
        </p>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Your customers are searching. Make sure they find you.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          We build websites and lead-capture systems for local businesses that are tired of losing customers to competitors with a better online presence.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#process">See how it works</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#work">View our work</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
