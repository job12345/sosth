import React from 'react';
import Link from 'next/link';
import * as FiIcons from 'react-icons/fi';

// ประกาศ type สำหรับ props ของคอมโพเนนต์
type CategoryCardProps = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, color, icon }) => {
  // สร้างตัวแปรสำหรับเรียกใช้ไอคอนจาก react-icons
  const IconComponent = FiIcons[icon as keyof typeof FiIcons];

  return (
    <Link 
      href={`/category/${id}`}
      className={`${color} text-white p-4 rounded-lg shadow-md transition-transform hover:scale-105`}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        {IconComponent && <IconComponent className="text-3xl mb-2" />}
        <h3 className="font-bold">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;