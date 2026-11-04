import { ArrowRight, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import profilePhoto from '../assets/profile.webp'
import { profile } from '../data/profile'
import type { Language } from '../i18n'

const heroStack = ['Flutter', 'React Native', 'React', 'Vue.js', 'TypeScript', 'Node.js', 'Firebase']

export function Hero() {
  const { t, i18n } = useTranslation()
  const cvHref = profile.cv[(i18n.resolvedLanguage as Language) ?? 'en']

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-32 pb-20 md:grid-cols-[1.4fr_1fr] md:pt-40 md:pb-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {t('hero.available')}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {t('hero.greeting')} {profile.name.split(' ')[0]} —
            <span className="text-primary block">{t('hero.role')}</span>
          </h1>
          <p className="mt-3 text-lg font-medium text-muted">{t('hero.specialty')}</p>
          <p className="mt-4 max-w-xl text-muted">{t('hero.tagline')}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary shadow-lg shadow-primary/25 transition hover:bg-primary-hover"
            >
              {t('hero.ctaContact')} <ArrowRight size={18} />
            </a>
            <a
              href={cvHref}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-line px-6 py-3 font-semibold text-fg transition hover:border-primary hover:text-primary"
            >
              <Download size={18} /> {t('hero.ctaCv')}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {heroStack.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-fg"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-64 sm:w-80">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-20 rounded-full bg-radial from-primary/25 via-primary/5 to-transparent to-70% dark:from-primary/35"
          />
          <div className="relative rounded-full border-4 border-primary p-2 shadow-2xl shadow-primary/30">
            <img
              src={profilePhoto}
              alt={profile.name}
              width={520}
              height={520}
              fetchPriority="high"
              className="aspect-square w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
