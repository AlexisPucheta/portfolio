import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { currentYear, profile } from '../data/profile'
import { LinkedinIcon } from './icons'

export function Footer() {
  const { t } = useTranslation()
  const socialClass =
    'grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:border-primary hover:text-primary'

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {currentYear} {profile.name}. {t('footer.rights')}
        </p>
        <div className="flex items-center gap-3">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={socialClass}>
            <LinkedinIcon width={18} height={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className={socialClass}>
            <Mail size={18} />
          </a>
        </div>
        <p>{t('footer.builtWith')}</p>
      </div>
    </footer>
  )
}
