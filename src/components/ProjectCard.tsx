import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import type { Project } from '../types'
import { localize } from '../lib/locale'
import { GithubIcon } from './icons'
import { ProjectIcon } from './ProjectIcon'

function techStyle(tech: string): string {
  const key = tech.toLowerCase()
  if (key.includes('react')) return 'bg-cyan-500/10 text-cyan-700 ring-cyan-500/20 dark:text-cyan-300'
  if (key.includes('typescript')) return 'bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300'
  if (key.includes('javascript')) return 'bg-yellow-500/10 text-yellow-700 ring-yellow-500/20 dark:text-yellow-300'
  if (key.includes('html')) return 'bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:text-orange-300'
  if (key.includes('css')) return 'bg-sky-500/10 text-sky-700 ring-sky-500/20 dark:text-sky-300'
  if (key.includes('tailwind')) return 'bg-teal-500/10 text-teal-700 ring-teal-500/20 dark:text-teal-300'
  if (key.includes('next')) return 'bg-slate-500/10 text-slate-600 ring-slate-500/20 dark:text-slate-300'
  if (key.includes('node') || key.includes('express')) return 'bg-lime-500/10 text-lime-700 ring-lime-500/20 dark:text-lime-300'
  if (key.includes('python')) return 'bg-indigo-500/10 text-indigo-700 ring-indigo-500/20 dark:text-indigo-300'
  if (key.includes('vite')) return 'bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300'
  if (key.includes('pwa') || key.includes('service')) return 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300'
  return 'bg-slate-500/10 text-slate-600 ring-slate-500/20 dark:text-slate-300'
}

export function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLang()
  const internal = Boolean(project.route)

  return (
    <article className="group card-surface card-hover relative flex h-full flex-col overflow-hidden">
      {/* Top accent bar */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${project.accent} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${project.accent} text-white shadow-md transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg`}
          >
            <ProjectIcon icon={project.icon} className="size-6" />
          </span>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <span className="chip bg-slate-500/8 text-slate-500 ring-slate-500/15 dark:text-slate-400">
              {project.year}
            </span>
            <span
              className={`chip ${
                project.status === 'done'
                  ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300'
                  : 'bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300'
              }`}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {project.status === 'done' ? t.projects.done : t.projects.wip}
            </span>
          </div>
        </div>

        {/* Title & subtitle */}
        <h3 className="mt-5 text-lg font-bold">
          <Link
            to={`/projects/${project.id}`}
            className="transition-colors hover:text-teal-600 dark:hover:text-teal-300"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-teal-600 dark:text-teal-400">
          {localize(project.subtitle, lang)}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {localize(project.description, lang)}
        </p>

        {/* Tech chips */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className={`chip ${techStyle(tech)}`}>
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="chip bg-slate-500/8 text-slate-500 ring-slate-500/15">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200/60 pt-4 dark:border-white/[0.07]">
          {internal && project.route && (
            <Link
              to={project.route}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-1.5 text-sm font-semibold text-teal-600 transition-all hover:bg-teal-500/20 dark:text-teal-300"
            >
              <ExternalLink className="size-3.5" />
              {t.projects.openApp}
            </Link>
          )}
          {!internal && project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-1.5 text-sm font-semibold text-teal-600 transition-all hover:bg-teal-500/20 dark:text-teal-300"
            >
              <ExternalLink className="size-3.5" />
              {t.projects.demo}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
            >
              <GithubIcon className="size-4" />
              {t.projects.code}
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-slate-400 transition-colors hover:text-teal-600 dark:text-slate-500 dark:hover:text-teal-300"
          >
            {t.projects.open}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
