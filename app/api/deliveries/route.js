import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const dbPath = join(process.cwd(), 'data', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
    return NextResponse.json(db.deliveries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch deliveries' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const dbPath = join(process.cwd(), 'data', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
    const newDelivery = await request.json();
    
    newDelivery.id = Math.max(...db.deliveries.map((d) => d.id), 0) + 1;
    newDelivery.createdAt = new Date().toISOString();
    
    db.deliveries.push(newDelivery);
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    
    return NextResponse.json(newDelivery, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create delivery' }, { status: 500 });
  }
}