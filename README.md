# Portfolio — Alexis Pucheta

Personal portfolio built with React, TypeScript, Vite and Tailwind CSS. It supports English/Spanish (i18next), a dark/light theme toggle, and a contact form powered by EmailJS. Hosted on Firebase Hosting.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your EmailJS keys
npm run dev
```

## Editing content

- **Texts (both languages):** `src/i18n/locales/en.json` and `src/i18n/locales/es.json`. Keys are type-checked against `en.json`, so a missing key fails the build.
- **Non-translatable data** (email, LinkedIn, dates, tech names, CV path): `src/data/profile.ts`.
- **Adding a job:** add an entry to `experience` in `profile.ts` and a matching `experience.items.<id>` block in both locale files.
- **CV files:** `public/cv/` (one PDF per language, mapped in `profile.cv`).

## EmailJS setup

1. Create an account at [emailjs.com](https://www.emailjs.com/) and add an **Email Service** (e.g. Gmail).
2. Create an **Email Template** (the default "Contact Us" one works as-is) using these variables: `{{name}}`, `{{email}}`, `{{title}}`, `{{message}}`, `{{time}}`, `{{language}}`. Set "Reply To" to `{{email}}`.
3. Copy the Service ID, Template ID and Public Key (Account → General) into `.env.local`.
4. In EmailJS → Account → Security, restrict requests to your domains (`localhost`, `*.web.app`, `*.firebaseapp.com`).

## Deploy to Firebase Hosting

```bash
npx firebase-tools login
npx firebase-tools projects:create alexis-pucheta-portfolio   # once; or change the id in .firebaserc
npm run deploy
```

The site will be available at `https://<project-id>.web.app`. Env vars are inlined at build time, so `.env.local` must exist on the machine that runs the deploy.
