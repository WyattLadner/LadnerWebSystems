import { Button } from "@/components/ui/button"

export function FreeAuditSection() {
  return (
    <section className="border-t border-primary/40 bg-primary/5 px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Not sure where to start?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We&apos;ll audit your current online presence for free — no pitch, no pressure. You&apos;ll know exactly what&apos;s hurting you before you spend a dollar.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <a href="#contact">Get a free audit</a>
          </Button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Usually delivered within 48 hours. No strings attached.
        </p>
      </div>
    </section>
  )
}
