import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'public/data/phones.json');

// ตรวจสอบว่าเป็น admin หรือไม่
async function isAdmin(req: NextRequest) {
  const authToken = req.headers.get('x-admin-auth');
  return authToken === 'masterjob';
}

// อ่านข้อมูลจากไฟล์
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    throw new Error('ไม่สามารถอ่านข้อมูลได้');
  }
}

// บันทึกข้อมูลลงไฟล์
async function writeData(data: any) {
  try {
    await fs.writeFile(
      DATA_FILE_PATH, 
      JSON.stringify(data, null, 2),
      'utf-8'
    );
  } catch (error) {
    console.error('Error writing data:', error);
    throw new Error('ไม่สามารถบันทึกข้อมูลได้');
  }
}

// GET /api/phones
export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'ไม่สามารถอ่านข้อมูลได้' },
      { status: 500 }
    );
  }
}

// PUT /api/phones
export async function PUT(req: NextRequest) {
  try {
    // ตรวจสอบสิทธิ์
    if (!await isAdmin(req)) {
      return NextResponse.json(
        { error: 'ไม่มีสิทธิ์เข้าถึง' },
        { status: 403 }
      );
    }

    // รับและตรวจสอบข้อมูล
    const body = await req.json();
    
    if (!body || !body.categories) {
      console.error('Invalid data format received:', body);
      return NextResponse.json(
        { error: 'ข้อมูลไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    // บันทึกข้อมูล
    await writeData(body);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: error.message || 'ไม่สามารถบันทึกข้อมูลได้' },
      { status: 500 }
    );
  }
}