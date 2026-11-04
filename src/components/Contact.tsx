import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { profile } from '../data/profile'
import { isEmailConfigured, sendContactEmail } from '../lib/emailjs'
import { LinkedinIcon } from './icons'
import { Section } from './Section'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Fields = { name: string; email: string; subject: string; message: string }
type FieldErrors = Partial<Record<keyof Fields, string>>

const emptyFields: Fields = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact() {
  const { t, i18n } = useTranslation()
  const [fields, setFields] = useState<Fields>(emptyFields)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')

  const validate = (f: Fields): FieldErrors => {
    const e: FieldErrors = {}
    if (!f.name.trim()) e.name = t('contact.form.errors.nameRequired')
    if (!EMAIL_RE.test(f.email.trim())) e.email = t('contact.form.errors.emailInvalid')
    if (f.message.trim().length < 10) e.message = t('contact.form.errors.messageRequired')
    return e
  }

  const onChange = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    try {
      await sendContactEmail({ ...fields, language: i18n.resolvedLanguage ?? 'en' })
      setStatus('success')
      setFields(emptyFields)
    } catch {
      setStatus('error')
    }
  }

  const contactInfo = [
    { icon: Mail, label: t('contact.info.email'), value: profile.email, href: `mailto:${profile.email}` },
    {
      icon: LinkedinIcon,
      label: t('contact.info.linkedin'),
      value: profile.linkedin.replace('https://www.', ''),
      href: profile.linkedin,
    },
    { icon: MapPin, label: t('contact.info.location'), value: profile.location },
  ]

  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-4">
          {contactInfo.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon width={20} height={20} />
                </span>
                <span>
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block font-medium break-all text-fg">{value}</span>
                </span>
              </>
            )
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="card flex items-center gap-4 p-4 transition hover:border-primary/50"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="card flex items-center gap-4 p-4">{content}</div>
                )}
              </li>
            )
          })}
        </ul>

        <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 md:p-8">
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={t('contact.form.name')} error={errors.name} htmlFor="name">
              <input
                id="name"
                className="input-field"
                autoComplete="name"
                placeholder={t('contact.form.namePlaceholder')}
                value={fields.name}
                onChange={(e) => onChange('name')(e.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
            </Field>
            <Field label={t('contact.form.email')} error={errors.email} htmlFor="email">
              <input
                id="email"
                type="email"
                className="input-field"
                autoComplete="email"
                placeholder={t('contact.form.emailPlaceholder')}
                value={fields.email}
                onChange={(e) => onChange('email')(e.target.value)}
                aria-invalid={Boolean(errors.email)}
              />
            </Field>
          </div>

          <Field label={t('contact.form.subject')} htmlFor="subject">
            <input
              id="subject"
              className="input-field"
              placeholder={t('contact.form.subjectPlaceholder')}
              value={fields.subject}
              onChange={(e) => onChange('subject')(e.target.value)}
            />
          </Field>

          <Field label={t('contact.form.message')} error={errors.message} htmlFor="message">
            <textarea
              id="message"
              rows={6}
              className="input-field resize-y"
              placeholder={t('contact.form.messagePlaceholder')}
              value={fields.message}
              onChange={(e) => onChange('message')(e.target.value)}
              aria-invalid={Boolean(errors.message)}
            />
          </Field>

          {!isEmailConfigured && <Alert kind="error">{t('contact.form.notConfigured')}</Alert>}
          {status === 'success' && <Alert kind="success">{t('contact.form.success')}</Alert>}
          {status === 'error' && <Alert kind="error">{t('contact.form.error')}</Alert>}

          <button
            type="submit"
            disabled={status === 'sending' || !isEmailConfigured}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-on-primary shadow-lg shadow-primary/25 transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? (
              <>
                <LoaderCircle size={18} className="animate-spin" /> {t('contact.form.sending')}
              </>
            ) : (
              <>
                <Send size={18} /> {t('contact.form.send')}
              </>
            )}
          </button>
        </form>
      </div>
    </Section>
  )
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string
  error?: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-rose-500">{error}</p>}
    </div>
  )
}

function Alert({ kind, children }: { kind: 'success' | 'error'; children: ReactNode }) {
  const styles =
    kind === 'success'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
      : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400'
  const Icon = kind === 'success' ? CircleCheck : CircleAlert
  return (
    <p role="status" className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${styles}`}>
      <Icon size={18} className="mt-0.5 shrink-0" /> {children}
    </p>
  )
}
