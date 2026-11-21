import { CheckCircle2, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { SkillBar } from '../components/SkillBar'
import { roadmap, skillGroupNotes, skills, strengths, techStack } from '../data/skills'
import type { RoadmapStatus, SkillGroup } from '../types'
import { localize } from '../lib/locale'

const groups: SkillGroup[] = ['frontend', 'backend', 'language']

const statusStyles: Record<RoadmapStatus, { dot: string; chip: string }> = {
  done: {
    dot: 'border-emerald-500 bg-emerald-500',
    chip: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-300',
  },
  current: {
    dot: 'border-teal-500 bg-teal-500',
    chip: 'bg-teal-500/10 text-teal-600 ring-teal-500/20 dark:text-teal-300',
  },
  next: {
    dot: 'border-slate-400 bg-paper dark:bg-ink',
    chip: 'bg-slate-500/10 text-slate-500 ring-slate-500/20 dark:text-slate-400',
  },
}

export function SkillsPage() {
  const { t, lang } = useLang()
  usePageTitle(t.nav.skills)

  return (
    <>
      <PageHeader kicker={t.skills.kicker} title={t.skills.title} subtitle={t.skills.subtitle}>
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          <span className="size-1.5 rounded-full bg-teal-500" />
          {t.skills.note}
        </p>
      </PageHeader>

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-28">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          {groups.map((group, index) => {
            const groupSkills = skills.filter((skill) => skill.group === group)
            return (
              <Reveal key={group} delay={index * 80} className="h-full">
                <div className="card-surface flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold tracking-tight">{t.skills.groups[group]}</h2>
                    <span className="chip bg-slate-500/10 px-2.5 py-0.5 text-xs text-slate-500 ring-slate-500/20 dark:text-slate-400">
                      {groupSkills.length}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {localize(skillGroupNotes[group], lang)}
                  </p>
                  <div className="mt-8 flex-1 space-y-5">
                    {groupSkills.map((skill, skillIndex) => (
                      <SkillBar key={skill.name} skill={skill} delay={skillIndex * 60} />
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="section-alt py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t.skills.strengthsTitle}</h2>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
              {t.skills.strengthsSubtitle}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((strength, index) => (
              <Reveal key={strength.title.en} delay={index * 50} className="h-full">
                <div className="card-surface card-hover flex h-full gap-3.5 p-6 sm:p-7">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-500" />
                  <div>
                    <h3 className="text-base font-bold">{localize(strength.title, lang)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {localize(strength.text, lang)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t.skills.techTitle}</h2>
              <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
                {t.skills.techSubtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="chip border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs text-slate-600 shadow-sm transition-colors hover:border-teal-400/50 hover:text-teal-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-teal-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link to="/projects" className="btn-ghost mt-8 w-fit">
                {t.skills.roadmapLink}
              </Link>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-2.5">
                <Route className="size-5 text-teal-500" />
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t.skills.roadmapTitle}</h2>
              </div>
              <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
                {t.skills.roadmapSubtitle}
              </p>
            </Reveal>

            <ol className="relative mt-10 space-y-6 border-l border-dashed border-teal-500/30 pl-8">
              {roadmap.map((step, index) => {
                const style = statusStyles[step.status]
                return (
                  <li key={step.title.en} className="relative">
                    <span
                      className={`absolute top-2 -left-[39px] grid size-4 place-items-center rounded-full border-2 ${style.dot}`}
                    >
                      {step.status === 'current' && (
                        <span className="size-1.5 animate-ping rounded-full bg-white" />
                      )}
                    </span>
                    <Reveal delay={index * 60}>
                      <div className="card-surface p-6 sm:p-7">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-base font-bold">{localize(step.title, lang)}</h3>
                          <span className={`chip ${style.chip}`}>
                            {t.skills.roadmapStatus[step.status]}
                          </span>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          {localize(step.text, lang)}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
