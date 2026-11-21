import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Lang } from '../types'
import { getDict, localeTag, type Dict } from '../i18n'

interface LangContextValue {
  lang: Lang
  t: Dict
  locale: string
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)
const STORAGE_KEY = 'portfolio-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'uz'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'uz' || stored === 'en' || stored === 'ru') return stored
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('ru')) return 'ru'
  if (browserLang.startsWith('en')) return 'en'
  return 'uz'
}

const nextLang: Record<Lang, Lang> = { uz: 'en', en: 'ru', ru: 'uz' }

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      t: getDict(lang),
      locale: localeTag[lang],
      setLang,
      toggle: () => setLang((current) => nextLang[current]),
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang LangProvider ichida ishlatilishi kerak')
  return ctx
}
