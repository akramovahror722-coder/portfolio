import { useState, type ComponentType, type FormEvent } from 'react'
import { Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { profile } from '../data/profile'
import { GithubIcon, TelegramIcon } from '../components/icons'

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    const area = document.createElement('textarea')
    area.value = value
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }
}

export function ContactPage() {
  const { t, lang } = useLang()
  usePageTitle(t.nav.contact)

  const [copied, setCopied] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleCopy = async (key: string, value: string) => {
    await copyText(value)
    setCopied(key)
    window.setTimeout(() => setCopied(null), 1800)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subjects: Record<string, string> = {
      uz: `Portfolio xabari — ${name || 'Mehmon'}`,
      en: `Portfolio message — ${name || 'Guest'}`,
      ru: `Сообщение с портфолио — ${name || 'Гость'}`,
    }
    const subject = encodeURIComponent(subjects[lang] ?? subjects.en)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${profile.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const items: {
    key: string
    icon: ComponentType<{ className?: string }>
    label: string
    value: string
    href: string
    copy?: string
  }[] = [
    {
      key: 'email',
      icon: Mail,
      label: t.contact.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      copy: profile.email,
    },
    {
      key: 'phone',
      icon: Phone,
      label: t.contact.phone,
      value: profile.phoneLabel,
      href: `tel:${profile.phone}`,
      copy: profile.phoneLabel,
    },
    {
      key: 'telegram',
      icon: TelegramIcon,
      label: t.contact.telegram,
      value: profile.telegramLabel,
      href: profile.telegram,
    },
    {
      key: 'github',
      icon: GithubIcon,
      label: t.contact.github,
      value: profile.githubUser,
      href: profile.github,
    },
  ]

  return (
    <>
      <PageHeader kicker={t.contact.kicker} title={t.contact.title} subtitle={t.contact.subtitle}>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 shadow-sm dark:border-emerald-400/20 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {t.contact.availability}
        </span>
      </PageHeader>

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-32">
        <div className="container-page grid items-stretch gap-10 lg:grid-cols-[1fr_1.05fr]">
          {/* Left Column: Quick Contact */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-900 dark:text-white">
                {t.contact.quickTitle}
              </h2>

              <div className="mt-8 flex flex-1 flex-col justify-between gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map(({ key, icon: Icon, label, value, href, copy }) => (
                    <div key={key} className="card-surface group flex flex-col justify-between gap-4 p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="grid size-10 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300">
                          <Icon className="size-4" />
                        </span>
                        {copy && (
                          <button
                            type="button"
                            onClick={() => handleCopy(key, copy)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/70 px-2.5 py-1 text-xs font-medium text-slate-500 shadow-sm transition-colors hover:border-teal-400/40 hover:text-teal-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-teal-300"
                            aria-label={`${t.contact.copy} ${label}`}
                          >
                            {copied === key ? (
                              <Check className="size-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                            <span>{copied === key ? t.contact.copied : t.contact.copy}</span>
                          </button>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-400">{label}</p>
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noreferrer' : undefined}
                          className="mt-1 block truncate text-sm font-semibold text-slate-800 transition-colors hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-300"
                        >
                          {value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-surface mt-auto flex items-start gap-4 p-5 sm:p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-400">{t.contact.address}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {profile.shortAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Send Message Form */}
          <Reveal delay={100} className="h-full">
            <div className="flex h-full flex-col">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-slate-900 dark:text-white">
                {t.contact.formTitle}
              </h2>

              <div className="card-surface mt-8 flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {t.contact.responseNote}
                  </p>

                  <form onSubmit={handleSubmit} id="contact-form" className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-600 uppercase dark:text-slate-300">
                        {t.contact.formName}
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.contact.formNamePlaceholder}
                        className="mt-2 w-full rounded-xl border border-slate-200/90 bg-white/80 px-4 py-2.5 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-slate-600 uppercase dark:text-slate-300">
                        {t.contact.formMessage}
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t.contact.formMessagePlaceholder}
                        className="mt-2 w-full rounded-xl border border-slate-200/90 bg-white/80 px-4 py-2.5 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 focus:outline-none dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                      />
                    </div>
                  </form>
                </div>

                <div className="mt-6 pt-2">
                  <button form="contact-form" type="submit" className="btn-primary w-full sm:w-auto">
                    <Send className="size-4" />
                    {t.contact.formSend}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
