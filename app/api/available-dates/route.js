import { NextResponse } from 'next/server';
import { getNextAvailableDates } from '@/lib/availability';

export const dynamic = 'force-dynamic';

export function GET(request) {
  const days = Number(new URL(request.url).searchParams.get('days')) || 7;
  return NextResponse.json({ dates: getNextAvailableDates(Math.min(days, 30)) });
}
