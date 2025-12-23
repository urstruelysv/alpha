import { NextResponse } from 'next/server';
import { getDiscountConfig } from '@/lib/adminDataStore';

export const runtime = 'nodejs';

export async function GET() {
  const discount = await getDiscountConfig();
  return NextResponse.json(discount);
}


