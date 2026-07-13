'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Tutup menu saat route berubah
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Deteksi scroll untuk efek glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang', label: 'Tentang Kami' },
    { href: '/layanan', label: 'Layanan' },
    { href: '/proyek', label: 'Proyek' },
    { href: '/karir', label: 'Karir' },
    { href: '/kontak', label: 'Kontak' },
  ]

  return (
    <header 
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary/95 backdrop-blur-md shadow-lg py-4' 
          : 'bg-primary/100 py-6'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
             <span className="font-bold text-primary text-xl">V</span>
          </div>
          <div>
            <div className="font-serif font-bold text-xl leading-tight tracking-wide group-hover:text-secondary-light transition-colors">VITRAHA</div>
            <div className="text-[0.65rem] tracking-[0.2em] text-slate-300 uppercase font-medium">Consindotama</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`transition-colors hover:text-secondary-light relative group ${pathname === link.href ? 'text-secondary-light' : 'text-slate-200'}`}
            >
              {link.label}
              {/* Active / Hover Indicator */}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-200 hover:text-white focus:outline-none p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 transition-all duration-300 overflow-hidden shadow-2xl ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`block text-lg font-medium py-2 border-b border-slate-800/50 ${
                pathname === link.href ? 'text-secondary-light' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
