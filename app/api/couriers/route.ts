import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const dbPath = join(process.cwd(), 'data', 'db.json');
    const db = JSON.parse(readFileSync(dbPath, 'utf-8'));
    return NextResponse.json(db.couriers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch couriers' }, { status: 500 });
  }
}