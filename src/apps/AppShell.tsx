import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { MiniApp } from '../data/apps'
import { useLang } from '../context/LangContext'
import { localize } from '../lib/locale'

interface AppShellProps {
  app: MiniApp
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

/**
 * Mini-ilovalar uchun umumiy qobiq: portfolio uslubidagi sarlavha qatori,
 * "orqaga" tugmasi va ilovaning o'z kontenti.
 */
export function AppShell({ app, title, subtitle, actions, children }: AppShellProps) {
  const { lang } = useLang()

  return (
    <div className="pb-20">
      <header className="relative overflow-hidden border-b border-slate-200/70 pt-24 pb-8 sm:pt-28 dark:border-white/10">
        <div
          className={`pointer-events-none absolute -top-24 left-1/4 size-72 rounded-full bg-gradient-to-br ${app.accent} opacity-20 blur-3xl`}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" aria-hidden="true" />

        <div className="container-page relative">
          <Link
            to="/apps"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
          >
            <ArrowLeft className="size-4" />
            {localize({ uz: 'Barcha ilovalar', en: 'All apps', ru: 'Все приложения' }, lang)}
          </Link>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${app.accent} text-white shadow-lg`}
                >
                  <AppGlyph icon={app.icon} />
                </span>
                <div className="min-w-0">
                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
                  {subtitle && (
                    <p className="mt-0.5 truncate text-sm font-medium text-slate-500 dark:text-slate-400">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
          </div>
        </div>
      </header>

      <div className="container-page pt-8">{children}</div>
    </div>
  )
}

function AppGlyph({ icon }: { icon: string }) {
  const glyphs: Record<string, ReactNode> = {
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
        <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 10.4 4.3 4.3 0 0 0 7 19h10.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chef: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
        <path d="M7 20h10M6 16h12v4H6zM7.5 16c-2 0-3.5-1.6-3.5-3.6 0-1.6 1-2.9 2.5-3.3C6.2 7.4 7.6 5.8 9.6 5.8c1 0 1.9.3 2.6.9.7-.6 1.6-.9 2.6-.9 2 0 3.4 1.6 3.7 3.3 1.5.4 2.5 1.7 2.5 3.3 0 2-1.5 3.6-3.5 3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    note: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
        <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        <path d="M14 4v5h5M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dumbbell: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6">
        <path d="M6.5 8.5v7M3.5 10v4M17.5 8.5v7M20.5 10v4M6.5 12h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }
  return glyphs[icon] ?? glyphs.cloud
}
