import { NextResponse } from 'next/server';
import { getInstagramFeed } from '@/lib/integrations';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const limit = Number(new URL(request.url).searchParams.get('limit')) || 12;
  return NextResponse.json(await getInstagramFeed(limit));
}
