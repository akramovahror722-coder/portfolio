import { uz } from './uz'
import { en } from './en'
import { ru } from './ru'
import type { Lang } from '../types'

export const translations = { uz, en, ru }

export type Dict = typeof uz

export const getDict = (lang: Lang): Dict => translations[lang] ?? translations.uz

export const localeTag: Record<Lang, string> = {
  uz: 'uz-UZ',
  en: 'en-US',
  ru: 'ru-RU',
}
