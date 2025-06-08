'use client';

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              GeoTrack
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link href="/alertas" className="hover:text-blue-200">
              Global
            </Link>
            <Link href="/perfil" className="hover:text-blue-200">
              Perfil
            </Link>
            <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 