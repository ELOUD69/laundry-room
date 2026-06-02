# KAI Abu Dhabi — Nightclub Website

Premium, mobile-first marketing site for **KAI Abu Dhabi** at Royal M Hotel by Gewan, Al Bateen.

Built with **Next.js 14 (App Router)** + **Tailwind CSS**, deployable to Vercel in one click.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint check
```

---

## Project structure

```
app/
  layout.tsx      # Root layout — metadata, Open Graph, JSON-LD schema
  page.tsx        # Single-page entry — imports all sections
  globals.css     # Tailwind base + custom utilities (glass, gradient-gold, etc.)

components/
  Navbar.tsx      # Sticky transparent → glass nav, mobile drawer
  Hero.tsx        # Full-screen hero — video placeholder, CTAs
  Events.tsx      # Upcoming events grid (reads data/events.json)
  VIPBooking.tsx  # VIP table booking form with Zod validation
  Guestlist.tsx   # Guestlist sign-up form
  Gallery.tsx     # Masonry photo grid (CSS columns)
  About.tsx       # About blurb + detail cards + Google Maps embed
  Footer.tsx      # Hours, contact, nav, copyright
  AnimatedSection.tsx  # Scroll-triggered fade/slide wrapper (Intersection Observer)

hooks/
  useScrollAnimation.ts  # Reusable scroll visibility hook

data/
  events.json     # ← EDIT THIS to update upcoming events

public/
  logo.svg                   # KAI circular emblem (swap for real brand SVG/PNG)
  hero-poster.jpg            # Still frame shown before hero video loads
  og-image.jpg               # Open Graph / social share image (1200 × 630)
  events/
    event-white-party.svg    # Flyer placeholders — swap for real artwork
    event-queens-night.svg
    event-saturday-night.svg
    event-white-party-2.svg
  gallery/
    gallery-1.svg … gallery-9.svg  # Swap for real nightclub photos
```

---

## Editing events

Open **`data/events.json`** and update or add objects:

```json
{
  "id": "5",
  "title": "New Year's Eve",
  "date": "2025-12-31",
  "day": "Wednesday",
  "artist": "DJ Name",
  "genre": "Commercial / House",
  "image": "/events/event-nye.jpg",
  "description": "The biggest night of the year at KAI.",
  "bookingUrl": "#vip"
}
```

Place the matching flyer image in `/public/events/`.

---

## Swapping placeholder images

| File | Purpose | Recommended dimensions |
|------|---------|----------------------|
| `public/logo.svg` | Brand logo mark | SVG (vector) |
| `public/hero-poster.jpg` | Hero background still | 1920 × 1080 |
| `public/og-image.jpg` | Social share preview | 1200 × 630 |
| `public/events/event-*.svg` | Event flyer cards | 600 × 800 (portrait) |
| `public/gallery/gallery-*.svg` | Gallery photos | Mix portrait + landscape |

---

## Connecting the booking forms

### VIP Table Booking (`components/VIPBooking.tsx`)

Find the `onSubmit` function. Replace the `setTimeout` simulation with your preferred service:

**Option A — Email via Resend or SendGrid**
```ts
// app/api/booking/route.ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' })
```

**Option B — WhatsApp notification via Twilio**
```ts
await fetch('https://api.twilio.com/...', { method: 'POST', body: ... })
```

**Option C — CRM webhook (HubSpot, Salesforce, Pipedrive)**
```ts
await fetch(process.env.CRM_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(data) })
```

### Guestlist Sign-up (`components/Guestlist.tsx`)

Same pattern — find the `// TODO` comment in `onSubmit` and connect:
- Mailchimp list via their API
- Klaviyo profile create
- Simple `/api/guestlist` route that emails the team

---

## SEO & schema

`app/layout.tsx` includes:
- Full `<title>` + `<meta description>`
- Open Graph + Twitter card tags
- **JSON-LD** `NightClub` + `LocalBusiness` schema with address, hours, geo-coordinates

Update the `metadataBase` URL once the domain is live:
```ts
metadataBase: new URL('https://kaiabudhabi.com'),
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Vercel auto-detects Next.js — click **Deploy**.
4. Add environment variables (API keys, etc.) in the Vercel dashboard.

---

## Brand colours

| Token | Hex | Usage |
|-------|-----|-------|
| `kai-black` | `#050508` | Page background |
| `kai-dark` | `#0d0d12` | Section alt background |
| `kai-card` | `#111118` | Card / input background |
| `kai-gold` | `#C9A84C` | Primary accent |
| `kai-gold-light` | `#E8C97A` | Hover states |
| `kai-white` | `#F5F5F0` | Primary text |

---

## Contact details (hardcoded in components)

| Field | Value |
|-------|-------|
| Phone | +971 54 308 8649 |
| Instagram | @kaiabudhabi |
| Location | Royal M Hotel by Gewan, Al Bateen, Abu Dhabi |
| Hours | Friday & Saturday, 10 PM – 3 AM |
