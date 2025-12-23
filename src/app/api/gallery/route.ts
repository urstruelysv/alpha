import { NextResponse } from 'next/server';
import { getGalleryImages } from '@/lib/adminDataStore';

export const runtime = 'nodejs';

export async function GET() {
  const images = await getGalleryImages();
  return NextResponse.json(images);
}


