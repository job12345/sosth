import React from 'react';
import Link from 'next/link';
import { FiPhone, FiInfo, FiHeart } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FiPhone className="text-2xl" />
            <span className="font-bold text-xl">SOSTH</span>
          </Link>
          <nav className="flex space-x-4">
            <Link href="/about" className="flex items-center space-x-1 text-sm">
              <FiInfo />
              <span>เกี่ยวกับเรา</span>
            </Link>
            <Link href="https://tmn.app.link/UMso6vUFORb" target="_blank" className="flex items-center space-x-1 text-sm bg-red-500 px-2 py-1 rounded-md">
              <FiHeart />
              <span>สนับสนุน</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;