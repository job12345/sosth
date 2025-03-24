import React from 'react';
import { FiPhone, FiGlobe, FiClock, FiMapPin, FiMessageSquare } from 'react-icons/fi';

// ประกาศ type สำหรับข้อมูลเบอร์โทรศัพท์
type PhoneItem = {
  name: string;
  phone: string;
  description: string;
  openHours?: string;
  location?: string;
  website?: string;
  line?: string;
};

const PhoneCard: React.FC<{ item: PhoneItem }> = ({ item }) => {
  // สร้างฟังก์ชันสำหรับโทรออก
  const handleCall = () => {
    window.location.href = `tel:${item.phone}`;
  };

  // สร้างฟังก์ชันสำหรับเปิดเว็บไซต์
  const openWebsite = () => {
    if (item.website) {
      window.open(item.website, '_blank');
    }
  };

  // สร้างฟังก์ชันสำหรับเปิด LINE
  const openLine = () => {
    if (item.line) {
      // ตัดเครื่องหมาย @ ออกหากมี
      const lineId = item.line.startsWith('@') ? item.line.substring(1) : item.line;
      window.open(`https://line.me/ti/p/@${lineId}`, '_blank');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="font-bold text-lg text-blue-800">{item.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
      
      <div className="mt-3 space-y-2">
        {item.openHours && (
          <div className="flex items-center text-sm text-gray-700">
            <FiClock className="mr-2 text-blue-600" />
            <span>{item.openHours}</span>
          </div>
        )}
        
        {item.location && (
          <div className="flex items-center text-sm text-gray-700">
            <FiMapPin className="mr-2 text-blue-600" />
            <span>{item.location}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <button 
          onClick={handleCall}
          className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          <FiPhone className="mr-1" />
          <span>{item.phone}</span>
        </button>
        
        {item.website && (
          <button 
            onClick={openWebsite}
            className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            <FiGlobe className="mr-1" />
            <span>เว็บไซต์</span>
          </button>
        )}
        
        {item.line && (
          <button 
            onClick={openLine}
            className="flex items-center bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            <FiMessageSquare className="mr-1" />
            <span>LINE</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PhoneCard;