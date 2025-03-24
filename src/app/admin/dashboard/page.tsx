'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiEdit2, FiTrash2, FiSave, FiPlusCircle, FiX } from 'react-icons/fi';

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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{categoryId: string; index: number} | null>(null);
  const [tempData, setTempData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // ตรวจสอบการล็อกอิน
    const isAdmin = localStorage.getItem('sosth_admin');
    if (!isAdmin) {
      router.push('/admin');
      return;
    }

    // โหลดข้อมูล
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/phones');
      const data = await response.json();
      setCategories(data.categories);
      setIsLoading(false);
    } catch (error) {
      console.error('ไม่สามารถโหลดข้อมูลได้', error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sosth_admin');
    router.push('/admin');
  };

  const handleSaveData = async (newData: any) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/phones', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': 'masterjob'
        },
        body: JSON.stringify({ categories: newData })
      });

      if (!response.ok) {
        throw new Error('ไม่สามารถบันทึกข้อมูลได้');
      }

      await fetchData(); // โหลดข้อมูลใหม่หลังจากบันทึก
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
      alert('ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditCategory = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setEditingCategory(categoryId);
      setTempData({ ...category });
    }
  };

  const handleSaveCategory = async (categoryId: string) => {
    if (!tempData) return;

    const newCategories = categories.map(category => 
      category.id === categoryId ? { ...category, ...tempData } : category
    );

    await handleSaveData(newCategories);
    setEditingCategory(null);
    setTempData(null);
  };

  const handleEditItem = (categoryId: string, index: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setEditingItem({ categoryId, index });
      setTempData({ ...category.items[index] });
    }
  };

  const handleSaveItem = async (categoryId: string, index: number) => {
    if (!tempData) return;

    const newCategories = categories.map(category => {
      if (category.id === categoryId) {
        const newItems = [...category.items];
        newItems[index] = tempData;
        return { ...category, items: newItems };
      }
      return category;
    });

    await handleSaveData(newCategories);
    setEditingItem(null);
    setTempData(null);
  };

  const handleDeleteItem = async (categoryId: string, index: number) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?')) return;

    const newCategories = categories.map(category => {
      if (category.id === categoryId) {
        const newItems = category.items.filter((_, i) => i !== index);
        return { ...category, items: newItems };
      }
      return category;
    });

    await handleSaveData(newCategories);
  };

  const handleAddItem = async (categoryId: string) => {
    const newItem = {
      name: 'เบอร์โทรศัพท์ใหม่',
      phone: '',
      description: '',
      openHours: '',
    };

    const newCategories = categories.map(category => {
      if (category.id === categoryId) {
        return { 
          ...category, 
          items: [...category.items, newItem]
        };
      }
      return category;
    });

    await handleSaveData(newCategories);
    // เริ่มแก้ไขรายการใหม่ทันที
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex !== -1) {
      handleEditItem(categoryId, newCategories[categoryIndex].items.length - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">แดชบอร์ดผู้ดูแลระบบ</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            ออกจากระบบ
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  {editingCategory === category.id ? (
                    <div className="flex items-center space-x-2">
                      <label className="sr-only" htmlFor={`category-${category.id}`}>
                        แก้ไขชื่อหมวดหมู่ {category.name}
                      </label>
                      <input
                        id={`category-${category.id}`}
                        type="text"
                        value={tempData?.name || ''}
                        onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                        className="px-2 py-1 border rounded"
                        aria-label={`แก้ไขชื่อหมวดหมู่ ${category.name}`}
                      />
                      <button
                        onClick={() => handleSaveCategory(category.id)}
                        className="text-green-600 hover:text-green-700"
                        disabled={isSaving}
                        title="บันทึกการแก้ไข"
                        aria-label="บันทึกการแก้ไขชื่อหมวดหมู่"
                      >
                        <FiSave />
                      </button>
                      <button
                        onClick={() => {
                          setEditingCategory(null);
                          setTempData(null);
                        }}
                        className="text-red-600 hover:text-red-700"
                        title="ยกเลิกการแก้ไข"
                        aria-label="ยกเลิกการแก้ไขชื่อหมวดหมู่"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-blue-800">{category.name}</h2>
                      <button
                        onClick={() => handleEditCategory(category.id)}
                        className="flex items-center text-blue-600 hover:text-blue-700"
                        aria-label={`แก้ไขหมวดหมู่ ${category.name}`}
                      >
                        <FiEdit2 className="mr-1" />
                        แก้ไขหมวดหมู่
                      </button>
                    </>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">ชื่อ</th>
                        <th className="px-4 py-2 text-left">เบอร์โทร</th>
                        <th className="px-4 py-2 text-left">รายละเอียด</th>
                        <th className="px-4 py-2 text-right">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, index) => (
                        <tr key={index} className="border-t">
                          {editingItem?.categoryId === category.id && editingItem.index === index ? (
                            <td colSpan={4} className="px-4 py-2">
                              <div className="space-y-2">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700" htmlFor={`name-${category.id}-${index}`}>
                                    ชื่อ
                                  </label>
                                  <input
                                    id={`name-${category.id}-${index}`}
                                    type="text"
                                    value={tempData?.name || ''}
                                    onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700" htmlFor={`phone-${category.id}-${index}`}>
                                    เบอร์โทร
                                  </label>
                                  <input
                                    id={`phone-${category.id}-${index}`}
                                    type="text"
                                    value={tempData?.phone || ''}
                                    onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700" htmlFor={`description-${category.id}-${index}`}>
                                    รายละเอียด
                                  </label>
                                  <input
                                    id={`description-${category.id}-${index}`}
                                    type="text"
                                    value={tempData?.description || ''}
                                    onChange={(e) => setTempData({ ...tempData, description: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700" htmlFor={`hours-${category.id}-${index}`}>
                                    เวลาทำการ
                                  </label>
                                  <input
                                    id={`hours-${category.id}-${index}`}
                                    type="text"
                                    value={tempData?.openHours || ''}
                                    onChange={(e) => setTempData({ ...tempData, openHours: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700" htmlFor={`website-${category.id}-${index}`}>
                                    เว็บไซต์
                                  </label>
                                  <input
                                    id={`website-${category.id}-${index}`}
                                    type="text"
                                    value={tempData?.website || ''}
                                    onChange={(e) => setTempData({ ...tempData, website: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700" htmlFor={`line-${category.id}-${index}`}>
                                    LINE
                                  </label>
                                  <input
                                    id={`line-${category.id}-${index}`}
                                    type="text"
                                    value={tempData?.line || ''}
                                    onChange={(e) => setTempData({ ...tempData, line: e.target.value })}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleSaveItem(category.id, index)}
                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    disabled={isSaving}
                                    aria-label="บันทึกการแก้ไขข้อมูล"
                                  >
                                    บันทึก
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingItem(null);
                                      setTempData(null);
                                    }}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                    aria-label="ยกเลิกการแก้ไขข้อมูล"
                                  >
                                    ยกเลิก
                                  </button>
                                </div>
                              </div>
                            </td>
                          ) : (
                            <>
                              <td className="px-4 py-2">{item.name}</td>
                              <td className="px-4 py-2">{item.phone}</td>
                              <td className="px-4 py-2">{item.description}</td>
                              <td className="px-4 py-2 text-right">
                                <button
                                  onClick={() => handleEditItem(category.id, index)}
                                  className="text-blue-600 hover:text-blue-700 mr-2"
                                  aria-label={`แก้ไขข้อมูล ${item.name}`}
                                  title={`แก้ไขข้อมูล ${item.name}`}
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(category.id, index)}
                                  className="text-red-600 hover:text-red-700"
                                  aria-label={`ลบข้อมูล ${item.name}`}
                                  title={`ลบข้อมูล ${item.name}`}
                                >
                                  <FiTrash2 />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={() => handleAddItem(category.id)}
                  className="mt-4 flex items-center text-green-600 hover:text-green-700"
                  disabled={isSaving}
                  aria-label={`เพิ่มเบอร์โทรศัพท์ในหมวดหมู่ ${category.name}`}
                >
                  <FiPlusCircle className="mr-1" />
                  เพิ่มเบอร์โทรศัพท์
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}