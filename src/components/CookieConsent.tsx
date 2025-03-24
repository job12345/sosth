'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่าเคยยอมรับคุกกี้หรือยัง
    const hasConsent = Cookies.get('cookie-consent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // เก็บค่าความยินยอมไว้ 1 ปี
    Cookies.set('cookie-consent', 'true', { expires: 365 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    // เก็บค่าปฏิเสธไว้ 1 ปี
    Cookies.set('cookie-consent', 'false', { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 md:p-6 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 flex-1">
          <h2 className="font-bold text-gray-800 mb-2">นโยบายการใช้คุกกี้</h2>
          <p>
            เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานของคุณ 
            เราใช้คุกกี้เพื่อจดจำการตั้งค่าและปรับปรุงการให้บริการของเรา 
            การใช้งานเว็บไซต์นี้ถือว่าคุณยอมรับการใช้คุกกี้ตามนโยบายความเป็นส่วนตัวของเรา
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            ปฏิเสธ
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            ยอมรับ
          </button>
        </div>
      </div>
    </div>
  );
}