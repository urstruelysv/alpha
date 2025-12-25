import { NextResponse } from 'next/server';
import { getDiscountConfig, saveDiscountConfig } from '@/lib/adminDataStore';

export const runtime = 'nodejs';

export async function GET() {
  const discount = await getDiscountConfig();

  if (discount && discount.active) {
    if (discount.endTime && new Date() > new Date(discount.endTime)) {
      // Discount has expired, so deactivate it
      const expiredConfig = { ...discount, active: false };
      await saveDiscountConfig(expiredConfig);
      return NextResponse.json(null); // Return null as it's no longer active
    }
    // Discount is active and not expired
    return NextResponse.json(discount);
  }

  // Discount is not active or doesn't exist
  return NextResponse.json(null);
}


