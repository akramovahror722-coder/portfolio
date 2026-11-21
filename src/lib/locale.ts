import type { Lang, Localized } from '../types'

/**
 * Berilgan tilga mos matnni qaytaradi.
 * Agar shu tilda tarjima yo'q bo'lsa, inglizcha variantga qaytadi.
 */
export function localize(value: Localized, lang: Lang): string {
  return value[lang] ?? value.en
}

const UZ_MONTHS = [
  'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
  'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr',
]

const RU_MONTHS = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
]

const EN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Sanani har bir tilda tabiiy va chiroyli formatda qaytaradi.
 * Brauzer lokalidagi '2026 M09 18' kabi g'alati formatlar chiqmaydi.
 */
export function formatLocalDate(value: string, lang: Lang): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  if (lang === 'uz') {
    return `${day}-${UZ_MONTHS[month]}, ${year}`
  }
  if (lang === 'ru') {
    return `${day} ${RU_MONTHS[month]} ${year} г.`
  }
  return `${EN_MONTHS[month]} ${day}, ${year}`
}
