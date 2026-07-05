export function TestimonialSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* TODO: confirm quote with client */}
      <div className="reveal mx-auto max-w-[740px] border-l-[3px] border-teal pl-8">
        <p className="font-heading text-[6rem] font-extrabold leading-[0.5] text-teal">
          &ldquo;
        </p>
        <p className="mt-4 font-heading text-[1.4rem] font-normal italic leading-[1.7] text-foreground">
          Before working with Ladner Web Systems, we didn&apos;t have a website at all. Now we have something we&apos;re actually proud to send people to — and it does exactly what we needed.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          — Cameron Boughton, Flatline MMA, Bay Saint Louis MS
        </p>
      </div>
    </section>
  )
}
