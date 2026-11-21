import type { ReactNode } from 'react'

interface PageHeaderProps {
  kicker: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageHeader({ kicker, title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-14">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 noise-bg" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-28 left-1/4 size-96 rounded-full bg-teal-400/12 blur-3xl dark:bg-teal-500/8"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-16 right-0 size-80 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/8"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/8 px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-600 uppercase dark:border-teal-400/20 dark:text-teal-300">
          <span className="size-1.5 rounded-full bg-teal-500" />
          {kicker}
        </span>

        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
