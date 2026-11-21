import { useEffect } from 'react'
import { useLang } from '../context/LangContext'

export function usePageTitle(title: string) {
  const { lang } = useLang()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `${title} — Akramov Axror`
  }, [title, lang])
}
