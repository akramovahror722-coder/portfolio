import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { useTypewriter } from '../hooks/useTypewriter'
import { useCountUp } from '../hooks/useCountUp'
import { profile } from '../data/profile'
import { stats } from '../data/projects'
import type { Stat } from '../types'
import { GithubIcon, TelegramIcon } from '../components/icons'
import { localize } from '../lib/locale'

function StatItem({ stat }: { stat: Stat }) {
  const { lang } = useLang()
  const [value, ref] = useCountUp(stat.value)

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl dark:text-white">
        {value}
        <span className="text-teal-500">{stat.suffix}</span>
      </p>
      <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">
        {localize(stat.label, lang)}
      </p>
    </div>
  )
}

export function Hero() {
  const { t, lang } = useLang()
  const typed = useTypewriter(t.hero.roles)

  const socials: { href: string; icon: ComponentType<{ className?: string }>; label: string }[] = [
    { href: profile.github, icon: GithubIcon, label: 'GitHub' },
    { href: profile.telegram, icon: TelegramIcon, label: 'Telegram' },
    { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
    { href: `tel:${profile.phone}`, icon: Phone, label: 'Phone' },
  ]

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 noise-bg" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div className="pointer-events-none absolute -top-40 -left-40 size-[500px] animate-float rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/8" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 size-[480px] animate-float-slow rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/8" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 size-96 -translate-x-1/2 rounded-full bg-violet-400/6 blur-3xl" aria-hidden="true" />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">

          {/* ── Left Column ── */}
          <div className="text-center lg:text-left">

            {/* Available badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 px-4 py-1.5 text-xs font-semibold text-emerald-600 shadow-sm shadow-emerald-500/10 dark:border-emerald-400/20 dark:text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t.hero.badge}
            </div>

            {/* Greeting */}
            <p className="mt-7 text-sm font-medium tracking-widest text-slate-400 uppercase dark:text-slate-500">
              {t.hero.greeting}
            </p>

            {/* Name */}
            <h1 className="mt-3 text-5xl font-extrabold leading-tight sm:text-6xl xl:text-7xl">
              Akramov{' '}
              <span className="text-gradient">Axror</span>
              <span className="mt-1 block text-lg font-normal text-slate-400 sm:text-xl dark:text-slate-500">
                A&apos;zamovich
              </span>
            </h1>

            {/* Typewriter role */}
            <div className="mt-5 flex min-h-9 items-center justify-center gap-2 font-mono text-base font-semibold text-teal-600 sm:text-lg lg:justify-start dark:text-teal-400">
              <span className="text-slate-400">&gt;</span>
              <span>{typed}</span>
              <span className="inline-block h-5 w-0.5 animate-blink bg-teal-500 rounded-full" />
            </div>

            {/* Tagline */}
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-400">
              {t.hero.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link to="/projects" className="btn-primary w-full sm:w-auto">
                {t.hero.ctaProjects}
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/contact" className="btn-ghost w-full sm:w-auto">
                <Mail className="size-4" />
                {t.hero.ctaContact}
              </Link>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="group grid size-11 place-items-center rounded-xl border border-slate-200 bg-white/90 text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/60 hover:text-teal-600 hover:shadow-md dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-400 dark:hover:border-teal-400/50 dark:hover:text-teal-300"
                >
                  <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="relative mx-auto w-full max-w-xs">
            <div className="relative grid place-items-center py-10">
              {/* Orbital rings */}
              <div className="absolute size-64 animate-float-slow rounded-full border border-dashed border-teal-500/20 sm:size-72" />
              <div className="absolute size-52 rounded-full border border-teal-500/10 sm:size-60" />
              <div className="absolute size-72 rounded-full bg-gradient-to-br from-teal-400/8 via-cyan-400/5 to-blue-400/8 blur-2xl sm:size-80" />

              {/* Avatar */}
              <div className="relative grid size-44 place-items-center rounded-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-[3px] shadow-2xl shadow-teal-500/40 sm:size-48">
                <div className="grid size-full place-items-center rounded-full bg-paper text-6xl font-extrabold tracking-tight text-slate-900 dark:bg-ink dark:text-white">
                  AA
                </div>
              </div>

              {/* Floating tech badges */}
              <span className="absolute -top-1 right-4 chip animate-float border border-cyan-500/25 bg-white/95 text-cyan-600 shadow-md backdrop-blur-sm dark:bg-ink/90 dark:text-cyan-300">
                ⚛️ React
              </span>
              <span className="absolute bottom-8 -left-2 chip animate-float-slow border border-yellow-500/25 bg-white/95 text-yellow-700 shadow-md backdrop-blur-sm dark:bg-ink/90 dark:text-yellow-300">
                JS
              </span>
              <span className="absolute right-0 bottom-24 chip animate-float border border-blue-500/25 bg-white/95 text-blue-600 shadow-md backdrop-blur-sm dark:bg-ink/90 dark:text-blue-300">
                TS
              </span>
              <span className="absolute top-14 -left-2 chip animate-float-slow border border-emerald-500/25 bg-white/95 text-emerald-600 shadow-md backdrop-blur-sm dark:bg-ink/90 dark:text-emerald-300">
                🐍 Py
              </span>
            </div>

            {/* Code snippet card */}
            <div className="card-surface relative overflow-hidden p-5 font-mono text-[13px] leading-7">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-rose-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] text-slate-400">profile.ts</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                <span className="text-violet-500 dark:text-violet-400">const</span>{' '}
                <span className="text-blue-600 dark:text-blue-300">axror</span>
                <span className="text-slate-400"> = {'{'}</span>
              </p>
              <p className="pl-4 text-slate-500 dark:text-slate-400">
                <span className="text-slate-400">role:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400">&apos;Frontend&apos;</span>
                <span className="text-slate-400">,</span>
              </p>
              <p className="pl-4 text-slate-500 dark:text-slate-400">
                <span className="text-slate-400">goal:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400">&apos;Fullstack&apos;</span>
                <span className="text-slate-400">,</span>
              </p>
              <p className="pl-4 text-slate-500 dark:text-slate-400">
                <span className="text-slate-400">country:</span>{' '}
                <span className="text-emerald-600 dark:text-emerald-400">&apos;UZ&apos;</span>
                <span className="text-slate-400">,</span>
              </p>
              <p className="text-slate-400">{'}'}</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.04]">
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-200/60 sm:grid-cols-4 sm:divide-y-0 dark:divide-white/[0.06]">
            {stats.map((stat) => (
              <div key={localize(stat.label, lang)} className="px-6 py-6">
                <StatItem stat={stat} />
              </div>
            ))}
          </div>
        </div>

        {/* Location + scroll hint */}
        <div className="mt-10 flex flex-col items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-teal-500" />
            {localize(profile.shortAddressLocalized, lang)}
          </span>
          <span className="inline-flex items-center gap-1.5 opacity-60">
            <ChevronDown className="size-3.5 animate-bounce" />
            {t.hero.scroll}
          </span>
        </div>
      </div>
    </section>
  )
}
