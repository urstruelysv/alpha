import { NextRequest, NextResponse } from 'next/server';
import { getPackages, savePackages, Package } from '@/lib/adminDataStore';
import { requireAdmin } from '@/lib/adminServer';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function GET() {
  const packages = await getPackages();
  return NextResponse.json(packages);
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

  const { name, price, type, description, note, order } = body as {
    name?: string;
    price?: string;
    type?: 'membership' | 'personal-training';
    description?: string;
    note?: string;
    order?: number;
  };

  if (!name || !price || !type) {
    return NextResponse.json(
      { error: 'name, price, and type are required' },
      { status: 400 },
    );
  }

  const packages = await getPackages();
  const pkg: Package = {
    id: crypto.randomUUID(),
    name,
    price,
    type,
    description,
    note,
    order: typeof order === 'number' ? order : packages.length + 1,
  };

  packages.push(pkg);
  await savePackages(packages);

  return NextResponse.json(pkg, { status: 201 });
}

export async function PATCH(request: NextRequest) {
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

  const { id, name, price, type, description, note, order } = body as {
    id?: string;
    name?: string;
    price?: string;
    type?: 'membership' | 'personal-training';
    description?: string;
    note?: string;
    order?: number;
  };

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const packages = await getPackages();
  const index = packages.findIndex((pkg) => pkg.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }

  if (name !== undefined) packages[index].name = name;
  if (price !== undefined) packages[index].price = price;
  if (type !== undefined) packages[index].type = type;
  if (description !== undefined) packages[index].description = description;
  if (note !== undefined) packages[index].note = note;
  if (order !== undefined) packages[index].order = order;

  await savePackages(packages);

  return NextResponse.json(packages[index]);
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

  const packages = await getPackages();
  const nextPackages = packages.filter((pkg) => pkg.id !== id);
  await savePackages(nextPackages);

  return NextResponse.json({ success: true });
}

