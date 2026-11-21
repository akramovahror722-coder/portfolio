import type { Localized } from '../../types'

export interface Exercise {
  name: Localized
  reps: number
  seconds: number
  rest: number
}

export interface Program {
  id: string
  title: Localized
  level: Localized
  emoji: string
  minutes: number
  color: string
  exercises: Exercise[]
}

export const programs: Program[] = [
  {
    id: 'light',
    title: { uz: 'Yengil mashq', en: 'Light workout', ru: 'Лёгкая тренировка' },
    level: { uz: 'Boshlang‘ichlar uchun', en: 'For beginners', ru: 'Для начинающих' },
    emoji: '🌱',
    minutes: 12,
    color: 'from-lime-500 to-emerald-400',
    exercises: [
      { name: { uz: 'Jumlanish', en: 'Jumping jacks', ru: 'Прыжки' }, reps: 30, seconds: 40, rest: 20 },
      { name: { uz: 'Juda sekin yurish', en: 'Brisk walking', ru: 'Быстрая ходьба' }, reps: 1, seconds: 120, rest: 30 },
      { name: { uz: 'O‘tirishdan turish', en: 'Sit to stand', ru: 'Встать со стула' }, reps: 12, seconds: 45, rest: 25 },
      { name: { uz: 'Qo‘l va yelka aylanishi', en: 'Arm circles', ru: 'Круги руками' }, reps: 30, seconds: 40, rest: 20 },
      { name: { uz: 'Chuqur nafas', en: 'Deep breathing', ru: 'Глубокое дыхание' }, reps: 10, seconds: 60, rest: 30 },
    ],
  },
  {
    id: 'balanced',
    title: { uz: 'Muvozanatli mashq', en: 'Balanced workout', ru: 'Сбалансированная тренировка' },
    level: { uz: 'O‘rtacha daraja', en: 'Medium level', ru: 'Средний уровень' },
    emoji: '⚡',
    minutes: 20,
    color: 'from-teal-500 to-cyan-400',
    exercises: [
      { name: { uz: 'Sakrash', en: 'Squats', ru: 'Приседания' }, reps: 15, seconds: 45, rest: 30 },
      { name: { uz: 'Teginish', en: 'Push-ups', ru: 'Отжимания' }, reps: 12, seconds: 40, rest: 30 },
      { name: { uz: 'Yon teginish', en: 'Side plank', ru: 'Боковая планка' }, reps: 2, seconds: 40, rest: 25 },
      { name: { uz: 'Oyoqni ko‘tarish', en: 'Leg raises', ru: 'Подъёмы ног' }, reps: 15, seconds: 40, rest: 25 },
      { name: { uz: 'Yugurish (joyda)', en: 'Jogging in place', ru: 'Бег на месте' }, reps: 1, seconds: 120, rest: 30 },
      { name: { uz: 'Cho‘zilish', en: 'Stretching', ru: 'Растяжка' }, reps: 1, seconds: 90, rest: 20 },
    ],
  },
  {
    id: 'intense',
    title: { uz: 'Intensiv mashq', en: 'Intense workout', ru: 'Интенсивная тренировка' },
    level: { uz: 'Tayyorlash uchun', en: 'For the prepared', ru: 'Для подготовленных' },
    emoji: '🔥',
    minutes: 28,
    color: 'from-rose-500 to-orange-400',
    exercises: [
      { name: { uz: 'Berpi', en: 'Burpees', ru: 'Берпи' }, reps: 10, seconds: 45, rest: 30 },
      { name: { uz: 'Kranish', en: 'Mountain climbers', ru: 'Альпинист' }, reps: 1, seconds: 45, rest: 25 },
      { name: { uz: 'Yugurish', en: 'Running', ru: 'Бег' }, reps: 1, seconds: 180, rest: 30 },
      { name: { uz: 'Teginish (turli)', en: 'Push-up variations', ru: 'Отжимания (вариации)' }, reps: 15, seconds: 45, rest: 25 },
      { name: { uz: 'Skak', en: 'Skipping', ru: 'Прыжки со скакалкой' }, reps: 1, seconds: 90, rest: 30 },
      { name: { uz: 'Plank', en: 'Plank', ru: 'Планка' }, reps: 1, seconds: 60, rest: 25 },
      { name: { uz: 'Tinchlanish', en: 'Cooldown', ru: 'Заминка' }, reps: 1, seconds: 120, rest: 0 },
    ],
  },
]

export const fitnessCopy = {
  chooseProgram: { uz: 'Dastur tanlang', en: 'Choose a program', ru: 'Выберите программу' },
  start: { uz: 'Mashqni boshlash', en: 'Start workout', ru: 'Начать тренировку' },
  pause: { uz: 'To‘xtatish', en: 'Pause', ru: 'Пауза' },
  resume: { uz: 'Davom etish', en: 'Resume', ru: 'Продолжить' },
  reset: { uz: 'Qayta boshlash', en: 'Reset', ru: 'Сбросить' },
  work: { uz: 'Ish', en: 'Work', ru: 'Работа' },
  rest: { uz: 'Dam', en: 'Rest', ru: 'Отдых' },
  next: { uz: 'Keyingi', en: 'Next', ru: 'Далее' },
  finish: { uz: 'Tayyor', en: 'Finish', ru: 'Готово' },
  exercises: { uz: 'Harakatlar', en: 'Exercises', ru: 'Упражнения' },
  repeats: { uz: 'marta', en: 'reps', ru: 'повторов' },
  log: { uz: 'Mashq jurnalı', en: 'Workout journal', ru: 'Дневник тренировок' },
  noLogs: {
    uz: 'Hali mashq qilinmagan. Birinchi mashqni boshlang!',
    en: 'No workouts yet. Start your first one!',
    ru: 'Тренировок пока нет. Начните первую!',
  },
  total: { uz: 'Jami mashq', en: 'Total workouts', ru: 'Всего тренировок' },
  minutes: { uz: 'Daqiqa', en: 'Minutes', ru: 'Минут' },
  streak: { uz: 'Ketma-ket kunlar', en: 'Day streak', ru: 'Дней подряд' },
  week: { uz: 'Haftalik natija', en: 'Weekly progress', ru: 'Прогресс за неделю' },
  today: { uz: 'Bugun', en: 'Today', ru: 'Сегодня' },
  markDone: { uz: 'Mashqni yakunladim', en: 'Mark as done', ru: 'Отметить тренировку' },
  done: { uz: 'Yakunlandi! Zo‘r ish!', en: 'Done! Great work!', ru: 'Готово! Отличная работа!' },
  backToPrograms: { uz: 'Dasturlarga qaytish', en: 'Back to programs', ru: 'Назад к программам' },
} as const
