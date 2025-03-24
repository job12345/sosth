'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FiLock } from 'react-icons/fi';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'masterjob') {
      // เก็บสถานะการล็อกอินไว้ใน localStorage
      localStorage.setItem('sosth_admin', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('รหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="text-2xl text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-blue-900">ผู้ดูแลระบบ</h1>
              <p className="text-gray-600 mt-2">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="รหัสผ่าน"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="mb-4 text-red-500 text-center text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}