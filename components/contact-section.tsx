"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const SERVICES = [
  "Design",
  "Supply",
  "Installation",
  "Testing & Maintenance",
  "Consultancy",
  "Other",
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [service, setService] = useState<string>("Design")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    ;(e.currentTarget as HTMLFormElement).reset()
    setService("Design")
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-32 border-b border-rule paper-texture"
    >
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">
            № 07 — Correspondence
          </div>
          <div className="folio col-span-6 text-right text-muted-foreground">
            Replies within one business day
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          {/* Left: letter */}
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow text-muted-foreground">Correspond</div>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">
              Write to <span className="italic">the desk.</span>
            </h2>

            <div className="mt-10 space-y-6 text-[15px] leading-[1.75] text-foreground/85">
              <p className="font-display italic text-foreground/70">
                Dear engineer,
              </p>
              <p>
                Send a brief — site survey requests, BOQs, audits, and full
                FTTX programmes are all welcome. The note that follows will
                land on the desk of a senior optical engineer, not a sales
                inbox.
              </p>
              <p>
                If you prefer, you can reach us by post, by phone, or in person
                at the addresses below.
              </p>
              <p className="font-display italic">— The Editor.</p>
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-5 border-t border-rule pt-8 sm:grid-cols-2">
              {[
                ["Operations", "+20 2 1234 5678"],
                ["Project enquiries", "projects@fibercity.eg"],
                ["Headquarters", "Smart Village, B12, Cairo"],
                ["Hours", "Sun – Thu · 09 – 18 EET"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-rule pt-2">
                  <dt className="folio text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-display text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: brief form */}
          <div className="col-span-12 lg:col-span-7">
            <div className="border border-foreground bg-card paper-texture">
              {/* Form masthead */}
              <div className="flex items-baseline justify-between border-b border-foreground/30 px-6 py-4">
                <span className="font-display text-xl italic">
                  A project brief.
                </span>
                <span className="folio text-muted-foreground tabular">
                  Form №.07
                </span>
              </div>

              <div className="p-6 sm:p-10">
                {submitted ? (
                  <div className="flex h-[420px] flex-col items-center justify-center text-center">
                    <span className="font-display text-6xl italic text-accent">
                      thank you.
                    </span>
                    <h3 className="mt-6 font-display text-2xl tracking-tight">
                      Brief received.
                    </h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-[1.6] text-foreground/75">
                      A senior engineer will reply within one business day. In
                      the meantime, drawings may be sent to{" "}
                      <span className="italic">projects@fibercity.eg</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-8 border-b border-foreground pb-1 text-sm font-medium"
                    >
                      Submit another →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="grid gap-7">
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field
                        label="Full name"
                        name="name"
                        placeholder="Ahmed Hassan"
                        required
                      />
                      <Field
                        label="Company"
                        name="company"
                        placeholder="Vodafone Egypt"
                        required
                      />
                    </div>
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field
                        label="Work email"
                        name="email"
                        type="email"
                        placeholder="ahmed@vodafone.com"
                        required
                      />
                      <Field
                        label="Phone"
                        name="phone"
                        type="tel"
                        placeholder="+20 100 000 0000"
                      />
                    </div>

                    <div>
                      <label className="folio text-muted-foreground">
                        Service required
                      </label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {SERVICES.map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setService(s)}
                            aria-pressed={service === s}
                            className={cn(
                              "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition",
                              service === s
                                ? "border-foreground bg-foreground text-background"
                                : "border-rule text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="service" value={service} />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="folio text-muted-foreground"
                      >
                        Project brief
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell us about scope, locations, timelines, and technical constraints…"
                        className="mt-2 w-full border-0 border-b border-foreground/30 bg-transparent px-0 py-2 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col items-stretch gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="folio text-muted-foreground">
                        Encrypted in transit · No marketing list
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-background hover:text-foreground"
                      >
                        Send brief
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="folio text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border-0 border-b border-foreground/30 bg-transparent px-0 py-2 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
      />
    </div>
  )
}
