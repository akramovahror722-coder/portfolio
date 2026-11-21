import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useLang } from '../context/LangContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageHeader } from '../components/PageHeader'
import { Reveal } from '../components/Reveal'
import { faqItems } from '../data/certificates'
import { localize } from '../lib/locale'

export function FaqPage() {
  const { t, lang } = useLang()
  usePageTitle(t.faq.title)
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <PageHeader kicker={t.faq.kicker} title={t.faq.title} subtitle={t.faq.subtitle} />

      <section className="pt-4 pb-24 sm:pt-8 sm:pb-32">
        <div className="container-page max-w-3xl space-y-4 sm:space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = open === index
            return (
              <Reveal key={item.question.en} delay={index * 50}>
                <div
                  className={`card-surface overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-teal-400/40 shadow-lg shadow-teal-500/5 dark:border-teal-400/30' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors sm:p-7"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-300">
                        <HelpCircle className="size-4" />
                      </span>
                      <span className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {localize(item.question, lang)}
                      </span>
                    </div>
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-lg border border-slate-200/80 bg-white/60 text-slate-400 transition-all duration-300 dark:border-white/10 dark:bg-white/5 ${
                        isOpen ? 'rotate-180 border-teal-400/40 text-teal-600 dark:text-teal-300' : ''
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-200/60 px-6 pt-5 pb-6 text-sm leading-relaxed text-slate-600 sm:px-7 sm:text-base dark:border-white/[0.07] dark:text-slate-400">
                        {localize(item.answer, lang)}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
