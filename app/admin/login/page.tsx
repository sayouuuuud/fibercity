"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { loginAdmin } from "@/lib/actions/auth"
import { Lock, Mail, ArrowRight } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:opacity-70"
    >
      {pending ? "Authenticating..." : "Sign In"}
      <ArrowRight className="h-4 w-4" />
    </button>
  )
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const res = await loginAdmin(formData)
    if (res?.error) {
      setError(res.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-fiber-night bg-cover p-4 text-foreground sm:p-8">
      <div className="absolute inset-0 z-0 bg-grid-dark opacity-40"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-night rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-glow-cyan mb-2 font-display text-3xl font-bold tracking-tight text-white">
              Fiber City
            </h1>
            <p className="text-sm text-slate-400">Admin Control Panel</p>
          </div>

          <form action={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  suppressHydrationWarning
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  suppressHydrationWarning
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-center text-sm font-medium text-red-500 border border-red-500/20">
                {error}
              </div>
            )}

            <div className="mt-2">
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
