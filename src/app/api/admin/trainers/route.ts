import { NextRequest, NextResponse } from 'next/server';
import { getTrainers, saveTrainers } from '@/lib/adminDataStore';
import { requireAdmin } from '@/lib/adminServer';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const trainers = await getTrainers();
  return NextResponse.json(trainers);
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

  const { name, role, imageUrl } = body as {
    name?: string;
    role?: string;
    imageUrl?: string;
  };

  if (!name || !imageUrl) {
    return NextResponse.json({ error: 'name and imageUrl are required' }, { status: 400 });
  }

  const trainers = await getTrainers();
  const trainer = {
    id: crypto.randomUUID(),
    name,
    role: role || '',
    imageUrl,
  };

  trainers.push(trainer);
  await saveTrainers(trainers);

  return NextResponse.json(trainer, { status: 201 });
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

  const trainers = await getTrainers();
  const nextTrainers = trainers.filter((t) => t.id !== id);
  await saveTrainers(nextTrainers);

  return NextResponse.json({ success: true });
}


