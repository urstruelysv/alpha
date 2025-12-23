import { NextRequest, NextResponse } from 'next/server';
import { getLeads, saveLeads, Lead } from '@/lib/adminDataStore';
import { requireAdmin } from '@/lib/adminServer';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = await getLeads();
  return NextResponse.json(leads);
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

  const { id, status } = body as {
    id?: string;
    status?: Lead['status'];
  };

  if (!id || !status) {
    return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
  }

  const leads = await getLeads();
  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  leads[index] = { ...leads[index], status };
  await saveLeads(leads);

  return NextResponse.json(leads[index]);
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

  const leads = await getLeads();
  const nextLeads = leads.filter((lead) => lead.id !== id);
  await saveLeads(nextLeads);

  return NextResponse.json({ success: true });
}


