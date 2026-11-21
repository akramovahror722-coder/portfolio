import { Award, Clock, GraduationCap } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { certificates } from '../data/certificates'
import { localize } from '../lib/locale'

export function CertificatesPage() {
  const { t, lang } = useLang()
  usePageTitle(t.certificates.title)

  const totalHours = certificates.reduce((sum, item) => sum + item.hours, 0)

  return (
    <>
      <PageHeader
        kicker={t.certificates.kicker}
        title={t.certificates.title}
        subtitle={t.certificates.subtitle}
      >
        <div className="flex flex-wrap gap-3">
          <span className="chip bg-teal-500/10 px-3.5 py-1.5 text-xs text-teal-600 ring-teal-500/20 dark:text-teal-300">
            <Award className="size-3.5" />
            {certificates.length} {t.certificates.courses}
          </span>
          <span className="chip bg-blue-500/10 px-3.5 py-1.5 text-xs text-blue-600 ring-blue-500/20 dark:text-blue-300">
            <Clock className="size-3.5" />
            {totalHours} {t.certificates.hours}
          </span>
        </div>
      </PageHeader>

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-32">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {certificates.map((item, index) => (
            <Reveal key={item.id} delay={index * 60} className="h-full">
              <article className="card-surface card-hover flex h-full gap-5 p-7 sm:p-8">
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md`}
                >
                  <GraduationCap className="size-6" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-slate-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {item.year}
                    </span>
                    <span className="chip bg-slate-500/10 text-slate-500 ring-slate-500/20 dark:text-slate-400">
                      {localize(item.level, lang)}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{localize(item.title, lang)}</h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {localize(item.provider, lang)} · {item.hours} {t.certificates.hours}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="chip bg-teal-500/10 text-teal-600 ring-teal-500/20 dark:text-teal-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
