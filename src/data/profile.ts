import type { Localized } from '../types'

export const profile = {
  firstName: 'Akramov',
  lastName: 'Axror',
  fullName: "Akramov Axror A'zamovich",
  initials: 'AA',
  role: 'Frontend dasturchi',
  age: 14,
  birthDate: '2012-09-04',
  birthDateLabel: '04.09.2012',
  birthplace: "Toshkent shahri",
  school: "39-maktab, 8-D sinf",
  grade: '8-D',
  address:
    "Sirdaryo viloyati, Sirdaryo tumani, Baxt shahri, Tinchlik mahallasi, Tikuvchi ko'chasi 5/2",
  shortAddress: "Sirdaryo viloyati, Baxt shahri",
  shortAddressLocalized: {
    uz: 'Sirdaryo viloyati, Baxt shahri',
    en: 'Sirdaryo region, Baxt city',
    ru: 'Сырдарьинская область, г. Бахт',
  },
  addressLocalized: {
    uz: "Sirdaryo viloyati, Sirdaryo tumani, Baxt shahri, Tinchlik mahallasi, Tikuvchi ko'chasi 5/2",
    en: 'Tikuvchi street 5/2, Tinchlik neighbourhood, Baxt city, Sirdaryo district, Sirdaryo region',
    ru: 'ул. Тикувчи 5/2, махалля Тинчлик, г. Бахт, Сырдарьинский район, Сырдарьинская область',
  },
  phone: '+998772774471',
  phoneLabel: '+998 77 277 44 71',
  email: 'Akramovahror722@gmail.com',
  github: 'https://github.com/akramovahror722-coder',
  githubUser: 'akramovahror722-coder',
  telegram: 'https://t.me/Akramov_Axror7',
  telegramLabel: '@Akramov_Axror7',
} as const

export const subjects: Localized[] = [
  { uz: 'Matematika', en: 'Mathematics', ru: 'Математика' },
  { uz: 'Fizika', en: 'Physics', ru: 'Физика' },
  { uz: 'Ingliz tili', en: 'English', ru: 'Английский язык' },
  { uz: 'Rus tili', en: 'Russian', ru: 'Русский язык' },
]

export const values: { title: Localized; text: Localized }[] = [
  {
    title: { uz: 'Halollik', en: 'Honesty', ru: 'Честность' },
    text: {
      uz: "Bilganimni yashirmayman, bilmaganimni o'rganishga tayyorman.",
      en: "I don't hide what I know, and I'm ready to learn what I don't.",
      ru: 'Я не скрываю то, что знаю, и готов учиться тому, чего не знаю.',
    },
  },
  {
    title: { uz: 'Mehnat', en: 'Hard work', ru: 'Трудолюбие' },
    text: {
      uz: "Natija o'z-o'zidan kelmaydi — har kuni kichik bo'lsa ham qadam tashlayman.",
      en: 'Results do not come by themselves — I take a step every day, however small.',
      ru: 'Результат сам не приходит — я делаю шаг каждый день, пусть и маленький.',
    },
  },
  {
    title: { uz: 'Qiziquvchanlik', en: 'Curiosity', ru: 'Любознательность' },
    text: {
      uz: "Nima uchun ishlaydi? degan savol meni doim oldinga tortadi.",
      en: "The question 'why does it work?' always pushes me forward.",
      ru: 'Вопрос «почему это работает?» всегда тянет меня вперёд.',
    },
  },
  {
    title: { uz: "Do'stona muloqot", en: 'Friendly communication', ru: 'Дружелюбное общение' },
    text: {
      uz: "Jamoada va mijoz bilan ochiq, hurmatli va tushunarli gaplashaman.",
      en: 'I communicate openly, respectfully and clearly with teams and clients.',
      ru: 'Я общаюсь с командой и клиентами открыто, вежливо и понятно.',
    },
  },
]

export const hobbies: Localized[] = [
  { uz: 'Dasturlash', en: 'Programming', ru: 'Программирование' },
  { uz: 'Matematika', en: 'Mathematics', ru: 'Математика' },
  { uz: 'Fizika', en: 'Physics', ru: 'Физика' },
  { uz: 'Yangi texnologiyalar', en: 'New technologies', ru: 'Новые технологии' },
  { uz: 'Ingliz tili', en: 'English', ru: 'Английский язык' },
  { uz: 'Rus tili', en: 'Russian', ru: 'Русский язык' },
]

export const goals: { term: Localized; title: Localized; text: Localized }[] = [
  {
    term: { uz: 'Yaqin maqsad', en: 'Short term', ru: 'Ближайшая цель' },
    title: { uz: 'TypeScript va Next.js', en: 'TypeScript and Next.js', ru: 'TypeScript и Next.js' },
    text: {
      uz: "Tiplashtirilgan React va Next.js'da ishonchli loyihalar yozishni o'zlashtirish.",
      en: 'Master writing reliable projects with typed React and Next.js.',
      ru: 'Научиться писать надёжные проекты на типизированном React и Next.js.',
    },
  },
  {
    term: { uz: "O'rta maqsad", en: 'Mid term', ru: 'Среднесрочная цель' },
    title: { uz: 'Backend va API', en: 'Backend and APIs', ru: 'Backend и API' },
    text: {
      uz: "Node.js, Express, ma'lumotlar bazasi va autentifikatsiyani chuqur o'rganish.",
      en: 'Learn Node.js, Express, databases and authentication in depth.',
      ru: 'Глубоко изучить Node.js, Express, базы данных и аутентификацию.',
    },
  },
  {
    term: { uz: 'Uzoq maqsad', en: 'Long term', ru: 'Долгосрочная цель' },
    title: { uz: 'Professional fullstack', en: 'Professional fullstack', ru: 'Профессиональный fullstack' },
    text: {
      uz: "Jamoada ishlab, real foydalanuvchilar uchun to'liq mahsulot yaratish.",
      en: 'Work in a team and build complete products for real users.',
      ru: 'Работать в команде и создавать полноценные продукты для реальных пользователей.',
    },
  },
]
