import { NextResponse } from 'next/server';
import { getGoogleReviews } from '@/lib/integrations';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getGoogleReviews());
}
