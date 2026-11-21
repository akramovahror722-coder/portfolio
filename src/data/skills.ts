import type { Localized, RoadmapStep, Skill, SkillGroup, TimelineItem } from '../types'

export const skills: Skill[] = [
  { name: 'HTML5', level: 94, group: 'frontend' },
  { name: 'CSS3 / Tailwind', level: 90, group: 'frontend' },
  { name: 'JavaScript', level: 84, group: 'frontend' },
  { name: 'React', level: 78, group: 'frontend' },
  {
    name: 'TypeScript',
    level: 55,
    group: 'frontend',
    note: { uz: "O'rganilmoqda", en: 'Learning', ru: 'Изучаю' },
  },
  {
    name: 'C++',
    level: 70,
    group: 'backend',
    note: { uz: 'Algoritmlar va mantiq', en: 'Algorithms and logic', ru: 'Алгоритмы и логика' },
  },
  {
    name: 'Python',
    level: 64,
    group: 'backend',
    note: { uz: 'Asosiy daraja', en: 'Basic level', ru: 'Базовый уровень' },
  },
  { name: 'Git / GitHub', level: 68, group: 'backend' },
  {
    name: 'Node.js / Backend',
    level: 42,
    group: 'backend',
    note: { uz: "O'rganilmoqda", en: 'Learning', ru: 'Изучаю' },
  },
  {
    name: "O'zbek tili",
    level: 100,
    group: 'language',
    note: { uz: 'Ona tilim', en: 'Native language', ru: 'Родной язык' },
  },
  { name: 'Rus tili', level: 80, group: 'language' },
  {
    name: 'Ingliz tili',
    level: 72,
    group: 'language',
    note: { uz: 'Texnik hujjatlar uchun', en: 'For technical docs', ru: 'Для техдокументации' },
  },
]

export const skillGroupNotes: Record<SkillGroup, Localized> = {
  frontend: {
    uz: "Interfeysni noldan yasash: layout, animatsiya, komponentlar va har qanday ekranga moslashadigan dizayn.",
    en: 'Building interfaces from scratch: layout, animation, components and designs that adapt to any screen.',
    ru: 'Создаю интерфейсы с нуля: вёрстка, анимация, компоненты и дизайн, адаптированный под любой экран.',
  },
  backend: {
    uz: "Mantiq va algoritmlar. C++ va Python bilan asoslarni mustahkamlab, hozir Node.js va server tomonini o'rganmoqdaman.",
    en: 'Logic and algorithms. I strengthened the basics with C++ and Python and am now learning Node.js and the server side.',
    ru: 'Логика и алгоритмы. Укрепил основы через C++ и Python, сейчас изучаю Node.js и серверную часть.',
  },
  language: {
    uz: "O'zbek tili — ona tilim. Rus va ingliz tillarida o'qiyman va muloqot qilaman, ingliz tilini texnik hujjatlarda faol ishlataman.",
    en: 'Uzbek is my native language. I read and communicate in Russian and English, and actively use English for technical documentation.',
    ru: 'Узбекский — мой родной язык. Читаю и общаюсь на русском и английском, активно использую английский в технической документации.',
  },
}

