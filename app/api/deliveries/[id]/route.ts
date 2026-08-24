import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const dbPath = join(process.cwd(), 'data', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
    const id = parseInt(params.id);
    const { status } = await request.json();
    
    const delivery = db.deliveries.find((d: any) => d.id === id);
    if (!delivery) {
      return NextResponse.json({ error: 'Delivery not found' }, { status: 404 });
    }
    
    delivery.status = status;
    if (status === 'delivered') {
      delivery.deliveredAt = new Date().toISOString();
    }
    
    writeFileSync(dbPath, JSON.stringify(db, null, 2));
    
    return NextResponse.json(delivery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update delivery' }, { status: 500 });
  }
}