import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import kv from '@vercel/kv';

const DATA_FILE_PATH = path.join(process.cwd(), 'public/data/phones.json');
const KV_KEY = 'sosth_phone_data';

// ตรวจสอบว่าเป็น admin หรือไม่
async function isAdmin(req: NextRequest) {
  const isAdmin = req.headers.get('x-admin-auth');
  return isAdmin === 'masterjob';
}

// อ่านข้อมูลจากไฟล์หรือ KV
async function readData() {
  // ถ้าอยู่ใน production ให้อ่านจาก KV
  if (process.env.NODE_ENV === 'production') {
    try {
      const data = await kv.get(KV_KEY);
      // ถ้ายังไม่มีข้อมูลใน KV ให้ดึงจากไฟล์แล้วบันทึกเข้า KV
      if (!data) {
        const fileData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const parsedData = JSON.parse(fileData);
        await kv.set(KV_KEY, parsedData);
        return parsedData;
      }
      return data;
    } catch (error) {
      console.error('KV error:', error);
      // Fallback to file if KV fails
      const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } else {
    // ใน development ให้อ่านจากไฟล์
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  }
}

// บันทึกข้อมูล
async function writeData(data: any) {
  if (process.env.NODE_ENV === 'production') {
    // ใน production ให้บันทึกลง KV
    await kv.set(KV_KEY, data);
  } else {
    // ใน development ให้บันทึกลงไฟล์
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  }
}

// GET /api/phones
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET error:', error);
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
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'ไม่สามารถบันทึกข้อมูลได้' }, { status: 500 });
  }
}