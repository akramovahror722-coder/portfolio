import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { GithubIcon } from '../components/icons'
import { localize } from '../lib/locale'
import type { ProjectCategory } from '../types'

type Filter = 'all' | ProjectCategory

const filters: Filter[] = ['all', 'web', 'app', 'game', 'study']

export function ProjectsPage() {
  const { t, lang } = useLang()
  usePageTitle(t.nav.projects)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Filter>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory = category === 'all' || project.category === category
      if (!matchesCategory) return false
      if (!q) return true
      return (
        project.title.toLowerCase().includes(q) ||
        project.tech.some((tech) => tech.toLowerCase().includes(q)) ||
        localize(project.subtitle, lang).toLowerCase().includes(q) ||
        localize(project.description, lang).toLowerCase().includes(q)
      )
    })
  }, [query, category, lang])

  return (
    <>
      <PageHeader kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle}>
        <div className="flex flex-col gap-5">
          <label className="relative block max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.projects.search}
              aria-label={t.projects.search}
              className="w-full rounded-xl border border-slate-200/90 bg-white/80 py-2.5 pr-4 pl-10 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2.5">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCategory(filter)}
                aria-pressed={category === filter}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold ring-1 ring-inset transition-all duration-200 ${
                  category === filter
                    ? 'bg-teal-500 text-white shadow-sm ring-teal-500'
                    : 'bg-white/80 text-slate-600 ring-slate-200 hover:border-teal-400/50 hover:text-teal-600 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10 dark:hover:text-teal-300'
                }`}
              >
                {t.projects.filters[filter]}
              </button>
            ))}
            <span className="ml-auto font-mono text-xs text-slate-400">
              {filtered.length} {t.projects.count}
            </span>
          </div>
        </div>
      </PageHeader>

      <section className="pt-6 pb-24 sm:pt-10 sm:pb-32">
        <div className="container-page">
          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, index) => (
                <Reveal key={project.id} delay={Math.min(index, 5) * 60} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="card-surface px-6 py-20 text-center">
              <p className="text-base text-slate-500 dark:text-slate-400">{t.projects.empty}</p>
            </div>
          )}

          <div className="mt-16 flex flex-col items-center gap-4 border-t border-slate-200/60 pt-12 text-center dark:border-white/[0.07]">
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.projects.hint}</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
