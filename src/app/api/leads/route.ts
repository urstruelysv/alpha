import { NextRequest, NextResponse } from 'next/server';
import { getLeads, saveLeads } from '@/lib/adminDataStore';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, package: packageName, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (10 digits)
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 10) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    const leads = await getLeads();
    const newLead: typeof leads[0] = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      phone: cleanedPhone,
      package: packageName || '',
      message: message.trim(),
      date: new Date().toISOString().split('T')[0],
      status: 'new',
    };

    leads.push(newLead);
    await saveLeads(leads);

    return NextResponse.json({ success: true, id: newLead.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

