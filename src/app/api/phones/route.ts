import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'public/data/phones.json');

// ตรวจสอบว่าเป็น admin หรือไม่
async function isAdmin(req: NextRequest) {
  const isAdmin = req.headers.get('x-admin-auth');
  return isAdmin === 'masterjob';
}

// อ่านข้อมูลจากไฟล์
async function readData() {
  const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
  return JSON.parse(data);
}

// บันทึกข้อมูลลงไฟล์
async function writeData(data: any) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /api/phones
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'ไม่สามารถอ่านข้อมูลได้' }, { status: 500 });
  }
}

// PUT /api/phones
export async function PUT(req: NextRequest) {
  try {
    if (!await isAdmin(req)) {
      return NextResponse.json({ error: 'ไม่มีสิทธิ์เข้าถึง' }, { status: 403 });
    }

    const body = await req.json();
    await writeData(body);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'ไม่สามารถบันทึกข้อมูลได้' }, { status: 500 });
  }
}