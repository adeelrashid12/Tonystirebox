import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { base64Image, fileName } = body;

    if (!base64Image || typeof base64Image !== 'string') {
      return NextResponse.json({ success: false, error: 'No image data provided' }, { status: 400 });
    }

    ensureUploadsDir();

    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const timestamp = Date.now();
    const cleanName = (fileName || 'photo').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const imageFilename = `tire_${cleanName}_${timestamp}.jpg`;
    const targetPath = path.join(UPLOADS_DIR, imageFilename);

    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/${imageFilename}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
