import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { INITIAL_TIRES, TireItem } from '@/data/inventory';

export const dynamic = 'force-static';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'inventory_store.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(INITIAL_TIRES, null, 2), 'utf-8');
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    const inventory: TireItem[] = JSON.parse(data);
    return NextResponse.json({ success: true, inventory });
  } catch (error) {
    return NextResponse.json({ success: true, inventory: INITIAL_TIRES });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inventory } = body;

    if (!Array.isArray(inventory)) {
      return NextResponse.json({ success: false, error: 'Invalid inventory array' }, { status: 400 });
    }

    ensureDataFile();
    fs.writeFileSync(FILE_PATH, JSON.stringify(inventory, null, 2), 'utf-8');

    return NextResponse.json({ success: true, count: inventory.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server save failed' }, { status: 500 });
  }
}
