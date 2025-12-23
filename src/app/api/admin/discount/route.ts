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

  const { percentage, days, hours, minutes } = body as {
    percentage?: number;
    days?: number;
    hours?: number;
    minutes?: number;
  };

  if (
    typeof percentage !== 'number' ||
    typeof days !== 'number' ||
    typeof hours !== 'number' ||
    typeof minutes !== 'number'
  ) {
    return NextResponse.json(
      { error: 'percentage, days, hours, and minutes must all be numbers' },
      { status: 400 },
    );
  }

  const config = { percentage, days, hours, minutes };
  await saveDiscountConfig(config);

  return NextResponse.json(config);
}


