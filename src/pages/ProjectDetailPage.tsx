import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  CircleDot,
  ExternalLink,
  Tag,
  UserRound,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { ProjectIcon } from '../components/ProjectIcon'
import { GithubIcon } from '../components/icons'
import { projects } from '../data/projects'
import { localize } from '../lib/locale'

export function ProjectDetailPage() {
  const { t, lang } = useLang()
  const { id } = useParams()
  const project = projects.find((item) => item.id === id)
  const index = project ? projects.indexOf(project) : -1

  usePageTitle(project ? project.title : t.projects.detail.notFoundTitle)

  if (!project) {
    return (
      <>
        <PageHeader
          kicker={t.projects.detail.notFoundTitle}
          title={t.projects.detail.notFoundTitle}
          subtitle={t.projects.detail.notFoundText}
        >
          <Link to="/projects" className="btn-primary w-fit">
            <ArrowLeft className="size-4" />
            {t.projects.detail.notFoundButton}
          </Link>
        </PageHeader>
      </>
    )
  }

  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const category = t.projects.detail.categories[project.category]
  const status = project.status === 'done' ? t.projects.done : t.projects.wip

  const meta = [
    { icon: Calendar, label: t.projects.detail.year, value: project.year },
    { icon: UserRound, label: t.projects.detail.role, value: localize(project.role, lang) },
    { icon: CircleDot, label: t.projects.detail.status, value: status },
    { icon: Tag, label: t.projects.detail.category, value: category },
  ]

  return (
    <>
      <PageHeader
        kicker={`${project.year} \u00b7 ${category}`}
        title={project.title}
        subtitle={localize(project.subtitle, lang)}
      >
        <div className="flex flex-wrap items-center gap-3">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
              <ExternalLink className="size-4" />
              {t.projects.demo}
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <GithubIcon className="size-4" />
              {t.projects.code}
            </a>
          )}
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
          >
            <ArrowLeft className="size-4" />
            {t.projects.detail.back}
          </Link>
        </div>
      </PageHeader>

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-32">
        <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-8">
            <div className="card-surface p-7 sm:p-10">
              <div className="flex items-center gap-4">
                <span
                  className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${project.accent} text-white shadow-lg`}
                >
                  <ProjectIcon icon={project.icon} className="size-7" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold">{t.projects.detail.overview}</h2>
                  <p className="mt-1 text-sm font-medium text-teal-600 dark:text-teal-400">
                    {localize(project.subtitle, lang)}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {localize(project.longDescription, lang)}
              </p>
            </div>

            <div className="card-surface p-7 sm:p-10">
              <h2 className="text-xl font-bold">{t.projects.detail.features}</h2>
              <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature.en}
                    className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 p-4 dark:border-white/10 dark:bg-white/[0.02]"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-300">
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {localize(feature, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-7 sm:p-8">
              <h2 className="text-xl font-bold">{t.projects.detail.tech}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="chip border border-slate-200/80 bg-white/70 px-3 py-1 font-mono text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card-surface p-7">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t.projects.detail.info}
              </h2>
              <ul className="mt-5 space-y-4">
                {meta.map(({ icon: Icon, label, value }) => (
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
              </ul>
            </div>

            {(project.demo || project.github) && (
              <div className="card-surface space-y-2.5 p-5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full"
                  >
                    <ExternalLink className="size-4" />
                    {t.projects.demo}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost w-full"
                  >
                    <GithubIcon className="size-4" />
                    {t.projects.code}
                  </a>
                )}
              </div>
            )}

            {project.status === 'wip' && (
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
                <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                  {t.projects.detail.liveNote}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page grid gap-4 sm:grid-cols-2">
          <Link
            to={`/projects/${prev.id}`}
            className="card-surface card-hover group flex items-center gap-3 p-5"
          >
            <ArrowLeft className="size-5 shrink-0 text-teal-500 transition-transform group-hover:-translate-x-1" />
            <div className="min-w-0">
              <p className="text-xs text-slate-400">{t.projects.detail.prev}</p>
              <p className="truncate text-sm font-bold">{prev.title}</p>
            </div>
          </Link>
          <Link
            to={`/projects/${next.id}`}
            className="card-surface card-hover group flex items-center justify-end gap-3 p-5 text-right"
          >
            <div className="min-w-0">
              <p className="text-xs text-slate-400">{t.projects.detail.next}</p>
              <p className="truncate text-sm font-bold">{next.title}</p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-teal-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="container-page mt-8 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-500 dark:text-teal-300"
          >
            {t.projects.detail.back}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
