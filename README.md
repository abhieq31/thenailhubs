# 💅 The Nail Hubs — Luxury Salon Web App

A zero-maintenance, zero-cost web app for **The Nail Hubs**, Ankleshwar's
premier luxury nail salon. Built once, lives forever: Next.js on Vercel's
free tier, Supabase Postgres free tier, and AI that runs on the visitor's
own device.

> **Launching it?** Follow [SETUP.md](SETUP.md) — 15 minutes, ₹0.

## Highlights

### ✨ AI Virtual Nail Try-On Studio (`/try-on`)
The signature feature — nowhere else in the industry's local market:
- Visitors point their **camera at their own hand** and see nail colours,
  shapes (almond / square / coffin / stiletto), finishes (glossy / matte /
  chrome / glitter / french) and lengths rendered on their real fingertips
  **live**
- Powered by MediaPipe hand-landmark tracking (21 points per hand) running
  **entirely in the browser** via WebGPU/WASM — heavy compute, zero server
  cost, works at any scale for free
- 100% private: no photo or video ever leaves the device
- One tap to **save/share the look** or **book it on WhatsApp** with the
  design details pre-filled

### 💬 24/7 AI Receptionist
- Books appointments end-to-end in chat: service → live availability →
  date & time → confirmed with an ID, straight into the database
- Customers manage their own bookings: lookup, reschedule, cancel by
  confirmation ID
- Answers services, pricing, FAQs, location, nail-care tips
- Falls back to WhatsApp booking automatically if the database isn't
  reachable — the chat never dead-ends

### 📅 Bulletproof booking engine
- Availability computed in the salon's timezone (IST) with service-specific
  durations, 10-minute buffers, same-day lead time, and a 30-day window
- **Double bookings are physically impossible**: a Postgres exclusion
  constraint rejects overlapping confirmed appointments even under
  simultaneous requests
- Row Level Security on: only the site's own API can touch the data

### 📸 Instagram-first, keyless by design
- Gallery, reels and profile embeds work with **no API keys**
- If an Instagram token is ever added, the site automatically upgrades to
  native latest posts + stories (cached, rate-limit safe)
- Same pattern for Google reviews: curated 5-star testimonials by default,
  live Google reviews if a Places key is added

### 📈 Built-in growth engine
- **Local SEO**: `NailSalon` structured data (hours, geo, services), sitemap,
  robots, canonical URLs — built to own "nail salon Ankleshwar" searches
- **Beautiful link shares**: a dynamically generated OpenGraph card, so the
  site looks premium every time it's shared on WhatsApp or Instagram
- **Live urgency, honestly**: the hero shows real open/closed status and the
  next genuinely free slot today, straight from the booking engine
- **Mobile-first conversion**: sticky Book/WhatsApp bar for Instagram traffic
- **Customers as distribution**: try-on captures carry an elegant
  @thenailhubs watermark, and every confirmed booking offers one-tap
  "Invite a Friend" WhatsApp sharing plus an add-to-calendar invite
  (fewer no-shows = more real capacity)

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | One repo, one deploy: UI + API routes together, no CORS, free on Vercel |
| UI | React 19 | — |
| Database | Supabase (Postgres) | Free tier, persistent, exclusion constraints for booking integrity |
| AI/ML | MediaPipe Tasks Vision | On-device hand tracking — free at any scale, private |
| Analytics | Vercel Analytics | Free tier |

## Project Structure

```
app/
├── page.js               # Home (hero, try-on teaser, services, gallery, reviews, about, contact)
├── try-on/page.js        # AI Virtual Try-On Studio
├── layout.js             # Root layout, metadata, global chat receptionist
└── api/                  # Booking + integrations API (Next.js route handlers)
    ├── services/  available-dates/  availability/
    ├── book/  reschedule/  cancel/  appointment/[id]/
    ├── instagram/feed/  instagram/stories/
    └── google/reviews/

components/               # Navbar, Hero, Services, Gallery, Reviews, About,
                          # Contact, Footer, ChatWidget, ChatProvider,
                          # InstagramFeed, GoogleReviews, TryOnStudio, TryOnTeaser
lib/                      # businessRules, availability engine, time (IST),
                          # supabase client, integrations, client API helpers
styles/                   # globals, chat, feeds, tryon (consistent gold/dark theme)
supabase/schema.sql       # One-paste database setup
SETUP.md                  # 15-minute launch guide
```

## API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/services` | GET | Service menu with durations |
| `/api/available-dates?days=7` | GET | Next open days (IST) |
| `/api/availability` | POST | Open slots for a service + date |
| `/api/book` | POST | Create appointment (409 on conflict) |
| `/api/appointment/{id}` | GET | Lookup by confirmation ID |
| `/api/reschedule` | POST | Move an appointment |
| `/api/cancel` | POST | Cancel an appointment |
| `/api/instagram/feed` · `/api/instagram/stories` | GET | Live IG content (optional token) |
| `/api/google/reviews` | GET | Live Google reviews (optional key) |

## Business Rules

All in [`lib/businessRules.js`](lib/businessRules.js) — change once,
applies to the website, the chat receptionist, and the booking engine:

- **Hours**: open all 7 days, 11:00 AM – 6:00 PM (Asia/Kolkata)
- **Buffer**: 10 minutes between appointments
- **Window**: bookings up to 30 days ahead; same-day needs 30 min lead
- **Services**: 7 services with realistic per-service durations

## Local Development

```bash
npm install
cp .env.example .env.local   # optional — site runs without it
npm run dev
```

Without Supabase configured, booking endpoints return 503 and the chat
offers WhatsApp booking instead; everything else works.

---

Made with 💅 in Ankleshwar · Women-owned · [@thenailhubs](https://www.instagram.com/thenailhubs/)
