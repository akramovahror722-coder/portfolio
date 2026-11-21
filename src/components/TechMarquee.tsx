import { useLang } from '../context/LangContext'
import { techStack } from '../data/skills'

export function TechMarquee() {
  const { t } = useLang()
  const items = [...techStack, ...techStack]

  return (
    <div className="relative border-y border-slate-200/60 bg-white/50 py-5 dark:border-white/[0.07] dark:bg-white/[0.015]">
      <p className="mb-3 text-center font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase dark:text-slate-500">
        {t.home.marquee}
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-2.5 hover:[animation-play-state:paused]">
          {items.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="chip border border-slate-200/70 bg-white/80 text-slate-600 shadow-sm transition-colors hover:border-teal-400/40 hover:text-teal-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300 dark:hover:text-teal-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
