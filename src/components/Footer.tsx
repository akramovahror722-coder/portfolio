import { useState } from 'react'
import { Heart, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { profile } from '../data/profile'
import { GithubIcon, TelegramIcon } from './icons'
import { localize } from '../lib/locale'

const pageLinks = [
  { to: '/about', key: 'about' },
  { to: '/skills', key: 'skills' },
  { to: '/projects', key: 'projects' },
  { to: '/journey', key: 'journey' },
  { to: '/blog', key: 'blog' },
  { to: '/certificates', key: 'certificates' },
  { to: '/faq', key: 'faq' },
  { to: '/contact', key: 'contact' },
] as const

export function Footer() {
  const { t, lang } = useLang()
  const [year] = useState(() => new Date().getFullYear())

  return (
    <footer className="no-print border-t border-slate-200/60 bg-white/60 dark:border-white/[0.07] dark:bg-white/[0.015]">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">

        {/* Brand column */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3 group">
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 text-sm font-extrabold text-white shadow-md shadow-teal-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-teal-500/35">
              {profile.initials}
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {profile.fullName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.footer.tagline}</p>
            </div>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {t.hero.tagline}
          </p>

          {/* Social links */}
          <div className="mt-6 flex items-center gap-2.5">
            {[
              { href: profile.github, icon: GithubIcon, label: 'GitHub' },
              { href: profile.telegram, icon: TelegramIcon, label: 'Telegram' },
              { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white/80 text-slate-500 shadow-sm transition-all duration-200 hover:border-teal-400/50 hover:text-teal-600 hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400 dark:hover:border-teal-400/40 dark:hover:text-teal-300"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Pages column */}
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500">
            {t.footer.pages}
          </h3>
          <ul className="mt-5 space-y-3">
            {pageLinks.map(({ to, key }) => (
              <li key={key}>
                <Link
                  to={to}
                  className="text-sm text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect column */}
        <div>
          <h3 className="text-[11px] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500">
            {t.footer.connect}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
              >
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${profile.phone}`}
                className="text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
              >
                {profile.phoneLabel}
              </a>
            </li>
            <li>
              <a
                href={profile.telegram}
                target="_blank"
                rel="noreferrer"
                className="text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
              >
                {profile.telegramLabel}
              </a>
            </li>
            <li className="text-slate-400 dark:text-slate-500">
              {localize(profile.shortAddressLocalized, lang)}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200/60 dark:border-white/[0.07]">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-400 sm:flex-row dark:text-slate-500">
          <p>
            &copy; {year} {profile.fullName}. {t.footer.rights}
          </p>
          <p className="inline-flex items-center gap-1.5">
            {t.footer.made}
            <Heart className="size-3.5 text-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
