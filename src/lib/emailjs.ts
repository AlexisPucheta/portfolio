import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const isEmailConfigured = Boolean(serviceId && templateId && publicKey)

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
  language: string
}

/** Keys must match the `{{variables}}` used in the EmailJS template. */
export function sendContactEmail(payload: ContactPayload) {
  return emailjs.send(
    serviceId,
    templateId,
    {
      name: payload.name,
      email: payload.email,
      title: payload.subject.trim() || `Portfolio — ${payload.name}`,
      message: payload.message,
      time: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
      language: payload.language,
    },
    { publicKey, limitRate: { id: 'contact-form', throttle: 10_000 } },
  )
}
