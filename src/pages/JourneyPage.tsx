import { GraduationCap, Sparkles, Target } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { CTASection } from '../components/CTASection'
import { timeline } from '../data/skills'
import { goals, subjects } from '../data/profile'
import { localize } from '../lib/locale'

export function JourneyPage() {
  const { t, lang } = useLang()
  usePageTitle(t.nav.journey)

  return (
    <>
      <PageHeader kicker={t.journey.kicker} title={t.journey.title} subtitle={t.journey.subtitle} />

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-28">
        <div className="container-page">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <Sparkles className="size-5 text-teal-500" />
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-900 dark:text-white">
                {t.journey.timelineTitle}
              </h2>
            </div>
          </Reveal>

          <ol className="relative mx-auto mt-12 max-w-3xl space-y-8 border-l border-dashed border-teal-500/30 pl-8 sm:pl-12">
            {timeline.map((item, index) => (
              <li key={item.year} className="relative">
                <span className="absolute top-2 -left-[43px] grid size-5 place-items-center rounded-full border-2 border-teal-500 bg-paper sm:-left-[51px] dark:bg-ink">
                  <span className="size-2 rounded-full bg-teal-500" />
                </span>
                <Reveal delay={index * 60}>
                  <div className="card-surface card-hover p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 px-3 py-1 font-mono text-xs font-bold text-white shadow-sm">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold">{localize(item.title, lang)}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {localize(item.text, lang)}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-alt py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <Target className="size-5 text-teal-500" />
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {t.journey.goalsTitle}
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <Reveal key={goal.title.en} delay={index * 60} className="h-full">
                <div className="card-surface card-hover flex h-full flex-col p-6 sm:p-7">
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-300">
                    Goal 0{index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-bold">{localize(goal.title, lang)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {localize(goal.text, lang)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <div className="card-surface p-7 sm:p-10">
              <h3 className="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-white">
                <GraduationCap className="size-5 text-teal-500" />
                {t.about.eduTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                {t.about.eduText}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <span
                    key={subject.en}
                    className="chip bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-300"
                  >
                    {localize(subject, lang)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        kicker={t.journey.kicker}
        title={t.journey.ctaTitle}
        text={t.journey.ctaText}
        primaryLabel={t.journey.ctaButton}
        primaryTo="/contact"
        secondaryLabel={t.projects.title}
        secondaryTo="/projects"
      />
    </>
  )
}
