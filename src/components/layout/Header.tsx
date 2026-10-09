"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-brand-navy text-white sticky top-0 z-50 shadow-lg border-b border-brand-gold/30">
      <div className="max-w-md mx-auto px-4 h-16 flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.location.href = '/'}
        >
          <div className="relative w-8 h-8">
            <Image
              src="https://i.imgur.com/GrXdnFi.png"
              alt="HUB da Fé Logo"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tighter text-brand-gold uppercase">
            HUB <span className="text-white">da</span> Fé
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-brand-gold hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile-First Menu Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-brand-navy border-b border-brand-gold/30 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/"
              className="px-4 py-4 text-lg font-medium hover:bg-white/10 rounded-xl transition-colors border-l-4 border-transparent hover:border-brand-gold"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/diretorio"
              className="px-4 py-4 text-lg font-medium hover:bg-white/10 rounded-xl transition-colors border-l-4 border-transparent hover:border-brand-gold"
              onClick={() => setIsOpen(false)}
            >
              Diretório
            </Link>
            <Link
              href="/categorias"
              className="px-4 py-4 text-lg font-medium hover:bg-white/10 rounded-xl transition-colors border-l-4 border-transparent hover:border-brand-gold"
              onClick={() => setIsOpen(false)}
            >
              Categorias
            </Link>
            <Link
              href="/login"
              className="mt-4 bg-brand-gold text-brand-navy px-4 py-4 rounded-xl font-bold text-center shadow-md active:scale-95 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              Área do Membro
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
