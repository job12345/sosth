import React from 'react';

type AdBannerProps = {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
};

const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  // กำหนดขนาดและสไตล์ตามตำแหน่งที่ต้องการแสดง
  const getAdStyle = () => {
    switch (position) {
      case 'top':
        return 'h-[90px] w-full';
      case 'bottom':
        return 'h-[90px] w-full';
      case 'sidebar':
        return 'h-[300px] w-[300px] mx-auto';
      default:
        return 'h-[90px] w-full';
    }
  };

  return (
    <div className={`bg-gray-100 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center ${getAdStyle()} ${className}`}>
      <div className="text-center p-2">
        <p className="text-gray-500 text-sm">พื้นที่โฆษณา</p>
        <p className="text-xs text-gray-400">สนใจลงโฆษณา ติดต่อ: @paybot2025</p>
      </div>
    </div>
  );
};

export default AdBanner;