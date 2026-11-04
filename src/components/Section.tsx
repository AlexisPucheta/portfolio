import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <header className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-fg md:text-4xl">{title}</h2>
        <div className="mt-3 h-1 w-14 rounded-full bg-primary" />
        {subtitle && <p className="mt-4 max-w-2xl text-muted">{subtitle}</p>}
      </header>
      {children}
    </section>
  )
}
