# The Nail Hubs

Production booking platform for a real nail salon in Ankleshwar, India. Not a portfolio demo — the salon's actual calendar runs on it today.

**[Live site →](https://thenailhubs.vercel.app)** · **[Try the nail try-on →](https://thenailhubs.vercel.app/try-on)**

[![CI](https://github.com/abhieq31/thenailhubs/actions/workflows/ci.yml/badge.svg)](https://github.com/abhieq31/thenailhubs/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000.svg)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## For reviewers

| | |
| --- | --- |
| **Problem** | Small business needs online booking without double-bookings or privacy leaks |
| **Approach** | Postgres exclusion constraints make overlapping slots impossible at the DB level |
| **Differentiator** | On-device nail try-on (MediaPipe hand tracking) — camera data never uploaded |
| **Resilience** | Graceful degradation when any external service fails — page never breaks |

## Three rules, from first principles

**Double-booking is impossible, not just unlikely.** Most booking systems check "is this slot free?" and then book it — but two people clicking at the same moment can both pass the check. Here, the database itself refuses to hold two overlapping appointments ([`supabase/schema.sql`](supabase/schema.sql)). The bad state can't be handled gracefully because it can't exist at all.

**The camera never phones home.** The try-on studio watches your hand through your own device's camera and paints nail colours on screen, live. No photo is ever uploaded — so it's private by construction, and serving a million visitors costs exactly what serving one does: nothing. (Customers see it branded "AI"; under the hood it's computer vision — hand tracking, not a generative model.)

**Broken never shows.** Every outside service this site leans on can fail without the visitor noticing. Database down? The chat hands you a pre-filled WhatsApp message. Instagram token missing? The official profile embed appears instead. The page degrades to something simpler; it never breaks.

## The parts

| Where | What |
| --- | --- |
| [`app/`](app/) | The pages and the booking API |
| [`components/`](components/) | The UI, the chat receptionist, the try-on studio |
| [`lib/`](lib/) | Booking rules and time math — with the 49 tests that guard them |
| [`supabase/schema.sql`](supabase/schema.sql) | The whole database, one paste |

The tests live next to the logic they protect and cover the things that would actually cost money if they broke: slot math, timezones, rate limits. Run them with `npm test`.

## Stack

Next.js 15 · React 19 · Supabase/PostgreSQL · MediaPipe Tasks Vision · Vitest · Vercel

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Works without any keys — booking simply falls back to WhatsApp. To launch a real deployment in about 15 minutes, follow [SETUP.md](SETUP.md).

## License

[MIT](LICENSE) © Abhi Patel

---

Made with 💅 in Ankleshwar · Women-owned business · [@thenailhubs](https://www.instagram.com/thenailhubs/)