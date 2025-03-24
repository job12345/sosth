'use client';

import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import PhoneCard from './PhoneCard';

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

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<PhoneItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // โหลดข้อมูลเบอร์โทรศัพท์จากไฟล์ JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/phones.json');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('ไม่สามารถโหลดข้อมูลได้', error);
      }
    };

    fetchData();
  }, []);

  // ฟังก์ชันค้นหาเบอร์โทรศัพท์
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // รวมข้อมูลทั้งหมดจากทุกหมวดหมู่
    const allItems = categories.flatMap(category => category.items);
    
    // ค้นหาจากชื่อหรือคำอธิบาย
    const results = allItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)
    );
    
    setSearchResults(results);
    setIsLoading(false);
  };

  // ค้นหาเมื่อกด Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full">
        <input
          type="text"
          placeholder="ค้นหาเบอร์โทร หรือชื่อหน่วยงาน..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="ค้นหาเบอร์โทร หรือชื่อหน่วยงาน"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
          onClick={handleSearch}
          title="ค้นหา"
          aria-label="ค้นหา"
        >
          <FiSearch className="text-xl" />
        </button>
      </div>

      {/* แสดงผลการค้นหา */}
      {searchTerm && (
        <div className="mt-4">
          {isLoading ? (
            <p className="text-center py-4">กำลังค้นหา...</p>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="font-bold text-lg">ผลการค้นหา ({searchResults.length})</h2>
                  {searchResults.map((item, index) => (
                    <PhoneCard key={index} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-600">ไม่พบผลลัพธ์สำหรับ "{searchTerm}"</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;