export const strengths: { title: Localized; text: Localized }[] = [
  {
    title: { uz: "Tez o'rganish", en: 'Fast learner', ru: 'Быстро учусь' },
    text: {
      uz: "Yangi texnologiyani qisqa vaqtda o'rganib, darhol amaliyotda qo'llashga harakat qilaman.",
      en: 'I pick up new technology quickly and try to apply it in practice right away.',
      ru: 'Быстро осваиваю новые технологии и сразу пробую применить их на практике.',
    },
  },
  {
    title: { uz: 'Mustaqil izlanish', en: 'Self-driven', ru: 'Самостоятельность' },
    text: {
      uz: "Muammoni avval o'zim hal qilishga urinaman: hujjatlar, tajriba va izlanish orqali javob topaman.",
      en: 'I try to solve problems myself first, finding answers through docs, experiments and research.',
      ru: 'Сначала пытаюсь решить задачу сам: через документацию, эксперименты и поиск.',
    },
  },
  {
    title: { uz: "Natijaga e'tibor", en: 'Result-oriented', ru: 'Ориентация на результат' },
    text: {
      uz: "Boshlagan ishni oxiriga yetkazishga odatlanganman — yarim yo'lda tashlab ketmayman.",
      en: 'I am used to finishing what I start instead of leaving it half-done.',
      ru: 'Привык доводить начатое до конца, а не бросать на полпути.',
    },
  },
  {
    title: { uz: 'Soddaga intilish', en: 'Love for simplicity', ru: 'Стремление к простоте' },
    text: {
      uz: "Kod ham, dizayn ham tushunarli bo'lishi kerak: ortiqcha narsadan qochaman.",
      en: 'Both code and design should be understandable: I avoid unnecessary complexity.',
      ru: 'И код, и дизайн должны быть понятными: избегаю лишней сложности.',
    },
  },
  {
    title: { uz: "Mas'uliyatlilik", en: 'Responsibility', ru: 'Ответственность' },
    text: {
      uz: "Vaqtga va kelishuvga rioya qilish men uchun muhim.",
      en: 'Respecting time and agreements matters to me.',
      ru: 'Для меня важно соблюдать сроки и договорённости.',
    },
  },
  {
    title: { uz: 'Doimiy mashq', en: 'Constant practice', ru: 'Постоянная практика' },
    text: {
      uz: "Har hafta kichik loyiha yoki mashq yozishga harakat qilaman.",
      en: 'I try to write a small project or exercise every week.',
      ru: 'Каждую неделю стараюсь написать небольшой проект или упражнение.',
    },
  },
]

export const roadmap: RoadmapStep[] = [
  {
    status: 'done',
    title: { uz: "Asoslar: HTML, CSS, JavaScript", en: 'Foundations: HTML, CSS, JavaScript', ru: 'Основы: HTML, CSS, JavaScript' },
    text: {
      uz: "Birinchi sahifalar, layout, animatsiya va DOM bilan ishlash. 2023–2024.",
      en: 'First pages, layout, animation and DOM work. 2023–2024.',
      ru: 'Первые страницы, вёрстка, анимация и работа с DOM. 2023–2024.',
    },
  },
  {
    status: 'done',
    title: { uz: 'React va zamonaviy frontend', en: 'React and modern frontend', ru: 'React и современный frontend' },
    text: {
      uz: "Komponentlar, state, hookslar, React Router va Tailwind bilan ishlash. 2024–2025.",
      en: 'Components, state, hooks, React Router and Tailwind. 2024–2025.',
      ru: 'Компоненты, состояние, хуки, React Router и Tailwind. 2024–2025.',
    },
  },
  {
    status: 'current',
    title: { uz: 'TypeScript, Next.js va sifat', en: 'TypeScript, Next.js and quality', ru: 'TypeScript, Next.js и качество' },
    text: {
      uz: "Tiplashtirilgan kod, server komponentlari, performance va accessibility. 2025–2026.",
      en: 'Typed code, server components, performance and accessibility. 2025–2026.',
      ru: 'Типизированный код, серверные компоненты, производительность и доступность. 2025–2026.',
    },
  },
  {
    status: 'next',
    title: { uz: 'Backend: Node.js va ma\'lumotlar bazasi', en: 'Backend: Node.js and databases', ru: 'Backend: Node.js и базы данных' },
    text: {
      uz: "Express, REST API, autentifikatsiya, PostgreSQL va xavfsizlik asoslari.",
      en: 'Express, REST APIs, authentication, PostgreSQL and security basics.',
      ru: 'Express, REST API, аутентификация, PostgreSQL и основы безопасности.',
    },
  },
  {
    status: 'next',
    title: { uz: 'Fullstack loyihalar va jamoa ishi', en: 'Fullstack projects and teamwork', ru: 'Fullstack-проекты и командная работа' },
    text: {
      uz: "Frontend va backendni birlashtirib, real foydalanuvchilar uchun mahsulot yaratish.",
      en: 'Combining frontend and backend to build products for real users.',
      ru: 'Соединение фронтенда и бэкенда ради продуктов для реальных пользователей.',
    },
  },
]

