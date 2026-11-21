import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ThemeToggle } from './ThemeToggle'
import { LangToggle } from './LangToggle'
import { profile } from '../data/profile'

const links = [
  { to: '/', key: 'home', end: true },
  { to: '/about', key: 'about', end: false },
  { to: '/skills', key: 'skills', end: false },
  { to: '/projects', key: 'projects', end: false },
  { to: '/contact', key: 'contact', end: false },
] as const

const moreLinks = [
  { to: '/journey', key: 'journey' },
  { to: '/blog', key: 'blog' },
  { to: '/certificates', key: 'certificates' },
  { to: '/faq', key: 'faq' },
] as const

export function Navbar() {
  const { t } = useLang()
  const progress = useScrollProgress()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!moreOpen) return
    const onClick = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  const navLabel = (key: string) => t.nav[key as keyof typeof t.nav]
  const moreActive = moreLinks.some((item) => location.pathname.startsWith(item.to))

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-slate-200/60 bg-paper/90 shadow-sm shadow-slate-900/5 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-ink/90 dark:shadow-black/20'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-[66px] items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label={profile.fullName}>
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 text-sm font-extrabold text-white shadow-md shadow-teal-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-teal-500/40">
            {profile.initials}
          </span>
          <span className="hidden max-w-44 min-w-0 text-sm leading-tight font-semibold lg:block">
            <span className="block truncate text-slate-900 dark:text-white">Akramov Axror</span>
            <span className="block truncate text-xs font-normal text-slate-500 dark:text-slate-400">
              {t.footer.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {links.map(({ to, key, end }) => (
            <NavLink
              key={key}
              to={to}
              end={end}
              onClick={() => {
                setMenuOpen(false)
                setMoreOpen(false)
              }}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                }`
              }
            >
              {navLabel(key)}
            </NavLink>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                moreActive || moreOpen
                  ? 'bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
              }`}
            >
              {t.nav.more}
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {moreOpen && (
              <div className="card-surface absolute right-0 z-50 mt-2 w-52 overflow-hidden p-1.5 shadow-xl shadow-slate-900/10 dark:shadow-black/50">
                {moreLinks.map((item) => (
                  <NavLink
                    key={item.key}
                    to={item.to}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-teal-500/10 font-semibold text-teal-600 dark:text-teal-300'
                          : 'text-slate-600 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-white/5'
                      }`
                    }
                  >
                    {navLabel(item.key)}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-600 shadow-sm transition-all hover:border-teal-400/50 hover:text-teal-600 xl:hidden dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-300 dark:hover:text-teal-300"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="h-[2px] w-full">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto bg-paper/97 px-6 py-8 backdrop-blur-2xl xl:hidden dark:bg-ink/97">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile">
            {links.map(({ to, key, end }) => (
              <NavLink
                key={key}
                to={to}
                end={end}
                onClick={() => {
                  setMenuOpen(false)
                  setMoreOpen(false)
                }}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300'
                      : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-white/5'
                  }`
                }
              >
                {navLabel(key)}
              </NavLink>
            ))}

            <div className="my-3 h-px bg-slate-200/60 dark:bg-white/[0.08]" />

            {moreLinks.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300'
                      : 'text-slate-700 hover:bg-slate-100/80 dark:text-slate-200 dark:hover:bg-white/5'
                  }`
                }
              >
                {navLabel(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 flex items-center gap-3">
            <LangToggle />
          </div>
        </div>
      )}
    </header>
  )
}
