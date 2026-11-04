import type en from '../i18n/locales/en.json'
import type { Language } from '../i18n'

type ExperienceId = keyof typeof en.experience.items
type SkillGroupId = keyof typeof en.expertise.groups

export const currentYear = new Date().getFullYear()

export const profile = {
  name: 'Alexis Pucheta',
  initials: 'AP',
  email: 'Alexispucheta22@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexis-pucheta',
  location: 'Rosario, Santa Fe, Argentina',
  careerStart: 2015,
  cv: {
    en: '/cv/AlexisPucheta2026en.pdf',
    es: '/cv/AlexisPucheta2026en.pdf',
  } satisfies Record<Language, string>,
  education: { start: 2010, end: 2018 },
}

export const skillGroups: { id: SkillGroupId; skills: string[] }[] = [
  { id: 'mobile', skills: ['Flutter', 'React Native', 'React', 'Vue.js (v2/v3)'] },
  { id: 'languages', skills: ['TypeScript', 'JavaScript (ES6+)', 'Dart'] },
  {
    id: 'backend',
    skills: ['Node.js', 'Express', 'Fastify', 'MongoDB', 'RESTful APIs', 'Firebase', 'Google Analytics', 'Amplitude'],
  },
  {
    id: 'devops',
    skills: ['Unleash (Feature Flags)', 'Git', 'Jenkins', 'Fastlane', 'Cursor (AI)', 'Jira', 'Storybook', 'Vitest', 'Jest'],
  },
]

/** Dates are `YYYY-MM`; `end: null` renders as "Present". */
export const experience: { id: ExperienceId; company: string; start: string; end: string | null }[] = [
  { id: 'itti', company: 'itti', start: '2024-11', end: '2026-11' },
  { id: 'goiar', company: 'Goiar', start: '2023-10', end: '2024-11' },
  { id: 'radium', company: 'Radium Rocket', start: '2018-04', end: '2023-05' },
  { id: 'tbm', company: 'TBM', start: '2015-11', end: '2018-04' },
]
