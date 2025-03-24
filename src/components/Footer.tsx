import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 text-sm">
      <div className="container mx-auto px-4">
        <p>© 2025 SOSTH.com - พัฒนาโดย Mr.j</p>
        <p className="text-gray-400 mt-1">ติดต่อ: <a href="https://t.me/paybot2025" className="underline">Telegram: @paybot2025</a></p>
        <div className="mt-2">
          <Link href="https://tmn.app.link/UMso6vUFORb" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">สนับสนุนเรา</Link>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          <p>รหัสผู้ดูแล: masterjob</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;