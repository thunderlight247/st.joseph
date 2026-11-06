# St. Joseph Catholic Hospital, Nkwanta: website prototype

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build && npm start
```

- Hospital content, services, contacts and image paths: `lib/data.ts` (items marked SAMPLE / CONFIRM need hospital sign-off).
- Photos: `public/images` (already optimised, 720px wide).
- Payments: `lib/payments.ts` (prototype mode until `NEXT_PUBLIC_DONATIONS_LIVE=true` and an API route exist).
