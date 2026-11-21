import { ArrowUpRight, ExternalLink, LayoutGrid, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { miniApps } from '../data/apps'
import { projects } from '../data/projects'
import type { Project } from '../types'
import { localize } from '../lib/locale'

export function AppsPage() {
  const { t, lang } = useLang()
  usePageTitle(t.nav.apps)

  const external = projects.filter((project) => !project.route)
  const internal = projects.filter((project) => project.route)

  return (
    <>
      <PageHeader kicker={t.apps.kicker} title={t.apps.title} subtitle={t.apps.subtitle}>
        <div className="flex flex-wrap gap-3">
          <Link to="/projects" className="btn-ghost">
            <Sparkles className="size-4" />
            {t.nav.projects}
          </Link>
          <Link to="/contact" className="btn-primary">
            {t.home.ctaButton}
          </Link>
        </div>
      </PageHeader>

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-28">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {miniApps.map((app, index) => (
              <Reveal key={app.id} delay={index * 70} className="h-full">
                <article className="card-surface card-hover flex h-full flex-col overflow-hidden">
                  <div className={`h-[3px] w-full bg-gradient-to-r ${app.accent}`} />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${app.accent} text-white shadow-md`}
                      >
                        <AppIcon icon={app.icon} />
                      </span>
                      <span className={`chip truncate text-[11px] ${app.soft}`}>
                        {localize(app.tagline, lang)}
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-bold tracking-tight">{app.title}</h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {localize(app.description, lang)}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {app.features.map((feature) => (
                        <li
                          key={feature.en}
                          className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-teal-500" />
                          <span className="truncate">{localize(feature, lang)}</span>
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-200/60 pt-4 dark:border-white/[0.07]">
                      {app.highlights.map((item) => (
                        <div key={item.label.en}>
                          <dt className="truncate text-[10px] font-medium tracking-wide text-slate-400 uppercase">
                            {localize(item.label, lang)}
                          </dt>
                          <dd className="mt-0.5 truncate font-mono text-xs font-bold text-slate-700 dark:text-slate-200">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-5 flex flex-wrap items-center gap-1.5">
                      {app.tech.map((tech) => (
                        <span
                          key={tech}
                          className="chip bg-slate-500/8 font-mono text-[11px] text-slate-500 ring-slate-500/15 dark:text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link to={app.route} className="btn-primary mt-6 w-full">
                      {t.apps.open}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/8 px-3.5 py-1 text-xs font-semibold tracking-wider text-teal-600 uppercase dark:border-teal-400/20 dark:text-teal-300">
                  <span className="size-1.5 rounded-full bg-teal-500" />
                  {t.apps.allKicker}
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {t.apps.allTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {t.apps.allSubtitle}
                </p>
              </div>
              <Link to="/projects" className="btn-ghost shrink-0">
                <LayoutGrid className="size-4" />
                {t.common.viewAll}
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 space-y-12">
            <ProjectGroup title={t.apps.groupInternal} projects={internal} lang={lang} />
            <ProjectGroup title={t.apps.groupExternal} projects={external} lang={lang} />
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectGroup({
  title,
  projects,
  lang,
}: {
  title: string
  projects: Project[]
  lang: 'uz' | 'en' | 'ru'
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-900 dark:text-white">
        <span className="size-2 rounded-full bg-teal-500" />
        {title}
      </h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="card-surface card-hover flex h-full items-start gap-3.5 p-5">
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${project.accent} text-white shadow-sm`}
              >
                <AppIcon icon={project.icon} small />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{project.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {localize(project.subtitle, lang)}
                </p>
              </div>
              {project.route ? (
                <Link
                  to={project.route}
                  className="shrink-0 rounded-lg bg-teal-500/10 p-2 text-teal-600 transition-colors hover:bg-teal-500/20 dark:text-teal-300"
                  aria-label={project.title}
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              ) : project.demo || project.github ? (
                <a
                  href={project.demo ?? project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-lg bg-slate-500/10 p-2 text-slate-500 transition-colors hover:bg-slate-500/20 hover:text-teal-600 dark:text-slate-300"
                  aria-label={project.title}
                >
                  <ExternalLink className="size-4" />
                </a>
              ) : (
                <span
                  className="shrink-0 rounded-lg bg-slate-500/5 p-2 text-slate-300 dark:text-slate-700"
                  aria-hidden="true"
                >
                  <ExternalLink className="size-4" />
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AppIcon({ icon, small = false }: { icon: string; small?: boolean }) {
  const size = small ? 'size-5' : 'size-6'
  const glyphs: Record<string, React.ReactNode> = {
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 10.4 4.3 4.3 0 0 0 7 19h10.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chef: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M7 20h10M6 16h12v4H6zM7.5 16c-2 0-3.5-1.6-3.5-3.6 0-1.6 1-2.9 2.5-3.3C6.2 7.4 7.6 5.8 9.6 5.8c1 0 1.9.3 2.6.9.7-.6 1.6-.9 2.6-.9 2 0 3.4 1.6 3.7 3.3 1.5.4 2.5 1.7 2.5 3.3 0 2-1.5 3.6-3.5 3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    note: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        <path d="M14 4v5h5M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dumbbell: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M6.5 8.5v7M3.5 10v4M17.5 8.5v7M20.5 10v4M6.5 12h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    ticket: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" strokeLinejoin="round" />
      </svg>
    ),
    wallet: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M4 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" strokeLinejoin="round" />
        <path d="M16 12h3v3h-3a1.5 1.5 0 0 1 0-3Z" strokeLinejoin="round" />
      </svg>
    ),
    flask: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M9 3h6M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    game: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M7 9h10a4 4 0 0 1 3.9 5l-.6 2.2A2.5 2.5 0 0 1 17.6 17L16 15H8l-1.6 2a2.5 2.5 0 0 1-4.7-.8l-.6-2.2A4 4 0 0 1 7 9Z" strokeLinejoin="round" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M20 12a7 7 0 0 1-7 7H8l-4 2 1-4.5A7 7 0 0 1 13 5h.5a7 7 0 0 1 6.5 7Z" strokeLinejoin="round" />
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M12 4 3 9l9 5 9-5-9-5Z" strokeLinejoin="round" />
        <path d="m3 14 9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    pdf: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={size}>
        <path d="M6 3h8l4 4v14H6V3Z" strokeLinejoin="round" />
        <path d="M14 3v4h4M9 13h6M9 17h4" strokeLinecap="round" />
      </svg>
    ),
  }
  return glyphs[icon] ?? glyphs.pdf
}
