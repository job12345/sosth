'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import SearchBox from '@/components/SearchBox';
import CategoryCard from '@/components/CategoryCard';
import { FiAlertCircle } from 'react-icons/fi';

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: any[];
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/phones.json');
        const data = await response.json();
        setCategories(data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error('ไม่สามารถโหลดข้อมูลได้', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* ส่วนหัวและคำอธิบาย */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">SOSTH - เบอร์โทรฉุกเฉิน</h1>
          <p className="text-gray-600">แหล่งรวมเบอร์โทรฉุกเฉินและหน่วยงานสำคัญในประเทศไทย</p>
        </div>

        {/* พื้นที่โฆษณาด้านบน */}
        <div className="mb-6">
          <AdBanner position="top" />
        </div>

        {/* ช่องค้นหา */}
        <div className="mb-10">
          <SearchBox />
        </div>

        {/* แสดงหมวดหมู่ */}
        <h2 className="text-xl font-bold mb-4 text-blue-800">หมวดหมู่เบอร์โทร</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                color={category.color}
                icon={category.icon}
              />
            ))}
          </div>
        )}

        {/* พื้นที่โฆษณาก่อนส่วนข้อความเตือน */}
        <div className="my-8">
          <AdBanner position="bottom" />
        </div>

        {/* ส่วนด้านล่าง */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <FiAlertCircle className="text-blue-600 mt-1 mr-2 text-lg flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-800">ขอความร่วมมือ</h3>
              <p className="text-sm text-gray-600">โปรดใช้เบอร์โทรฉุกเฉินเมื่อจำเป็นเท่านั้น การโทรเล่นหรือแจ้งเหตุเท็จมีความผิดตามกฎหมาย</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
