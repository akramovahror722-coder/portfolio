import { Calendar, GraduationCap, Heart, MapPin, Sparkles, Target, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { hobbies, subjects, values } from '../data/profile'
import { localize } from '../lib/locale'

export function AboutPage() {
  const { t, lang } = useLang()
  usePageTitle(t.nav.about)

  const facts = [
    { icon: Calendar, label: t.about.facts.birth, value: t.about.facts.birthValue },
    { icon: MapPin, label: t.about.facts.birthplace, value: t.about.facts.birthplaceValue },
    { icon: GraduationCap, label: t.about.facts.school, value: t.about.facts.schoolValue },
    { icon: Target, label: t.about.facts.goal, value: t.about.facts.goalValue },
  ]

  return (
    <>
      <PageHeader kicker={t.about.kicker} title={t.about.title} subtitle={t.about.subtitle} />

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="space-y-6 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              <p className="border-l-4 border-teal-500 pl-5 text-lg font-semibold text-slate-800 sm:text-xl dark:text-slate-200">
                {t.about.lead}
              </p>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <blockquote className="mt-10 rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 sm:p-7">
              <p className="font-mono text-sm leading-relaxed text-teal-700 dark:text-teal-300 sm:text-base">
                &ldquo;{t.about.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-10">
              <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white">
                <Heart className="size-4 text-rose-500" />
                {t.about.hobbiesTitle}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {hobbies.map((hobby) => (
                  <span
                    key={hobby.en}
                    className="chip bg-teal-500/10 px-3 py-1.5 text-sm text-teal-700 ring-teal-500/20 dark:text-teal-300"
                  >
                    {localize(hobby, lang)}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={100}>
              <div className="card-surface p-7 sm:p-8">
                <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white">
                  <Sparkles className="size-4 text-teal-500" />
                  {t.about.factsTitle}
                </h3>

                <ul className="mt-6 space-y-5">
                  {facts.map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300">
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">{label}</p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {value}
                        </p>
                      </div>
                    </li>
                  ))}
                  <li className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300">
                      <MapPin className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-400">{t.contact.address}</p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {t.about.facts.locationValue}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="card-surface relative overflow-hidden p-7 sm:p-8">
                <div
                  className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-teal-400/10 blur-2xl"
                  aria-hidden="true"
                />
                <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white">
                  <User className="size-4 text-teal-500" />
                  {t.about.nowTitle}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t.about.nowText}
                </p>
                <ul className="mt-5 space-y-3">
                  {t.about.nowList.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-alt py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t.about.valuesTitle}</h2>
            <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
              {t.about.valuesSubtitle}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title.en} delay={index * 60} className="h-full">
                <div className="card-surface card-hover flex h-full flex-col p-6 sm:p-7">
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-300">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-base font-bold">{localize(value.title, lang)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {localize(value.text, lang)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-surface flex h-full flex-col p-7 sm:p-8">
              <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white">
                <GraduationCap className="size-5 text-teal-500" />
                {t.about.eduTitle}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t.about.eduText}
              </p>
              <p className="mt-6 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                {t.about.eduSubjects}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <span key={subject.en} className="chip bg-blue-500/10 text-blue-600 ring-blue-500/20 dark:text-blue-300">
                    {localize(subject, lang)}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-slate-400">{t.about.eduNote}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card-surface relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 p-7 sm:p-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/8 px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-600 uppercase dark:border-teal-400/20 dark:text-teal-300">
                  <span className="size-1.5 rounded-full bg-teal-500" />
                  {t.journey.kicker}
                </span>
                <h3 className="mt-4 text-2xl font-bold">{t.journey.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t.journey.subtitle}
                </p>
              </div>
              <Link to="/journey" className="btn-ghost mt-8 w-fit">
                {t.about.journeyLink}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