export const techStack = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'React Router',
  'Vite',
  'Tailwind CSS',
  'Next.js',
  'C++',
  'Python',
  'Node.js',
  'Express',
  'Git',
  'GitHub',
  'PWA',
  'REST API',
  'Open-Meteo',
]

export const timeline: TimelineItem[] = [
  {
    year: '2019',
    title: { uz: 'Maktabga birinchi qadam', en: 'First step into school', ru: 'Первый шаг в школу' },
    text: {
      uz: "39-maktabda o'qishni boshladim. Matematika va fizikaga qiziqish shu yillarda uyg'ondi.",
      en: 'I started studying at school 39. My interest in mathematics and physics woke up during these years.',
      ru: 'Начал учиться в школе №39. Именно тогда проснулся интерес к математике и физике.',
    },
  },
  {
    year: '2023',
    title: { uz: 'HTML va CSS bilan tanishuv', en: 'Meeting HTML and CSS', ru: 'Знакомство с HTML и CSS' },
    text: {
      uz: "Birinchi veb-sahifalarimni yasadim. Layout, ranglar va tipografiya asoslarini o'rgandim.",
      en: 'I built my first web pages and learned the basics of layout, colour and typography.',
      ru: 'Сделал первые веб-страницы и освоил основы вёрстки, цвета и типографики.',
    },
  },
  {
    year: '2024',
    title: { uz: 'JavaScript va birinchi loyihalar', en: 'JavaScript and first projects', ru: 'JavaScript и первые проекты' },
    text: {
      uz: "DOM, hodisalar va mantiq bilan ishlashni o'zlashtirdim. O'yinlar, test saytlari va Kanban doskasi paydo bo'ldi.",
      en: 'I mastered the DOM, events and logic. Games, quiz sites and a Kanban board came to life.',
      ru: 'Освоил DOM, события и логику. Появились игры, тестовые сайты и Kanban-доска.',
    },
  },
  {
    year: '2025',
    title: { uz: 'React, C++ va Python', en: 'React, C++ and Python', ru: 'React, C++ и Python' },
    text: {
      uz: "React bilan komponentli fikrlashni o'rgandim, C++ va Python orqali algoritmlar dunyosiga kirdim. NavbatGo, ExpensePro va FanLab tug'ildi.",
      en: 'I learned component thinking with React and entered the world of algorithms with C++ and Python. NavbatGo, ExpensePro and FanLab were born.',
      ru: 'Научился компонентному мышлению на React и вошёл в мир алгоритмов через C++ и Python. Появились NavbatGo, ExpensePro и FanLab.',
    },
  },
  {
    year: '2026',
    title: { uz: 'Fullstack sari', en: 'Towards fullstack', ru: 'В сторону fullstack' },
    text: {
      uz: "TypeScript, Next.js va backend asoslarini o'rganmoqdaman. PDF Nova, AI Chat va ilovalar markazi shu yo'ldagi qadamlar. Maqsad — professional fullstack dasturchi bo'lish.",
      en: 'I am learning TypeScript, Next.js and backend fundamentals. PDF Nova, AI Chat and the mini apps are steps on this path. The goal is to become a professional fullstack developer.',
      ru: 'Изучаю TypeScript, Next.js и основы backend. PDF Nova, AI Chat и центр мини-приложений — шаги на этом пути. Цель — стать профессиональным fullstack-разработчиком.',
    },
  },
]
