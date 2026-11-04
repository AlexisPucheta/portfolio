import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'

const links = ['about', 'expertise', 'experience', 'contact'] as const

export function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nextLanguage = i18n.resolvedLanguage === 'es' ? 'en' : 'es'

  const iconButton =
    'inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-line px-3 text-sm font-semibold text-fg transition hover:border-primary hover:text-primary'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-bold text-fg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm text-on-primary">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="mr-4 hidden items-center gap-7 md:flex">
            {links.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-sm font-medium text-muted transition hover:text-primary">
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => i18n.changeLanguage(nextLanguage)}
            className={iconButton}
            aria-label={t('nav.switchLanguage')}
            title={t('nav.switchLanguage')}
          >
            {nextLanguage.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={`${iconButton} w-10 px-0`}
            aria-label={t('nav.toggleTheme')}
            title={t('nav.toggleTheme')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`${iconButton} w-10 px-0 md:hidden`}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="space-y-1 px-6 pb-4 md:hidden">
          {links.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 font-medium text-fg hover:bg-surface-2"
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
