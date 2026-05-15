"use client"

import { useState } from "react"
import { useLanguage } from "@/components/i18n/language-provider"
import { cn } from "@/lib/utils"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactSection() {
  const { t } = useLanguage()
  const [status, setStatus] = useState<Status>("idle")
  const [service, setService] = useState<string>(t.contact.serviceOptions[0]?.value ?? "Design")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) {
        throw new Error(typeof json?.error === "string" ? json.error : "Failed to submit brief")
      }
      setStatus("success")
      form.reset()
      setService(t.contact.serviceOptions[0]?.value ?? "Design")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-32 border-b border-rule paper-texture">
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">{t.contact.folio}</div>
          <div className="folio col-span-6 text-right text-muted-foreground">{t.contact.sectionLabel}</div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow text-muted-foreground">{t.contact.eyebrow}</div>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">
              {t.contact.heading}
              <span className="italic">{t.contact.headingItalic}</span>
            </h2>

            <div className="mt-10 space-y-6 text-[15px] leading-[1.75] text-foreground/85">
              <p className="font-display italic text-foreground/70">{t.contact.salutation}</p>
              <p>{t.contact.body1}</p>
              <p>{t.contact.body2}</p>
              <p className="font-display italic">{t.contact.closing}</p>
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-5 border-t border-rule pt-8 sm:grid-cols-2">
              {[
                [t.contact.operations, "+20 2 1234 5678"],
                [t.contact.enquiries, "projects@fibercity.eg"],
                [t.contact.headquarters, "Smart Village, B12, Cairo"],
                [t.contact.hours, "Sun – Thu · 09 – 18 EET"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-rule pt-2">
                  <dt className="folio text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-display text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="border border-foreground bg-card paper-texture">
              <div className="flex items-baseline justify-between border-b border-foreground/30 px-6 py-4">
                <span className="font-display text-xl italic">{t.contact.formBadge}</span>
                <span className="folio text-muted-foreground tabular">{t.contact.formNumber}</span>
              </div>

              <div className="p-6 sm:p-10">
                {status === "success" ? (
                  <div className="flex h-[420px] flex-col items-center justify-center text-center">
                    <span className="font-display text-6xl italic text-accent">{t.contact.success}</span>
                    <h3 className="mt-6 font-display text-2xl tracking-tight">{t.contact.successHeadline}</h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-[1.6] text-foreground/75">{t.contact.successBody}</p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 border-b border-foreground pb-1 text-sm font-medium"
                    >
                      {t.contact.submitAnother}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="grid gap-7">
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field label={t.contact.fullName} name="name" placeholder={t.contact.placeholderName} required />
                      <Field
                        label={t.contact.company}
                        name="company"
                        placeholder={t.contact.placeholderCompany}
                        required
                      />
                    </div>
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field
                        label={t.contact.workEmail}
                        name="email"
                        type="email"
                        placeholder={t.contact.placeholderEmail}
                        required
                      />
                      <Field
                        label={t.contact.phone}
                        name="phone"
                        type="tel"
                        placeholder={t.contact.placeholderPhone}
                      />
                    </div>

                    <div>
                      <label className="folio text-muted-foreground">{t.contact.serviceRequired}</label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {t.contact.serviceOptions.map((s) => (
                          <button
                            type="button"
                            key={s.value}
                            onClick={() => setService(s.value)}
                            aria-pressed={service === s.value}
                            className={cn(
                              "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition",
                              service === s.value
                                ? "border-foreground bg-foreground text-background"
                                : "border-rule text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="service" value={service} />
                    </div>

                    <div>
                      <label htmlFor="message" className="folio text-muted-foreground">
                        {t.contact.projectBrief}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder={t.contact.placeholderMessage}
                        className="mt-2 w-full border-0 border-b border-foreground/30 bg-transparent px-0 py-2 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
                      />
                    </div>

                    {status === "error" && (
                      <div className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        <strong className="block font-display text-base">{t.contact.failedHeadline}</strong>
                        <span>{errorMessage || t.contact.failedBody}</span>
                      </div>
                    )}

                    <div className="flex flex-col items-stretch gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="folio text-muted-foreground">{t.contact.legal}</p>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-background hover:text-foreground disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === "submitting" ? t.contact.sending : t.contact.submit}
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
