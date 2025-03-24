'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiSave, FiGlobe } from 'react-icons/fi';

type SEOConfig = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
};

export default function AdminSEOPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<SEOConfig>({
    title: '',
    description: '',
    ogTitle: '',
    ogDescription: '',
    twitterTitle: '',
    twitterDescription: '',
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('sosth_admin');
    if (!isAdmin) {
      router.push('/admin');
      return;
    }
    loadConfig();
  }, [router]);

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      // TODO: ในอนาคตจะเพิ่ม API สำหรับโหลด SEO config
      const defaultConfig = {
        title: 'SOSTH - เบอร์โทรฉุกเฉิน',
        description: 'แหล่งรวมเบอร์โทรฉุกเฉินและหน่วยงานสำคัญในประเทศไทย',
        ogTitle: 'SOSTH - เบอร์โทรฉุกเฉิน',
        ogDescription: 'แหล่งรวมเบอร์โทรฉุกเฉินและหน่วยงานสำคัญในประเทศไทย',
        twitterTitle: 'SOSTH - เบอร์โทรฉุกเฉิน',
        twitterDescription: 'แหล่งรวมเบอร์โทรฉุกเฉินและหน่วยงานสำคัญในประเทศไทย',
      };
      setConfig(defaultConfig);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading SEO config:', error);
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: ในอนาคตจะเพิ่ม API สำหรับบันทึก SEO config
      alert('บันทึกการตั้งค่า SEO เรียบร้อย');
    } catch (error) {
      console.error('Error saving SEO config:', error);
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900">จัดการ SEO</h1>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <FiGlobe className="mr-2" />
                    ตั้งค่า Meta Tags
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={config.title}
                        onChange={(e) => setConfig({ ...config, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={config.description}
                        onChange={(e) => setConfig({ ...config, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Open Graph</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-700">
                        OG Title
                      </label>
                      <input
                        type="text"
                        id="ogTitle"
                        value={config.ogTitle}
                        onChange={(e) => setConfig({ ...config, ogTitle: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-700">
                        OG Description
                      </label>
                      <textarea
                        id="ogDescription"
                        value={config.ogDescription}
                        onChange={(e) => setConfig({ ...config, ogDescription: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Twitter Card</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="twitterTitle" className="block text-sm font-medium text-gray-700">
                        Twitter Title
                      </label>
                      <input
                        type="text"
                        id="twitterTitle"
                        value={config.twitterTitle}
                        onChange={(e) => setConfig({ ...config, twitterTitle: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="twitterDescription" className="block text-sm font-medium text-gray-700">
                        Twitter Description
                      </label>
                      <textarea
                        id="twitterDescription"
                        value={config.twitterDescription}
                        onChange={(e) => setConfig({ ...config, twitterDescription: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
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
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}