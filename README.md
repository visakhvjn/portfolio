This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contact form

Submissions from the **Contact me** modal are sent to `vjnvisakh@gmail.com` via the `/api/contact` route.

1. Copy `.env.example` to `.env.local`
2. Sign up at [Resend](https://resend.com), create an API key, and set `RESEND_API_KEY`
3. For production, add the same variable in **Vercel → Project → Settings → Environment Variables**, then redeploy

On Resend’s free tier without a verified domain, use the default sender (`onboarding@resend.dev`) and ensure your Resend account email matches the inbox you want to receive mail at. After verifying a domain, set `RESEND_FROM` to something like `Portfolio <contact@visakhvijayan.com>`.

Alternatively, set `WEB3FORMS_ACCESS_KEY` from [Web3Forms](https://web3forms.com) (register with `vjnvisakh@gmail.com`).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
