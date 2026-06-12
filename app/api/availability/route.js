import { NextResponse } from 'next/server';
import { SERVICES } from '@/lib/businessRules';
import { computeSlots, fetchAppointmentsForDate } from '@/lib/availability';
import { getSupabase, NOT_CONFIGURED } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { service, date, count = 6 } = await request.json();

  if (!SERVICES[service]) {
    return NextResponse.json({ detail: 'Invalid service' }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
    return NextResponse.json({ detail: 'Invalid date' }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json(NOT_CONFIGURED.body, { status: NOT_CONFIGURED.status });

  try {
    const existing = await fetchAppointmentsForDate(supabase, date);
    const slots = computeSlots(service, date, existing, Math.min(count, 12));
    return NextResponse.json({ service, date, slots, count: slots.length });
  } catch (e) {
    return NextResponse.json({ detail: e.message }, { status: 500 });
  }
}
