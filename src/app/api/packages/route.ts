import { NextResponse } from 'next/server';
import { getPackages } from '@/lib/adminDataStore';

export const runtime = 'nodejs';

export async function GET() {
  const packages = await getPackages();
  return NextResponse.json(packages);
}

