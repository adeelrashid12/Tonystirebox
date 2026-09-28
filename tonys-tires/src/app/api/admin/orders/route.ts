import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'orders_store.json');

const INITIAL_ORDERS = [
  {
    id: 'ORD-9821',
    customerPhone: '864-512-9920',
    tireSize: '225/65R17',
    brand: 'Quality Used Tire',
    quantity: 2,
    totalPrice: 90,
    locationName: 'Greer',
    lockboxCode: '3941',
    paymentMethod: 'Cash App',
    senderRef: '$JohnDoe',
    status: 'Pending Verification',
    createdAt: 'Today, 08:15 AM'
  }
];

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(INITIAL_ORDERS, null, 2), 'utf-8');
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    const orders = JSON.parse(data);
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: true, orders: INITIAL_ORDERS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orders } = body;

    if (!Array.isArray(orders)) {
      return NextResponse.json({ success: false, error: 'Invalid orders array' }, { status: 400 });
    }

    ensureDataFile();
    fs.writeFileSync(FILE_PATH, JSON.stringify(orders, null, 2), 'utf-8');

    return NextResponse.json({ success: true, count: orders.length });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server save failed' }, { status: 500 });
  }
}
