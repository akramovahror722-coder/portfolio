import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { blogPosts } from '../data/blog'
import { formatLocalDate, localize } from '../lib/locale'

export function BlogPage() {
  const { t, lang } = useLang()
  usePageTitle(t.blog.title)

  return (
    <>
      <PageHeader kicker={t.blog.kicker} title={t.blog.title} subtitle={t.blog.subtitle} />

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-32">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 60} className="h-full">
                <Link
                  to={`/blog/${post.slug}`}
                  className="card-surface card-hover group flex h-full flex-col p-7 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <CalendarDays className="size-3.5 text-teal-500" />
                      {formatLocalDate(post.date, lang)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock className="size-3.5 text-teal-500" />
                      {post.readMinutes} {t.blog.minutes}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-300">
                    {localize(post.title, lang)}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {localize(post.excerpt, lang)}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60 pt-5 dark:border-white/[0.07]">
                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="chip bg-teal-500/10 text-teal-600 ring-teal-500/20 dark:text-teal-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition-all group-hover:translate-x-1 dark:text-teal-300">
                      {t.blog.read}
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
