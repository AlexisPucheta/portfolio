import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

const getInitialTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Follow OS changes until the user picks a theme explicitly.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) setTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
