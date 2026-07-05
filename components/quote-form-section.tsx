"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  interest: z.string({
    required_error: "Please select what you are interested in",
  }),
  preferredContactMethod: z.string({
    required_error: "Please select a preferred contact method",
  }),
  message: z.string().optional(),
})

export function QuoteFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      interest: "",
      preferredContactMethod: "either",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setErrorMsg("")

    try {
      console.log(values)

      // Changed: now posts to the local API route instead of directly to n8n
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error("Failed to submit form")

      setIsSuccess(true)
      form.reset({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        interest: "",
        preferredContactMethod: "either",
        message: "",
      })
    } catch (error) {
      setErrorMsg("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="reveal mx-auto mb-12 max-w-3xl text-center">
        <h2 className="pb-[0.2em] font-heading text-[clamp(2rem,4vw,2.5rem)] font-extrabold leading-tight text-foreground">
          Ready to get more customers?
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Fill out the form and we&apos;ll be in touch within 24 hours.
        </p>
      </div>

      <div className="reveal mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 sm:p-10">
        {isSuccess ? (
          <div className="py-12 text-center text-primary">
            <h3 className="mb-2 font-heading text-2xl font-bold">Thank you!</h3>
            <p className="text-muted-foreground">
              We&apos;ve received your request and will be in touch shortly.
            </p>
            <Button className="mt-6" onClick={() => setIsSuccess(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-left"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input className="bg-surface-2" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input className="bg-surface-2" placeholder="Acme Co." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-surface-2"
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-surface-2"
                          placeholder="(555) 123-4567"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What are you interested in?</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-surface-2">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Quote request system">
                            Quote request system
                          </SelectItem>
                          <SelectItem value="Appointment request system">
                            Appointment request system
                          </SelectItem>
                          <SelectItem value="Demo Request">
                            Demo Request
                          </SelectItem>
                          <SelectItem value="Something else">
                            Something else
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredContactMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          {["Phone", "Email", "Either"].map((method) => {
                            const value = method.toLowerCase()
                            const isSelected = field.value === value

                            return (
                              <Button
                                key={value}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                className={`flex-1 transition-all ${isSelected ? "pointer-events-none" : ""
                                  }`}
                                onClick={() => field.onChange(value)}
                              >
                                {method}
                              </Button>
                            )
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little more about what you need..."
                        className="min-h-30 bg-surface-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errorMsg && (
                <p className="text-sm font-medium text-destructive">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                className="w-full rounded-md font-heading font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </section>
  )
}