import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { blogPosts } from '../data/blog'
import { formatLocalDate, localize } from '../lib/locale'

export function BlogPostPage() {
  const { t, lang } = useLang()
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  usePageTitle(post ? localize(post.title, lang) : t.blog.notFound)

  if (!post) {
    return (
      <section className="container-page grid min-h-[70vh] place-items-center py-24 text-center">
        <div>
          <h1 className="text-2xl font-extrabold">{t.blog.notFound}</h1>
          <Link to="/blog" className="btn-primary mt-6 w-fit">
            <ArrowLeft className="size-4" />
            {t.blog.back}
          </Link>
        </div>
      </section>
    )
  }

  const index = blogPosts.indexOf(post)
  const next = blogPosts[(index + 1) % blogPosts.length]

  return (
    <article className="pb-28">
      <header className="relative overflow-hidden border-b border-slate-200/70 pt-28 pb-14 sm:pt-36 sm:pb-16 dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-20 left-1/3 size-80 rounded-full bg-teal-400/15 blur-3xl dark:bg-teal-500/10"
          aria-hidden="true"
        />

        <div className="container-page relative max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-300"
          >
            <ArrowLeft className="size-4" />
            {t.blog.back}
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {localize(post.title, lang)}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-teal-500" />
              {formatLocalDate(post.date, lang)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-teal-500" />
              {post.readMinutes} {t.blog.minutes}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="chip bg-teal-500/10 text-teal-600 ring-teal-500/20 dark:text-teal-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="container-page mt-12 max-w-4xl">
        <div className="card-surface p-7 sm:p-12">
          <p className="border-l-4 border-teal-500 pl-5 text-base font-medium text-slate-800 sm:text-lg dark:text-slate-200">
            {localize(post.excerpt, lang)}
          </p>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {post.content.map((paragraph) => (
              <p key={paragraph.en.slice(0, 24)}>{localize(paragraph, lang)}</p>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link to={`/blog/${next.slug}`} className="card-surface card-hover group flex items-center justify-between gap-4 p-6">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-400">{t.blog.nextPost}</p>
              <p className="mt-1 truncate text-base font-bold transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-300">
                {localize(next.title, lang)}
              </p>
            </div>
            <ArrowLeft className="size-5 shrink-0 rotate-180 text-teal-500 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}
