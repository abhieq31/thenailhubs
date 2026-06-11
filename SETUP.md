# 🚀 Launch Guide — 15 minutes, ₹0 forever

This site is built to be created once and live forever: Next.js on
Vercel's free tier + Supabase's free tier, no servers to maintain, no
bills, no API keys required for any visible feature.

## 1. Create the database (5 min)

1. Go to [supabase.com](https://supabase.com) → **New project** (free tier)
2. Pick any name (e.g. `nail-hubs`), set a database password, choose the
   **Mumbai** region (closest to Ankleshwar)
3. Open **SQL Editor** → **New query**, paste the whole contents of
   [`supabase/schema.sql`](supabase/schema.sql), press **Run**
4. Go to **Project Settings → API** and copy two values:
   - `Project URL`
   - `service_role` secret key (under "Project API keys")

## 2. Deploy the site (5 min)

1. Go to [vercel.com](https://vercel.com) → **Add New → Project** →
   import this GitHub repository (zero config — Vercel detects Next.js)
2. Before clicking Deploy, expand **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → the Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` → the service_role key
3. Click **Deploy**. Done — the booking receptionist is live.

## 3. Test it (2 min)

- Open the site → tap **Book Instantly — 24/7** → book a test appointment
- In Supabase → **Table Editor → appointments**, the booking appears
- Use the chat's **Manage My Booking** with the confirmation ID to
  reschedule and cancel it

## 4. Optional extras (any time later)

- **Custom domain**: Vercel → Project → Settings → Domains
  (e.g. `thenailhubs.in`)
- **Live Instagram posts instead of the embed**: add
  `INSTAGRAM_ACCESS_TOKEN` (see `.env.example`)
- **Live Google reviews instead of curated ones**: add
  `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (see `.env.example`)

## What needs no setup at all

- ✨ **AI Virtual Try-On Studio** (`/try-on`) — hand-tracking AI runs in the
  visitor's browser; free at any scale, fully private
- 💬 **24/7 receptionist chat** — even with no database configured it
  gracefully hands bookings to WhatsApp
- 📸 Instagram gallery embeds, Google Maps, reviews, WhatsApp booking links

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Supabase values (optional)
npm run dev                  # http://localhost:3000
```
