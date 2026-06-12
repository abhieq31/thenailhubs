// Minute-resolution time helpers, all anchored to the salon's timezone (IST)
// so bookings behave the same no matter where the server or visitor is.

import { BUSINESS } from './businessRules';

// Current date/time in the salon's timezone as { date: 'YYYY-MM-DD', minutes: minutes-since-midnight }
export function nowInSalonTime() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: BUSINESS.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value;
  const hour = Number(get('hour')) % 24; // Intl can emit "24" at midnight
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: hour * 60 + Number(get('minute')),
  };
}

// 'HH:MM' or 'HH:MM:SS' -> minutes since midnight
export function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// minutes since midnight -> 'HH:MM:SS'
export function minutesToTime(mins) {
  const h = String(Math.floor(mins / 60)).padStart(2, '0');
  const m = String(mins % 60).padStart(2, '0');
  return `${h}:${m}:00`;
}

// minutes since midnight -> '1:10 PM'
export function formatTime12h(mins) {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h < 12 ? 'AM' : 'PM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${period}`;
}

// 'YYYY-MM-DD' -> Date at UTC noon (safe for date-only math/formatting)
export function dateFromISO(iso) {
  return new Date(`${iso}T12:00:00Z`);
}

// 'YYYY-MM-DD' -> 'Friday, June 12'
export function formatDateLong(iso) {
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(dateFromISO(iso));
}

// 'YYYY-MM-DD' -> 'Friday'
export function dayName(iso) {
  return new Intl.DateTimeFormat('en-IN', { weekday: 'long', timeZone: 'UTC' }).format(dateFromISO(iso));
}

// 'YYYY-MM-DD' + n days -> 'YYYY-MM-DD'
export function addDays(iso, n) {
  const d = dateFromISO(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// JS weekday (0=Sunday) for a 'YYYY-MM-DD'
export function weekday(iso) {
  return dateFromISO(iso).getUTCDay();
}
