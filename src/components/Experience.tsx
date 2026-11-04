import { Briefcase } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { experience } from '../data/profile'
import { Section } from './Section'

export function Experience() {
  const { t, i18n } = useTranslation()

  const formatter = new Intl.DateTimeFormat(i18n.resolvedLanguage, { month: 'short', year: 'numeric' })
  const formatDate = (yyyyMm: string) => {
    const [year, month] = yyyyMm.split('-').map(Number)
    return formatter.format(new Date(year, month - 1))
  }

  return (
    <Section id="experience" title={t('experience.title')} subtitle={t('experience.subtitle')}>
      <ol className="relative space-y-10 border-l border-line pl-8">
        {experience.map(({ id, company, start, end }) => (
          <li key={id} className="relative">
            <span className="absolute top-1 -left-[2.85rem] grid h-7 w-7 place-items-center rounded-full bg-primary text-on-primary ring-4 ring-bg">
              <Briefcase size={14} />
            </span>
            <div className="card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-fg">
                  {t(`experience.items.${id}.role`)} <span className="text-primary">· {company}</span>
                </h3>
                <time className="text-sm text-muted capitalize">
                  {formatDate(start)} – {end ? formatDate(end) : t('experience.present')}
                </time>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-primary">
                {t(`experience.items.${id}.bullets`, { returnObjects: true }).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
