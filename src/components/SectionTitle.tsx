interface SectionTitleProps {
  kicker: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionTitle({ kicker, title, subtitle, align = 'center' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/8 px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-600 uppercase dark:border-teal-400/20 dark:text-teal-300">
        <span className="size-1.5 rounded-full bg-teal-500" />
        {kicker}
      </span>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
