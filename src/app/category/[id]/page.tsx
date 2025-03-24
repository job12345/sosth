'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import PhoneCard from '@/components/PhoneCard';
import { FiArrowLeft } from 'react-icons/fi';

type PhoneItem = {
  name: string;
  phone: string;
  description: string;
  openHours?: string;
  location?: string;
  website?: string;
  line?: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: PhoneItem[];
};

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/phones.json');
        const data = await response.json();
        
        const foundCategory = data.categories.find(
          (cat: Category) => cat.id === categoryId
        );
        
        setCategory(foundCategory || null);
        setIsLoading(false);
      } catch (error) {
        console.error('ไม่สามารถโหลดข้อมูลได้', error);
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

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

        {isLoading ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        ) : category ? (
          <div>
            <div className={`${category.color} p-4 rounded-lg shadow-md text-white mb-6`}>
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="mt-1 text-white/80">เบอร์โทรศัพท์ที่สำคัญในหมวดหมู่นี้</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {category.items.map((item, index) => (
                <PhoneCard key={index} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-red-500">ไม่พบข้อมูลหมวดหมู่ที่ต้องการ</p>
            <Link 
              href="/"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        )}

        {/* พื้นที่โฆษณาด้านล่าง */}
        <div className="my-8">
          <AdBanner position="bottom" />
        </div>
      </main>

      <Footer />
    </div>
  );
}