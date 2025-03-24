'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiSave, FiDollarSign, FiPlus, FiTrash2 } from 'react-icons/fi';

type AdConfig = {
  id: string;
  position: 'top' | 'bottom' | 'sidebar';
  title: string;
  code: string;
  active: boolean;
};

export default function AdminAdsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [ads, setAds] = useState<AdConfig[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('sosth_admin');
    if (!isAdmin) {
      router.push('/admin');
      return;
    }
    loadAds();
  }, [router]);

  const loadAds = async () => {
    try {
      setIsLoading(true);
      // TODO: ในอนาคตจะเพิ่ม API สำหรับโหลดข้อมูลโฆษณา
      const defaultAds = [
        {
          id: '1',
          position: 'top' as const,
          title: 'โฆษณาด้านบน',
          code: '<!-- Ad code here -->',
          active: true,
        },
        {
          id: '2',
          position: 'bottom' as const,
          title: 'โฆษณาด้านล่าง',
          code: '<!-- Ad code here -->',
          active: true,
        },
        {
          id: '3',
          position: 'sidebar' as const,
          title: 'โฆษณาด้านข้าง',
          code: '<!-- Ad code here -->',
          active: false,
        },
      ];
      setAds(defaultAds);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading ads:', error);
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: ในอนาคตจะเพิ่ม API สำหรับบันทึกข้อมูลโฆษณา
      alert('บันทึกการตั้งค่าโฆษณาเรียบร้อย');
    } catch (error) {
      console.error('Error saving ads:', error);
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddAd = () => {
    const newAd: AdConfig = {
      id: Date.now().toString(),
      position: 'top',
      title: 'โฆษณาใหม่',
      code: '',
      active: false,
    };
    setAds([...ads, newAd]);
  };

  const handleDeleteAd = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบโฆษณานี้?')) {
      setAds(ads.filter(ad => ad.id !== id));
    }
  };

  const handleUpdateAd = (id: string, updates: Partial<AdConfig>) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, ...updates } : ad));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900">จัดการโฆษณา</h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-blue-600 hover:underline"
            >
              กลับไปหน้าแดชบอร์ด
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p>กำลังโหลดข้อมูล...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={handleAddAd}
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <FiPlus className="mr-1" />
                เพิ่มโฆษณาใหม่
              </button>

              {ads.map((ad) => (
                <div key={ad.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <FiDollarSign className="text-green-500 mr-2" />
                      <input
                        type="text"
                        value={ad.title}
                        onChange={(e) => handleUpdateAd(ad.id, { title: e.target.value })}
                        className="text-lg font-semibold border-none focus:ring-0"
                        aria-label="ชื่อโฆษณา"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteAd(ad.id)}
                      className="text-red-500 hover:text-red-600"
                      aria-label="ลบโฆษณา"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`position-${ad.id}`} className="block text-sm font-medium text-gray-700">
                        ตำแหน่ง
                      </label>
                      <select
                        id={`position-${ad.id}`}
                        value={ad.position}
                        onChange={(e) => handleUpdateAd(ad.id, { position: e.target.value as AdConfig['position'] })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      >
                        <option value="top">ด้านบน</option>
                        <option value="bottom">ด้านล่าง</option>
                        <option value="sidebar">ด้านข้าง</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`code-${ad.id}`} className="block text-sm font-medium text-gray-700">
                        โค้ดโฆษณา
                      </label>
                      <textarea
                        id={`code-${ad.id}`}
                        value={ad.code}
                        onChange={(e) => handleUpdateAd(ad.id, { code: e.target.value })}
                        rows={5}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-sm"
                        placeholder="<!-- วางโค้ดโฆษณาที่นี่ -->"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`active-${ad.id}`}
                        checked={ad.active}
                        onChange={(e) => handleUpdateAd(ad.id, { active: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor={`active-${ad.id}`} className="ml-2 block text-sm text-gray-700">
                        เปิดใช้งานโฆษณานี้
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <FiSave className="mr-2" />
                  {isSaving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}