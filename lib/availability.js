// Deterministic availability engine — no double bookings, no hallucinations.
// Mirrors the database exclusion constraint (supabase/schema.sql), which is
// the final guarantee even under concurrent requests.

import { HOURS, SERVICES } from './businessRules';
import {
  nowInSalonTime,
  timeToMinutes,
  minutesToTime,
  formatTime12h,
  formatDateLong,
  dayName,
  addDays,
  weekday,
} from './time';

export function isWorkingDay(isoDate) {
  return HOURS.workingDays.includes(weekday(isoDate));
}

export function getNextAvailableDates(daysCount = 7) {
  const dates = [];
  let current = nowInSalonTime().date;
  for (let i = 0; i < HOURS.advanceBookingDays && dates.length < daysCount; i++) {
    if (isWorkingDay(current)) {
      dates.push({
        date: current,
        formatted: formatDateLong(current),
        day_name: dayName(current),
      });
    }
    current = addDays(current, 1);
  }
  return dates;
}

function overlaps(start1, end1, start2, end2) {
  return start1 < end2 && end1 > start2;
}

// existingAppointments: rows with appointment_time / end_time ('HH:MM:SS')
export function computeSlots(service, isoDate, existingAppointments, count = 6) {
  const svc = SERVICES[service];
  if (!svc || !isWorkingDay(isoDate)) return [];

  const now = nowInSalonTime();
  if (isoDate < now.date || isoDate > addDays(now.date, HOURS.advanceBookingDays)) return [];

  const booked = existingAppointments.map((a) => [
    timeToMinutes(a.appointment_time),
    timeToMinutes(a.end_time),
  ]);

  const opening = timeToMinutes(HOURS.openingTime);
  const closing = timeToMinutes(HOURS.closingTime);
  // Same-day bookings need a little lead time
  const earliest = isoDate === now.date ? Math.max(opening, now.minutes + HOURS.minLeadMinutes) : opening;

  const slots = [];
  for (
    let start = opening;
    start + svc.duration <= closing && slots.length < count;
    start += svc.duration + HOURS.bufferMinutes
  ) {
    if (start < earliest) continue;
    const end = start + svc.duration;
    const clash = booked.some(([bs, be]) => overlaps(start, end, bs, be));
    if (!clash) {
      slots.push({
        time: minutesToTime(start),
        formatted_time: formatTime12h(start),
        end_time: minutesToTime(end),
      });
    }
  }
  return slots;
}

// Returns { ok, endTime?, error? } for a specific requested slot
export function validateSlot(service, isoDate, timeStr, existingAppointments) {
  const svc = SERVICES[service];
  if (!svc) return { ok: false, error: 'Invalid service' };
  if (!isWorkingDay(isoDate)) return { ok: false, error: 'Salon is closed on this day' };

  const now = nowInSalonTime();
  if (isoDate < now.date) return { ok: false, error: 'That date has already passed' };
  if (isoDate > addDays(now.date, HOURS.advanceBookingDays)) {
    return { ok: false, error: `We only take bookings up to ${HOURS.advanceBookingDays} days ahead` };
  }

  let start;
  try {
    start = timeToMinutes(timeStr);
    if (Number.isNaN(start)) throw new Error();
  } catch {
    return { ok: false, error: 'Invalid time format' };
  }

  const end = start + svc.duration;
  if (start < timeToMinutes(HOURS.openingTime) || end > timeToMinutes(HOURS.closingTime)) {
    return { ok: false, error: 'Time outside business hours' };
  }
  if (isoDate === now.date && start < now.minutes + HOURS.minLeadMinutes) {
    return { ok: false, error: 'That time is too soon — please pick a later slot' };
  }

  for (const a of existingAppointments) {
    if (overlaps(start, end, timeToMinutes(a.appointment_time), timeToMinutes(a.end_time))) {
      return { ok: false, error: 'This time slot is no longer available' };
    }
  }

  return { ok: true, endTime: minutesToTime(end) };
}

// Confirmed appointments for a date; optionally exclude one confirmation id
// (so rescheduling within your own slot's window works).
export async function fetchAppointmentsForDate(supabase, isoDate, excludeConfirmationId = null) {
  let query = supabase
    .from('appointments')
    .select('appointment_time, end_time, confirmation_id')
    .eq('appointment_date', isoDate)
    .eq('status', 'confirmed');
  if (excludeConfirmationId) query = query.neq('confirmation_id', excludeConfirmationId);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data || [];
}

export function generateConfirmationId() {
  const hex = '0123456789ABCDEF';
  let id = 'NH';
  for (let i = 0; i < 6; i++) id += hex[Math.floor(Math.random() * 16)];
  return id;
}
