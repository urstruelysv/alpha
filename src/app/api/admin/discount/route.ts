import { NextRequest, NextResponse } from 'next/server';
import { getDiscountConfig, saveDiscountConfig } from '@/lib/adminDataStore';
import { requireAdmin } from '@/lib/adminServer';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const discount = await getDiscountConfig();
  return NextResponse.json(discount);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const {
    active,
    percentage,
    days,
    hours,
    minutes,
    bannerText,
  } = body as {
    active?: boolean;
    percentage?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    bannerText?: string;
  };

  if (
    typeof active !== 'boolean' ||
    typeof percentage !== 'number' ||
    typeof days !== 'number' ||
    typeof hours !== 'number' ||
    typeof minutes !== 'number' ||
    typeof bannerText !== 'string'
  ) {
    return NextResponse.json(
      { error: 'active, percentage, duration, and bannerText must be provided and be of the correct type' },
      { status: 400 },
    );
  }

  const now = new Date();
  const durationInMs = (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60) * 1000;
  const endTime = new Date(now.getTime() + durationInMs).toISOString();

  const config = { active, percentage, endTime, bannerText };
  await saveDiscountConfig(config);

  return NextResponse.json(config);
}

