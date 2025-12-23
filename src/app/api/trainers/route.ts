import { NextResponse } from 'next/server';
import { getTrainers } from '@/lib/adminDataStore';

export const runtime = 'nodejs';

export async function GET() {
  const trainers = await getTrainers();
  return NextResponse.json(trainers);
}


