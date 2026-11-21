import { ArrowRight, Code2, FolderGit2, LayoutGrid, Mail, PenLine, Route, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { Reveal } from '../components/Reveal'
import { SectionTitle } from '../components/SectionTitle'
import { ProjectCard } from '../components/ProjectCard'
import { TechMarquee } from '../components/TechMarquee'
import { CTASection } from '../components/CTASection'
import { Hero } from '../sections/Hero'
import { featuredIds, projects } from '../data/projects'
import { miniApps } from '../data/apps'
import { localize } from '../lib/locale'

export function HomePage() {
  const { t, lang } = useLang()
  usePageTitle(t.meta.home)

  const featured = featuredIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project))

  const explore = [
    { to: '/about', icon: User, ...t.home.explore.about },
    { to: '/skills', icon: Code2, ...t.home.explore.skills },
    { to: '/projects', icon: FolderGit2, ...t.home.explore.projects },
    { to: '/apps', icon: LayoutGrid, ...t.home.explore.apps },
    { to: '/journey', icon: Route, ...t.home.explore.journey },
    { to: '/blog', icon: PenLine, ...t.home.explore.blog },
    { to: '/contact', icon: Mail, ...t.home.explore.contact },
  ]

  return (
    <>
      <Hero />
      <TechMarquee />

      {/* Featured Projects */}
      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <Reveal>
              <SectionTitle
                kicker={t.home.featuredKicker}
                title={t.home.featuredTitle}
                subtitle={t.home.featuredSubtitle}
                align="left"
              />
            </Reveal>
            <Reveal>
              <Link
                to="/projects"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-teal-500/25 bg-teal-500/8 px-4 py-2 text-sm font-semibold text-teal-600 transition-all hover:border-teal-500/40 hover:bg-teal-500/15 dark:border-teal-400/20 dark:text-teal-300"
              >
                {t.common.viewAll}
                <ArrowRight className="size-3.5" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.id} delay={index * 80} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Apps */}
      <section className="section-alt py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionTitle
              kicker={t.home.appsKicker}
              title={t.home.appsTitle}
              subtitle={t.home.appsSubtitle}
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {miniApps.map((app, index) => (
              <Reveal key={app.id} delay={index * 70} className="h-full">
                <Link
                  to={app.route}
                  className="card-surface card-hover group flex h-full flex-col overflow-hidden"
                >
                  {/* Accent bar */}
                  <div className={`h-[3px] w-full bg-gradient-to-r ${app.accent}`} />
                  <div className="flex flex-1 flex-col p-5">
                    <span
                      className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${app.accent} text-white shadow-md transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg`}
                    >
                      <AppGlyph icon={app.icon} />
                    </span>
                    <h3 className="mt-4 text-base font-bold">{app.title}</h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {localize(app.tagline, lang)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition-all group-hover:gap-2 dark:text-teal-300">
                      {t.apps.open}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/apps" className="btn-ghost w-fit">
              <LayoutGrid className="size-4" />
              {t.apps.allTitle}
            </Link>
          </div>
        </div>
      </section>

      {/* Explore sections */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionTitle
              kicker={t.home.exploreKicker}
              title={t.home.exploreTitle}
              subtitle={t.home.exploreSubtitle}
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {explore.map(({ to, icon: Icon, title, text }, index) => (
              <Reveal key={to} delay={index * 60} className="h-full">
                <Link to={to} className="card-surface card-hover group flex h-full flex-col p-6">
                  <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-teal-500/12 to-blue-500/12 text-teal-600 ring-1 ring-teal-500/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:from-teal-500/20 group-hover:to-blue-500/20 dark:text-teal-300 dark:ring-teal-400/15">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 dark:text-teal-300">
                    {t.common.open}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-4">
        <CTASection
          kicker={t.home.ctaKicker}
          title={t.home.ctaTitle}
          text={t.home.ctaText}
          primaryLabel={t.home.ctaButton}
          primaryTo="/contact"
          secondaryLabel={t.home.ctaSecondary}
          secondaryTo="/projects"
        />
      </div>
    </>
  )
}

function AppGlyph({ icon }: { icon: string }) {
  const glyphs: Record<string, React.ReactNode> = {
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
        <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 10.4 4.3 4.3 0 0 0 7 19h10.5Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chef: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
        <path d="M7 20h10M6 16h12v4H6zM7.5 16c-2 0-3.5-1.6-3.5-3.6 0-1.6 1-2.9 2.5-3.3C6.2 7.4 7.6 5.8 9.6 5.8c1 0 1.9.3 2.6.9.7-.6 1.6-.9 2.6-.9 2 0 3.4 1.6 3.7 3.3 1.5.4 2.5 1.7 2.5 3.3 0 2-1.5 3.6-3.5 3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    note: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
        <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        <path d="M14 4v5h5M8 13h8M8 17h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    dumbbell: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5">
        <path d="M6.5 8.5v7M3.5 10v4M17.5 8.5v7M20.5 10v4M6.5 12h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }
  return glyphs[icon] ?? glyphs.cloud
}
