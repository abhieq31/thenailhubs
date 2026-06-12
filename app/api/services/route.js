import { NextResponse } from 'next/server';
import { SERVICES } from '@/lib/businessRules';

export function GET() {
  return NextResponse.json({
    services: Object.entries(SERVICES).map(([name, s]) => ({
      name,
      duration: s.duration,
      display_duration: s.displayDuration,
      icon: s.icon,
      popular: s.popular,
    })),
  });
}
