import type { Localized } from '../types'

export interface Certificate {
  id: string
  title: Localized
  provider: Localized
  year: string
  hours: number
  level: Localized
  skills: string[]
  color: string
}

export const certificates: Certificate[] = [
  {
    id: 'html-css',
    title: { uz: 'HTML va CSS asoslari', en: 'HTML & CSS fundamentals', ru: 'Основы HTML и CSS' },
    provider: { uz: 'Mustaqil o‘rganish', en: 'Self-study', ru: 'Самообучение' },
    year: '2023',
    hours: 60,
    level: { uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
    skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive'],
    color: 'from-orange-500 to-amber-400',
  },
  {
    id: 'javascript',
    title: { uz: 'JavaScript dasturlash', en: 'JavaScript programming', ru: 'Программирование на JavaScript' },
    provider: { uz: 'Mustaqil o‘rganish', en: 'Self-study', ru: 'Самообучение' },
    year: '2024',
    hours: 120,
    level: { uz: 'O‘rta', en: 'Intermediate', ru: 'Средний' },
    skills: ['ES6+', 'DOM', 'Async/Await', 'Fetch', 'LocalStorage'],
    color: 'from-yellow-500 to-amber-400',
  },
  {
    id: 'react',
    title: { uz: 'React va zamonaviy frontend', en: 'React and modern frontend', ru: 'React и современный frontend' },
    provider: { uz: 'Mustaqil o‘rganish', en: 'Self-study', ru: 'Самообучение' },
    year: '2025',
    hours: 140,
    level: { uz: 'O‘rta', en: 'Intermediate', ru: 'Средний' },
    skills: ['React', 'Hooks', 'React Router', 'Vite', 'Tailwind CSS'],
    color: 'from-cyan-500 to-blue-400',
  },
  {
    id: 'typescript',
    title: { uz: 'TypeScript asoslari', en: 'TypeScript basics', ru: 'Основы TypeScript' },
    provider: { uz: 'Mustaqil o‘rganish', en: 'Self-study', ru: 'Самообучение' },
    year: '2026',
    hours: 70,
    level: { uz: 'O‘rganish jarayonida', en: 'In progress', ru: 'В процессе' },
    skills: ['Types', 'Interfaces', 'Generics', 'Utility types'],
    color: 'from-blue-500 to-indigo-400',
  },
  {
    id: 'cpp',
    title: { uz: 'C++ algoritmlari', en: 'C++ algorithms', ru: 'Алгоритмы на C++' },
    provider: { uz: 'Maktab dasturi + mustaqil', en: 'School course + self-study', ru: 'Школьный курс + самообучение' },
    year: '2025',
    hours: 90,
    level: { uz: 'O‘rta', en: 'Intermediate', ru: 'Средний' },
    skills: ['STL', 'Sort/search', 'Recursion', 'Dynamic programming'],
    color: 'from-violet-500 to-purple-400',
  },
  {
    id: 'python',
    title: { uz: 'Python asoslari', en: 'Python basics', ru: 'Основы Python' },
    provider: { uz: 'Mustaqil o‘rganish', en: 'Self-study', ru: 'Самообучение' },
    year: '2025',
    hours: 50,
    level: { uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
    skills: ['Syntax', 'OOP', 'Files', 'Modules'],
    color: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'design',
    title: { uz: 'UI/UX va dizayn asoslari', en: 'UI/UX and design basics', ru: 'Основы UI/UX и дизайна' },
    provider: { uz: 'YouTube darsliklari', en: 'YouTube lessons', ru: 'Уроки на YouTube' },
    year: '2026',
    hours: 45,
    level: { uz: 'O‘rta', en: 'Intermediate', ru: 'Средний' },
    skills: ['Figma', 'Color system', 'Typography', 'Spacing'],
    color: 'from-rose-500 to-pink-400',
  },
  {
    id: 'git',
    title: { uz: 'Git va GitHub', en: 'Git and GitHub', ru: 'Git и GitHub' },
    provider: { uz: 'Mustaqil o‘rganish', en: 'Self-study', ru: 'Самообучение' },
    year: '2024',
    hours: 30,
    level: { uz: 'Boshlang‘ich', en: 'Beginner', ru: 'Начальный' },
    skills: ['Branches', 'Merge', 'Pull requests', '.gitignore'],
    color: 'from-slate-500 to-zinc-400',
  },
]

export const faqItems: { question: Localized; answer: Localized }[] = [
  {
    question: {
      uz: 'Qaysi texnologiyalarni bilasiz?',
      en: 'Which technologies do you know?',
      ru: 'Какие технологии вы знаете?',
    },
    answer: {
      uz: 'Frontend tomonda HTML, CSS, JavaScript, React, React Router, Tailwind CSS va Vite; TypeScript ustida ishlayman. Ma’lumotlar tomonida localStorage, REST API va Open-Meteo kabi ochiq servislarni ishlataman. Backend tomonida Node.js va Express o‘rganish jarayonida.',
      en: 'On the frontend: HTML, CSS, JavaScript, React, React Router, Tailwind CSS and Vite, with TypeScript in progress. On the data side I use localStorage, REST APIs and open services like Open-Meteo. I am currently learning Node.js and Express for the backend.',
      ru: 'Во фронтенде: HTML, CSS, JavaScript, React, React Router, Tailwind CSS и Vite, параллельно TypeScript. Со стороны данных — localStorage, REST API и открытые сервисы вроде Open-Meteo. Сейчас изучаю Node.js и Express.',
    },
  },
  {
    question: {
      uz: 'Loyihalarni qayerda ko‘rsa bo‘ladi?',
      en: 'Where can I see your projects?',
      ru: 'Где посмотреть проекты?',
    },
    answer: {
      uz: 'Ilovalar markazidagi “Barcha loyihalar” bo‘limida barcha ishlarim bir ro‘yxatda. Uning ichida sayt ichidagi mini-ilovalar va tashqi demo havolalari bor. Kodlar GitHub sahifamda.',
      en: 'In the “All projects” section of the apps hub you will find every piece of work in one list — including the in-site mini apps and external demo links. The source code lives on my GitHub.',
      ru: 'В разделе «Все проекты» центра приложений собраны все мои работы: и мини-приложения внутри сайта, и внешние демо-ссылки. Исходный код — на GitHub.',
    },
  },
  {
    question: {
      uz: 'Mini-ilovalarni qanday ishlataman?',
      en: 'How do I use the mini apps?',
      ru: 'Как пользоваться мини-приложениями?',
    },
    answer: {
      uz: 'Har bir ilova alohida manzilga ega. Masalan, ob-havo ilovasi shaharlarni qidiradi va bashoratni ko‘rsatadi, retseptlar ilovasi porsiya hisoblaydi, eslatmalar avtomatik saqlanadi, FitTrack esa taymer bilan mashqni boshqaradi. Ma’lumot brauzerda saqlanadi.',
      en: 'Each app has its own address. The weather app searches cities and shows the forecast, the recipe app recalculates servings, notes save automatically and FitTrack runs the workout with a timer. All data stays in the browser.',
      ru: 'У каждого приложения свой адрес. Приложение погоды ищет города и показывает прогноз, справочник рецептов пересчитывает порции, заметки сохраняются автоматически, а FitTrack ведёт тренировку с таймером. Данные остаются в браузере.',
    },
  },
  {
    question: {
      uz: 'Yosh yoshligiz bilan loyiha qilish qiyin emasmi?',
      en: 'Is it hard to build projects at your age?',
      ru: 'Тяжело ли делать проекты в таком возрасте?',
    },
    answer: {
      uz: 'Qiyin emas, lekin vaqtni to‘g‘ri taqsimlash kerak. Men haftada bir nechta kun dasturlashga ajrataman, har kuni kichik bo‘lsa ham bir qadam tashlayman. Maslahat — katta loyihani kichik qadamlarga bo‘lish.',
      en: 'It is not hard, but time has to be planned well. I dedicate a few days a week to programming and take one step every day, however small. My tip: split a big project into small steps.',
      ru: 'Не очень, но важно правильно распределять время. Я программирую несколько дней в неделю и делаю хотя бы маленький шаг каждый день. Совет: разбивайте большой проект на малые шаги.',
    },
  },
  {
    question: {
      uz: 'Yangi loyiha qilish uchun nima kerak?',
      en: 'What do you need to start a new project?',
      ru: 'Что нужно для нового проекта?',
    },
    answer: {
      uz: 'Qisqa tavsif, asosiy funksiyalar va kim uchun mo‘ljallangan. Keyin men o‘z vaqtimda reja tuzib, bosqichma-bosqich yozib boraman va har bosqichdan keyin sizga ko‘rsataman.',
      en: 'A short description, the core features and who it is for. Then I put together a plan, build it step by step and show you the result after every stage.',
      ru: 'Короткое описание, основные функции и для кого это. Дальше я составляю план, делаю по шагам и показываю результат после каждого этапа.',
    },
  },
  {
    question: {
      uz: 'Saytga xavfsizlik jihatidan qanday yondasiz?',
      en: 'How do you approach security?',
      ru: 'Как вы подходите к безопасности?',
    },
    answer: {
      uz: 'Maxfiy kalitlar faqat serverda yoki `.env` faylda saqlanadi, hech qachon kodga yozilmaydi. Ma’lumotlarim foydalanuvchi brauzerida qoladi — bu umumiy xavfsizlikni oshiradi.',
      en: 'Secret keys live only on the server or in an `.env` file and are never written into the code. User data stays in the browser, which improves overall safety.',
      ru: 'Секретные ключи хранятся только на сервере или в `.env` и никогда не попадают в код. Данные пользователей остаются в браузере — это повышает общую безопасность.',
    },
  },
  {
    question: {
      uz: 'Portfolio bir nechta tilda ishlaydi?',
      en: 'How many languages does the portfolio support?',
      ru: 'На скольких языках работает портфолио?',
    },
    answer: {
      uz: 'Uchta: o‘zbek, ingliz va rus. Til boshqaruvi yuqoridagi UZ/EN/RU tugmalari orqali o‘zgaradi va tanlovingiz saqlanadi.',
      en: 'Three: Uzbek, English and Russian. Use the UZ/EN/RU switcher at the top — your choice is saved for the next visit.',
      ru: 'Три: узбекский, английский и русский. Переключатель UZ/EN/RU находится вверху, и ваш выбор сохраняется.',
    },
  },
  {
    question: {
      uz: 'Bog‘lanish qanday amalga oshadi?',
      en: 'How can we get in touch?',
      ru: 'Как с вами связаться?',
    },
    answer: {
      uz: 'Telegram, telefon yoki email orqali. Aloqa sahifasidagi forma pochta dasturingizni ochadi va xabar tayyor holda yozilgan bo‘ladi.',
      en: 'Through Telegram, phone or email. The form on the contact page opens your mail app with the message already written.',
      ru: 'Через Telegram, телефон или email. Форма на странице контактов открывает почтовую программу с уже готовым текстом письма.',
    },
  },
]
