import { ArrowRight, Code2, FolderGit2, Mail, PenLine, Route, User } from 'lucide-react'
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

export function HomePage() {
  const { t } = useLang()
  usePageTitle(t.meta.home)

  const featured = featuredIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project))

  const explore = [
    { to: '/about', icon: User, ...t.home.explore.about },
    { to: '/skills', icon: Code2, ...t.home.explore.skills },
    { to: '/projects', icon: FolderGit2, ...t.home.explore.projects },
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
