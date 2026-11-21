import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'

export function NotFoundPage() {
  const { t } = useLang()
  usePageTitle(t.notFound.title)

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 size-80 -translate-x-1/2 rounded-full bg-teal-400/15 blur-3xl dark:bg-teal-500/10"
        aria-hidden="true"
      />

      <div className="container-page relative text-center">
        <p className="font-mono text-7xl font-extrabold tracking-tighter sm:text-9xl">
          <span className="text-gradient">{t.notFound.code}</span>
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{t.notFound.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
          {t.notFound.text}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary w-full sm:w-auto">
            <ArrowLeft className="size-4" />
            {t.notFound.button}
          </Link>
          <Link to="/projects" className="btn-ghost w-full sm:w-auto">
            <Compass className="size-4" />
            {t.nav.projects}
          </Link>
        </div>
      </div>
    </section>
  )
}
