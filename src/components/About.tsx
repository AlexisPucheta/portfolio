import { GraduationCap, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { currentYear, experience, profile } from '../data/profile'
import { Section } from './Section'

export function About() {
  const { t } = useTranslation()

  const stats = [
    { value: `${currentYear - profile.careerStart}+`, label: t('about.stats.years') },
    { value: String(experience.length), label: t('about.stats.companies') },
    { value: '4', label: t('about.stats.frameworks') },
  ]

  return (
    <Section id="about" title={t('about.title')}>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-lg leading-relaxed">{t('about.summary')}</p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card p-5 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-primary text-3xl font-extrabold">{s.value}</dd>
                <dd className="mt-1 text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-semibold text-fg">
              <GraduationCap size={20} className="text-primary" /> {t('about.education.title')}
            </h3>
            <p className="mt-3 font-medium text-fg">{t('about.education.degree')}</p>
            <p className="text-sm text-muted">
              {t('about.education.school')} · {profile.education.start} – {profile.education.end}
            </p>
          </div>
          <div className="card p-6">
            <h3 className="flex items-center gap-2 font-semibold text-fg">
              <Languages size={20} className="text-primary" /> {t('about.languages.title')}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between gap-4">
                <span className="font-medium text-fg">{t('about.languages.spanish')}</span>
                <span className="text-muted">{t('about.languages.spanishLevel')}</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="font-medium text-fg">{t('about.languages.english')}</span>
                <span className="text-right text-muted">{t('about.languages.englishLevel')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
