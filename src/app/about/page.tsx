'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { FiArrowLeft, FiPhone, FiDownload, FiInfo, FiHeart } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Link 
          href="/"
          className="flex items-center text-blue-600 mb-6 hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          <span>กลับหน้าหลัก</span>
        </Link>

        {/* พื้นที่โฆษณาด้านบน */}
        <div className="mb-6">
          <AdBanner position="top" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">เกี่ยวกับ SOSTH.com</h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                <FiInfo className="mr-2" />
                เกี่ยวกับเว็บไซต์
              </h2>
              <p className="text-gray-700">
                SOSTH.com เป็นเว็บไซต์ที่รวบรวมเบอร์โทรศัพท์ฉุกเฉินและหน่วยงานสำคัญในประเทศไทย เพื่อให้ผู้ใช้สามารถเข้าถึงข้อมูลได้อย่างรวดเร็วและสะดวก โดยเฉพาะในสถานการณ์ฉุกเฉิน
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                <FiDownload className="mr-2" />
                วิธีติดตั้งเป็นแอปพลิเคชัน (PWA)
              </h2>
              <div className="text-gray-700 space-y-3">
                <p>คุณสามารถติดตั้ง SOSTH.com เป็นแอปพลิเคชันบนหน้าจอหลักของอุปกรณ์ของคุณได้ง่ายๆ:</p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">สำหรับ iPhone/iPad:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>เปิดเว็บไซต์ด้วย Safari</li>
                    <li>แตะปุ่มแชร์ (รูปสี่เหลี่ยมที่มีลูกศรชี้ขึ้น)</li>
                    <li>เลื่อนลงและแตะ "Add to Home Screen" (เพิ่มไปยังหน้าจอหลัก)</li>
                    <li>ตั้งชื่อแอปและแตะ "Add" (เพิ่ม)</li>
                  </ol>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg mt-3">
                  <h3 className="font-medium mb-2">สำหรับ Android:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>เปิดเว็บไซต์ด้วย Chrome</li>
                    <li>แตะปุ่มเมนู (รูปจุด 3 จุดตรงมุมขวาบน)</li>
                    <li>แตะ "Add to Home screen" (เพิ่มไปยังหน้าจอหลัก)</li>
                    <li>ตั้งชื่อแอปและแตะ "Add" (เพิ่ม)</li>
                  </ol>
                </div>
              </div>
            </div>
            
            {/* พื้นที่โฆษณาตรงกลาง */}
            <div className="my-6">
              <AdBanner position="sidebar" />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                <FiHeart className="mr-2" />
                สนับสนุนเรา
              </h2>
              <p className="text-gray-700 mb-3">
                หากคุณชอบเว็บไซต์ของเรา และต้องการสนับสนุนการพัฒนา คุณสามารถร่วมสนับสนุนเราได้ผ่านช่องทางด้านล่าง:
              </p>
              <a 
                href="https://tmn.app.link/UMso6vUFORb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                <FiHeart className="inline mr-2" />
                สนับสนุนผ่าน TrueMoney
              </a>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-blue-800 mb-2 flex items-center">
                <FiPhone className="mr-2" />
                ติดต่อเรา
              </h2>
              <p className="text-gray-700">
                หากมีคำแนะนำ ข้อติชม หรือต้องการแจ้งปรับปรุงข้อมูล สามารถติดต่อเราได้ที่:
                <a 
                  href="https://t.me/paybot2025" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block mt-2 text-blue-600 hover:underline"
                >
                  Telegram: @paybot2025
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* พื้นที่โฆษณาด้านล่าง */}
        <div className="mt-8">
          <AdBanner position="bottom" />
        </div>
      </main>

      <Footer />
    </div>
  );
}