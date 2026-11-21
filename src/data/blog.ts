import type { Localized } from '../types'

export interface BlogPost {
  slug: string
  title: Localized
  date: string
  readMinutes: number
  tags: string[]
  excerpt: Localized
  content: Localized[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'react-component-thinking',
    title: {
      uz: 'Komponentli fikrlash: React’da kodni bo‘lish',
      en: 'Component thinking: splitting code in React',
      ru: 'Компонентное мышление: как делить код в React',
    },
    date: '2026-09-18',
    readMinutes: 6,
    tags: ['React', 'Kod sifati', 'O‘quv'],
    excerpt: {
      uz: 'Nega bir sahifa komponentlarga bo‘linadi va qanday qilib to‘g‘ri chegarani qo‘yish mumkin.',
      en: 'Why a page should be split into components and how to draw the right boundaries.',
      ru: 'Почему страницу стоит делить на компоненты и как правильно провести границы.',
    },
    content: [
      {
        uz: 'Birinchi React loyihamda butun sahifa bitta komponentga yozilgan edi. Ishladi — lekin keyin o‘zgartirish juda qiyin bo‘ldi: bitta joyni topsa bo‘lmay qoldi, chalkashlik chiqib ketdi.',
        en: 'In my first React project the whole page lived in a single component. It worked — but changing anything became painful: I could not find the right place and the file became messy.',
        ru: 'В первом React-проекте вся страница была в одном компоненте. Работало, но менять что-либо стало мучительно: нужное место не найти, файл превращался в кашу.',
      },
      {
        uz: 'Keyin oddiy qoida o‘zlashtirdim: komponent bitta javob beradi. “Bu qismi qanday ko‘rinadi?” — bitta savol, bitta komponent. Ma’lumot keladigan joy esa yuqorida qoladi.',
        en: 'Then I adopted a simple rule: one component answers one question. “How should this part look?” — one question, one component. Where the data comes from stays higher up.',
        ru: 'Потом я выработал простое правило: один компонент отвечает на один вопрос. «Как выглядит эта часть?» — один вопрос, один компонент. Данные приходят выше.',
      },
      {
        uz: 'Natija: `ProjectCard`, `SectionTitle`, `Reveal` kabi qismalar butun saytda qayta ishlatildi. Kod qisqaradi, xato topish osonlashadi va yangi sahifa qo‘shish tezlashadi.',
        en: 'The result: parts like `ProjectCard`, `SectionTitle` and `Reveal` were reused across the whole site. The code got shorter, bugs became easier to find and new pages were added faster.',
        ru: 'Итог: части вроде `ProjectCard`, `SectionTitle` и `Reveal` переиспользовались по всему сайту. Код стал короче, ошибки находить легче, а новые страницы добавляются быстрее.',
      },
    ],
  },
  {
    slug: 'localstorage-pattern',
    title: {
      uz: 'localStorage bilan ishlashning to‘g‘ri usuli',
      en: 'The right way to work with localStorage',
      ru: 'Как правильно работать с localStorage',
    },
    date: '2026-08-27',
    readMinutes: 5,
    tags: ['JavaScript', 'Ma’lumotlar', 'Patterns'],
    excerpt: {
      uz: 'Ma’lumotni saqlash, JSON xatolari va “localStorage bo‘sh” holatlarini qanday hal qilish.',
      en: 'Saving data, handling JSON errors and the “localStorage is empty” case.',
      ru: 'Сохранение данных, ошибки JSON и случай «localStorage пуст».',
    },
    content: [
      {
        uz: 'Ko‘pchilik `localStorage.getItem` natijani to‘g‘ridan-to‘g‘ri ishlatadi va keyin `JSON.parse` xatosi bilan sahifa ishlashdan to‘xtaydi. Men buni birorta `useLocalStorage` hook’iga yig‘dim.',
        en: 'Many apps call `localStorage.getItem` and parse it right away, then the page crashes with a JSON error. I moved that into a single `useLocalStorage` hook.',
        ru: 'Часто вызывают `localStorage.getItem` и сразу парсят — страница падает с ошибкой JSON. Я собрал это в один хук `useLocalStorage`.',
      },
      {
        uz: 'Hook ichida uchta qat’iyat bor: har bir qiymat JSON sifatida saqlanadi, `parse` xatosi `try/catch` bilan ushlanadi va `localStorage` ishlamasa (kvota to‘ldi yoki maxfiylik rejimi) yozish jimgina o‘tkaziladi.',
        en: 'The hook follows three rules: every value is stored as JSON, parse errors are caught, and a failed write (full quota or private mode) is silently ignored.',
        ru: 'В хуке три правила: каждое значение хранится в JSON, ошибки парсинга перехватываются, а неудачная запись (нет места или приватный режим) просто игнорируется.',
      },
      {
        uz: 'Bu usul bilan Eslatmalar, Taomlar Kitobi va FitTrack ilovalari xotiradan foydalanadi — hech qanday server yoki hisob shart emas.',
        en: 'With this approach the Notes, Recipe Book and FitTrack apps all rely on storage — no server and no account required.',
        ru: 'Так работают приложения «Заметки», «Справочник рецептов» и FitTrack — без сервера и без аккаунта.',
      },
    ],
  },
  {
    slug: 'first-design-system',
    title: {
      uz: 'Birinchi dizayn tizimimni qanday qurdim',
      en: 'How I built my first design system',
      ru: 'Как я собрал свою первую дизайн-систему',
    },
    date: '2026-07-12',
    readMinutes: 7,
    tags: ['Dizayn', 'CSS', 'Tailwind'],
    excerpt: {
      uz: 'Tokenlar, takrorlanuvchi klasslar va qorong‘i rejim uchun yagona yechim.',
      en: 'Tokens, reusable classes and one solution for dark mode.',
      ru: 'Токены, переиспользуемые классы и одно решение для тёмной темы.',
    },
    content: [
      {
        uz: 'Saytda bir xil kartochka, tugma va sarlavha o‘ndan o‘n marta takrorlanardi. Har gal yozishda klass nomi boshqacha chiqardi — natijada vizual farq paydo bo‘lardi.',
        en: 'The same card, button and heading were repeated a dozen times. Each time I wrote slightly different class names, which created visual drift.',
        ru: 'Одна и та же карточка, кнопка и заголовок повторялись десяток раз. Каждый раз имена классов отличались — появился визуальный разнобой.',
      },
      {
        uz: 'Yechim oddiy bo‘ldi: `index.css` ichida `.card-surface`, `.btn-primary`, `.btn-ghost`, `.chip` kabi klasslar yaratdim. Ular Tailwind utility’larini birlashtiradi va butun saytda bir xil ishlaydi.',
        en: 'The fix was simple: I created classes like `.card-surface`, `.btn-primary`, `.btn-ghost` and `.chip` inside `index.css`. They compose Tailwind utilities and behave the same everywhere.',
        ru: 'Решение простое: в `index.css` появились классы `.card-surface`, `.btn-primary`, `.btn-ghost`, `.chip`. Они собирают Tailwind-утилиты и работают одинаково везде.',
      },
      {
        uz: 'Qorong‘i rejim uchun `@custom-variant dark` ishlatdim — shunda `dark:` prefiksi butun saytda bir xil ishlaydi va menyu bilan ranglarini almashtirish bir qator kod bilan hal bo‘ladi.',
        en: 'For dark mode I used the `@custom-variant dark` directive, so the `dark:` prefix works across the site and switching themes needs a single line of code.',
        ru: 'Для тёмной темы я использовал директиву `@custom-variant dark`: префикс `dark:` работает везде, а переключение темы занимает одну строку кода.',
      },
    ],
  },
  {
    slug: 'reading-code',
    title: {
      uz: 'Yangi kodni o‘qish: o‘zgarishlarni izlash',
      en: 'Reading unfamiliar code: tracing changes',
      ru: 'Чтение чужого кода: как искать изменения',
    },
    date: '2026-06-05',
    readMinutes: 5,
    tags: ['O‘quv', 'Git', 'Workflow'],
    excerpt: {
      uz: 'Noshobil loyihaga qo‘shilganda qaysi faylni va qayerdan o‘zgartirish kerakligini tez topish.',
      en: 'How to quickly find which file to touch when you join an unfamiliar project.',
      ru: 'Как быстро понять, какой файл менять в незнакомом проекте.',
    },
    content: [
      {
        uz: 'Men kirganda birinchi navbatda bosh sahifani ochib, undagi komponentlarni izlaraman. “Bu qayerdan keladi?” savolini izchalasam, odatda 3–4 qadamda kerakli faylga borib o‘taman.',
        en: 'When I join a project I open the home page first and trace its components. Following the “where does this come from?” question usually gets me to the right file in three or four steps.',
        ru: 'Войдя в проект, я сначала открываю главную страницу и иду по компонентам. Следуя за вопросом «откуда это пришло?», я обычно нахожу нужный файл за три-четыре шага.',
      },
      {
        uz: 'Keyin `Ctrl + F` orqali komponent nomini qidiraman. Topilgan joy — bu komponent ishlatilgan joy, ya’ni o‘zgartirish kerak bo‘lgan nuqta.',
        en: 'Then I search the component name with `Ctrl + F`. The hit is a usage site, which is exactly where the change belongs.',
        ru: 'Затем ищу имя компонента через `Ctrl + F`. Найденное место — это использование компонента, то есть именно там и нужны изменения.',
      },
      {
        uz: 'Bu oddiy usul men birinchi haftalarda ko‘p vaqtni tejashga yordam berdi.',
        en: 'This simple habit saved me a lot of time in my first weeks.',
        ru: 'Эта простая привычка сильно сэкономила мне время в первые недели.',
      },
    ],
  },
  {
    slug: 'mini-apps-in-portfolio',
    title: {
      uz: 'Portfolio ichida mini-ilovalar: qanday qildim',
      en: 'Mini apps inside a portfolio: how I did it',
      ru: 'Мини-приложения внутри портфолио: как я это сделал',
    },
    date: '2026-11-02',
    readMinutes: 8,
    tags: ['React', 'Arxitektura', 'Portfolio'],
    excerpt: {
      uz: 'To‘rtta alohida saytni bitta SPA ichida qanday joylashtirdim va qanday umumiy qobiq yasadim.',
      en: 'How I placed four separate sites inside one SPA and what common shell they share.',
      ru: 'Как я разместил четыре отдельных сайта внутри одного SPA и что у них общего.',
    },
    content: [
      {
        uz: 'Har bir mini-ilova alohida loyiha bo‘lishi mumkin edi, lekin u yerda to‘rt marta deploy qilish, to‘rt marta domen boshqarish kerak bo‘lardi. Men bularni bitta React ilovasi ichida route’larga ajratdim.',
        en: 'Each mini app could have been a separate project, but that would mean four deployments and four domains. Instead I split them into routes of a single React app.',
        ru: 'Каждое мини-приложение могло быть отдельным проектом, но это означало бы четыре деплоя и четыре домена. Я разделил их на маршруты одного React-приложения.',
      },
      {
        uz: 'Barcha ilovalar `AppShell` komponentidan foydalanadi: bir xil sarlavha qatori, “orqaga” tugmasi va bir xil tokenlar. Shu bilan birga ular o‘ziga xos bo‘lib qoladi.',
        en: 'All apps share an `AppShell` component: the same header, the same back button and the same tokens. At the same time each one keeps its own personality.',
        ru: 'Все приложения используют компонент `AppShell`: одинаковая шапка, одинаковая кнопка «назад» и общие токены. При этом каждое сохраняет свой характер.',
      },
      {
        uz: 'Havo ilovasi Open-Meteo ochiq APIsi bilan ishlaydi — kalit yo‘q, backend yo‘q. Qolgan uchtasi faqat localStorage’dan foydalanadi.',
        en: 'The weather app works with the open Open-Meteo API — no key, no backend. The other three rely only on localStorage.',
        ru: 'Приложение погоды работает с открытым API Open-Meteo — без ключа и без бэкенда. Остальные три используют только localStorage.',
      },
    ],
  },
  {
    slug: 'learning-in-public',
    title: {
      uz: 'Ochiqda o‘rganish: nima uchun kod yozib qo‘yaman',
      en: 'Learning in public: why I keep my code online',
      ru: 'Учусь открыто: зачем я выкладываю свой код',
    },
    date: '2026-04-21',
    readMinutes: 4,
    tags: ['O‘quv', 'Hamkorlik'],
    excerpt: {
      uz: 'Kodingizni ochiq saqlash qanday foyda beradi va qanday xatolardan saqlanadi.',
      en: 'What keeping code in public brings you, and which mistakes to avoid.',
      ru: 'Что даёт открытый код и каких ошибок избегать.',
    },
    content: [
      {
        uz: 'Ochiq kod — bu menga ish namunasi ham, chiroyli portfolio ham. Yarim qolgan ishni har safar takomillashga majbur bo‘lganim uchun kod toza bo‘lib qoladi.',
        en: 'Open code is both a reference for me and a nice portfolio. Because I have to keep improving unfinished work, the code stays clean.',
        ru: 'Открытый код — это и шпаргалка, и красивое портфолио. Потому что незаконченную работу приходится постоянно улучшать, код остаётся чистым.',
      },
      {
        uz: 'Kalitlarni yoki shaxsiy ma’lumotlarni hech qachon repo’ga qo‘ymayman. Maxfiy kalitlar `.env` faylda va `.gitignore` da qoladi.',
        en: 'I never commit keys or personal data. Secrets live in an `.env` file and stay in `.gitignore`.',
        ru: 'Я никогда не коммичу ключи и личные данные. Секреты живут в `.env` и остаются в `.gitignore`.',
      },
      {
        uz: 'Yana bir foyda: yozgan kodimga qaytib turib, o‘z vaqtimdagi o‘zgarishlarni ko‘raman. Bu o‘sishning eng aniq ko‘rsatkichi.',
        en: 'One more benefit: I return to older code and see how much I have improved. That is the clearest measure of progress.',
        ru: 'Ещё одна польза: я возвращаюсь к старому коду и вижу, как сильно вырос. Это самый наглядный показатель прогресса.',
      },
    ],
  },
]
