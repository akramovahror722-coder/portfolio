import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CTASectionProps {
  kicker: string
  title: string
  text: string
  primaryLabel: string
  primaryTo: string
  secondaryLabel: string
  secondaryTo: string
}

export function CTASection({
  kicker,
  title,
  text,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: CTASectionProps) {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="container-page">
        <div className="card-surface relative overflow-hidden px-6 py-14 text-center sm:px-14 sm:py-20">
          {/* Background decorations */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-teal-400/15 via-cyan-400/10 to-blue-400/10 blur-3xl dark:from-teal-500/8 dark:via-cyan-500/6 dark:to-blue-500/8"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 size-64 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/6"
            aria-hidden="true"
          />

          <div className="relative">
            {/* Kicker */}
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/8 px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-600 uppercase dark:border-teal-400/20 dark:text-teal-300">
              <span className="size-1.5 rounded-full bg-teal-500" />
              {kicker}
            </span>

            <h2 className="mx-auto mt-5 max-w-2xl text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
              {text}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={primaryTo} className="btn-primary w-full sm:w-auto">
                <Mail className="size-4" />
                {primaryLabel}
              </Link>
              <Link to={secondaryTo} className="btn-ghost w-full sm:w-auto">
                {secondaryLabel}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
