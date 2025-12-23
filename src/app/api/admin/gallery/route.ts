import { NextRequest, NextResponse } from 'next/server';
import { getGalleryImages, saveGalleryImages } from '@/lib/adminDataStore';
import { requireAdmin } from '@/lib/adminServer';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const images = await getGalleryImages();
  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
  await fs.mkdir(uploadsDir, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const ext = path.extname(file.name) || '.jpg';
  const id = crypto.randomUUID();
  const fileName = `${id}${ext}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.writeFile(filePath, buffer);

  const url = `/uploads/gallery/${fileName}`;

  const images = await getGalleryImages();
  const image = {
    id,
    url,
    alt: file.name,
  };
  images.push(image);
  await saveGalleryImages(images);

  return NextResponse.json(image, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const images = await getGalleryImages();
  const nextImages = images.filter((img) => img.id !== id);
  await saveGalleryImages(nextImages);

  return NextResponse.json({ success: true });
}


