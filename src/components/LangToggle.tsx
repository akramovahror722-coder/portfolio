import { Languages } from 'lucide-react'
import { useLang } from '../context/LangContext'
import type { Lang } from '../types'

const options: { value: Lang; label: string }[] = [
  { value: 'uz', label: 'UZ' },
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
]

export function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white/70 p-1 dark:border-white/15 dark:bg-white/5"
      role="group"
      aria-label="Language"
    >
      <Languages className="ml-1 size-4 text-slate-400 dark:text-slate-500" />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLang(option.value)}
          aria-pressed={lang === option.value}
          className={`rounded-lg px-2 py-1 text-xs font-bold transition-colors ${
            lang === option.value
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
