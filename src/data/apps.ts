import type { Localized } from '../types'

export interface MiniApp {
  id: string
  title: string
  route: string
  icon: string
  accent: string
  soft: string
  tech: string[]
  tagline: Localized
  description: Localized
  features: Localized[]
  highlights: { label: Localized; value: string }[]
}

export const miniApps: MiniApp[] = [
  {
    id: 'havo',
    title: 'Havo',
    route: '/apps/weather',
    icon: 'cloud',
    accent: 'from-sky-500 to-indigo-400',
    soft: 'bg-sky-500/10 text-sky-600 ring-sky-500/20 dark:text-sky-300',
    tech: ['React', 'TypeScript', 'Open-Meteo', 'REST API'],
    tagline: {
      uz: 'Ob-havo dashboardi',
      en: 'Weather dashboard',
      ru: 'Панель погоды',
    },
    description: {
      uz: "Shahar qidirib, joriy ob-havoni, soatlik va haftalik bashoratni ko'ring. Barcha ma'lumot Open-Meteo ochiq APIsidan olinadi.",
      en: 'Search for a city and see the current weather, hourly and weekly forecast. All data comes from the free Open-Meteo API.',
      ru: 'Найдите город и посмотрите текущую погоду, почасовой и недельный прогноз. Данные берутся из открытого API Open-Meteo.',
    },
    features: [
      { uz: 'Shahar qidiruvi', en: 'City search', ru: 'Поиск города' },
      { uz: 'Soatlik bashorat', en: 'Hourly forecast', ru: 'Почасовой прогноз' },
      { uz: '7 kunlik bashorat', en: '7-day forecast', ru: 'Прогноз на 7 дней' },
      { uz: '℃ va °F rejimi', en: '°C and °F units', ru: 'Шкалы °C и °F' },
    ],
    highlights: [
      { label: { uz: 'Ma’lumot manbai', en: 'Data source', ru: 'Источник данных' }, value: 'Open-Meteo' },
      { label: { uz: 'Kalit talab qilinadi', en: 'API key needed', ru: 'Нужен API-ключ' }, value: 'Yo‘q' },
      { label: { uz: 'Offline saqlash', en: 'Offline storage', ru: 'Офлайн хранение' }, value: 'localStorage' },
    ],
  },
  {
    id: 'taomlar',
    title: 'Taomlar Kitobi',
    route: '/apps/recipes',
    icon: 'chef',
    accent: 'from-orange-500 to-red-400',
    soft: 'bg-orange-500/10 text-orange-600 ring-orange-500/20 dark:text-orange-300',
    tech: ['React', 'TypeScript', 'LocalStorage'],
    tagline: {
      uz: 'Retseptlar qo‘llanmalari',
      en: 'Recipe handbook',
      ru: 'Справочник рецептов',
    },
    description: {
      uz: "O‘zbek va lenta taomlarining 12 ta retsepti: mahsulotlar, porsiya, qiyinchilik va bosqichma-bosqich ko‘rsatma.",
      en: '12 recipes from Uzbek and world cuisine: ingredients, servings, difficulty and step-by-step guides.',
      ru: '12 рецептов узбекской и мировой кухни: продукты, порции, сложность и пошаговые инструкции.',
    },
    features: [
      { uz: 'Kategoriya filtrlari', en: 'Category filters', ru: 'Фильтры по категориям' },
      { uz: 'Porsiya hisoblash', en: 'Serving calculator', ru: 'Расчёт порций' },
      { uz: 'Sevimlilar', en: 'Favourites', ru: 'Избранное' },
      { uz: 'Tayyorlash tarixi', en: 'Cooking history', ru: 'История готовки' },
    ],
    highlights: [
      { label: { uz: 'Retseptlar', en: 'Recipes', ru: 'Рецептов' }, value: '12' },
      { label: { uz: 'Kategoriyalar', en: 'Categories', ru: 'Категорий' }, value: '6' },
      { label: { uz: 'Tillar', en: 'Languages', ru: 'Языков' }, value: '3' },
    ],
  },
  {
    id: 'eslatmalar',
    title: 'Eslatmalar',
    route: '/apps/notes',
    icon: 'note',
    accent: 'from-fuchsia-500 to-purple-400',
    soft: 'bg-fuchsia-500/10 text-fuchsia-600 ring-fuchsia-500/20 dark:text-fuchsia-300',
    tech: ['React', 'TypeScript', 'LocalStorage'],
    tagline: {
      uz: 'Shaxsiy qaydlar',
      en: 'Personal notes',
      ru: 'Личные заметки',
    },
    description: {
      uz: "Avtomatik saqlanadigan eslatmalar: teglar, qidiruv, mahsiylash va JSON eksport/import.",
      en: 'Autosaving notes with tags, search, pinning and JSON export/import.',
      ru: 'Заметки с автосохранением: теги, поиск, закрепление и экспорт/импорт JSON.',
    },
    features: [
      { uz: 'Avtomatik saqlash', en: 'Autosave', ru: 'Автосохранение' },
      { uz: 'Teglar va qidiruv', en: 'Tags and search', ru: 'Теги и поиск' },
      { uz: 'Mahsiylash', en: 'Pinning', ru: 'Закрепление' },
      { uz: 'Eksport / import', en: 'Export / import', ru: 'Экспорт / импорт' },
    ],
    highlights: [
      { label: { uz: 'Saqlash', en: 'Storage', ru: 'Хранение' }, value: 'localStorage' },
      { label: { uz: 'Format', en: 'Format', ru: 'Формат' }, value: 'JSON' },
      { label: { uz: 'Avtomatik saqlash', en: 'Autosave', ru: 'Автосохранение' }, value: '800 ms' },
    ],
  },
  {
    id: 'fittrack',
    title: 'FitTrack',
    route: '/apps/fitness',
    icon: 'dumbbell',
    accent: 'from-lime-500 to-emerald-400',
    soft: 'bg-lime-500/10 text-lime-600 ring-lime-500/20 dark:text-lime-300',
    tech: ['React', 'TypeScript', 'LocalStorage', 'SVG'],
    tagline: {
      uz: 'Mashq rejalari',
      en: 'Workout plans',
      ru: 'Планы тренировок',
    },
    description: {
      uz: "Uchta dastur, taymer, kundalik jurnal va haftalik natija grafigi — mashqni boshlash uchun ham yetarli.",
      en: 'Three programs, a timer, a daily journal and a weekly progress chart — enough to start training.',
      ru: 'Три программы, таймер, дневник и график недельного прогресса — чтобы начать тренироваться.',
    },
    features: [
      { uz: '3 ta mashq dasturi', en: '3 workout programs', ru: '3 программы тренировок' },
      { uz: 'Taymer va ovoz', en: 'Timer and sound', ru: 'Таймер и звук' },
      { uz: 'Jurnal va statistika', en: 'Journal and stats', ru: 'Дневник и статистика' },
      { uz: 'Natija grafigi', en: 'Progress chart', ru: 'График прогресса' },
    ],
    highlights: [
      { label: { uz: 'Dasturlar', en: 'Programs', ru: 'Программ' }, value: '3' },
      { label: { uz: 'Harakatlar', en: 'Exercises', ru: 'Упражнений' }, value: '30+' },
      { label: { uz: 'Taymer', en: 'Timer', ru: 'Таймер' }, value: '40–60 s' },
    ],
  },
]

export function getMiniApp(id: string): MiniApp | undefined {
  return miniApps.find((app) => app.id === id)
}
