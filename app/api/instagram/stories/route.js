import { NextResponse } from 'next/server';
import { getInstagramStories } from '@/lib/integrations';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getInstagramStories());
}
