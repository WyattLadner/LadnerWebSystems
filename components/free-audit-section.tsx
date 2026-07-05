import { Button } from "@/components/ui/button"

export function FreeAuditSection() {
  return (
    <section className="reveal border-t-2 border-teal bg-surface px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-[2rem] font-bold text-foreground">
          Not sure where to start?
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          We&apos;ll audit your current online presence for free — no pitch, no pressure. You&apos;ll know exactly what&apos;s hurting you before you spend a dollar.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild className="rounded-md font-heading font-bold">
            <a href="#contact">Get a free audit</a>
          </Button>
        </div>
        <p className="mt-3 text-[13px] text-muted-foreground">
          Usually delivered within 48 hours. No strings attached.
        </p>
      </div>
    </section>
  )
}
