import { CodeXml, Server, Smartphone, Wrench, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { skillGroups } from '../data/profile'
import { Section } from './Section'

const groupIcons: Record<(typeof skillGroups)[number]['id'], LucideIcon> = {
  mobile: Smartphone,
  languages: CodeXml,
  backend: Server,
  devops: Wrench,
}

export function Expertise() {
  const { t } = useTranslation()
  const focus = t('expertise.focus', { returnObjects: true })

  return (
    <Section id="expertise" title={t('expertise.title')} subtitle={t('expertise.subtitle')}>
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map(({ id, skills }) => {
          const Icon = groupIcons[id]
          return (
            <article key={id} className="card p-6 transition hover:-translate-y-1 hover:border-primary/50">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </span>
                <h3 className="text-lg font-semibold text-fg">{t(`expertise.groups.${id}`)}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill} className="rounded-lg bg-surface-2 px-3 py-1 text-sm text-fg">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>

      <h3 className="mt-12 mb-4 font-semibold text-fg">{t('expertise.focusTitle')}</h3>
      <ul className="flex flex-wrap gap-2">
        {focus.map((item) => (
          <li
            key={item}
            className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            {item}
          </li>
        ))}
      </ul>
    </Section>
  )
}
