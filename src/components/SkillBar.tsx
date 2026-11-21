import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import type { Skill } from '../types'
import { localize } from '../lib/locale'

const groupGradient: Record<Skill['group'], string> = {
  frontend: 'from-teal-500 to-cyan-400',
  backend: 'from-blue-500 to-indigo-400',
  language: 'from-emerald-500 to-lime-400',
}

export function SkillBar({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
          {skill.note && (
            <span className="chip bg-slate-500/10 text-[10px] text-slate-500 ring-slate-500/20 dark:text-slate-400">
              {localize(skill.note, lang)}
            </span>
          )}
        </div>
        <span className="font-mono text-xs font-medium text-slate-400">{skill.level}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${groupGradient[skill.group]} transition-[width] duration-1000 ease-out`}
          style={{ width: active ? `${skill.level}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  )
}
