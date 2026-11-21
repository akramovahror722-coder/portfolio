import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { lang } = useLang()
  const labels: Record<string, { light: string; dark: string }> = {
    uz: { light: 'Yorug\u2018 rejim', dark: 'Tungi rejim' },
    en: { light: 'Light mode', dark: 'Dark mode' },
    ru: { light: 'Светлая тема', dark: 'Тёмная тема' },
  }
  const label = labels[lang][theme === 'dark' ? 'light' : 'dark']

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group relative inline-flex size-10 items-center justify-center rounded-xl border border-slate-300 bg-white/70 text-slate-600 transition-all hover:border-teal-400 hover:text-teal-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:border-teal-400/60 dark:hover:text-teal-300"
    >
      <Sun
        className={`absolute size-5 transition-all duration-500 ${
          theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`absolute size-5 transition-all duration-500 ${
          theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
        }`}
      />
    </button>
  )
}
