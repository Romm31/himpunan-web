// src/components/Navbar.tsx (Updated for Elegance & Emerald)
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Berita', href: '#berita' },
    { name: 'Visi & Misi', href: '#visi-misi' },
    { name: 'Tentang Kami', href: '#tentang' },
  ];

  return (
    <header className="bg-emerald-himp shadow-lg sticky top-0 z-50 text-white font-sans">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
          {/* Menggunakan path logo Anda */}
          <Image src="/logo/logo.png" alt="Logo HIMPENAS" width={48} height={48} className="rounded-full" />
          <span className="font-bold text-2xl tracking-wide">HIMPENAS</span>
        </Link>
        <nav className="hidden md:flex space-x-8 text-lg">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="relative hover:text-emerald-light transition-colors group">
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu" className="text-white hover:text-emerald-light transition-colors">
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-dark text-white shadow-inner pb-4">
          <nav className="flex flex-col items-center space-y-4 py-4 text-lg">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-emerald-light transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
export default Navbar;