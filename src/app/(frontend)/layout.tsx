import React from 'react'
import './globals.css'

export const metadata = {
  description: 'Website resmi PT Vitraha Consindotama, perusahaan konsultan teknik di bidang pengelolaan sumber daya air.',
  title: 'PT Vitraha Consindotama | Konsultan Teknik Sumber Daya Air',
}

import Link from 'next/link'

import Header from '@/components/Header'

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans bg-slate-50">
        <Header />

        <main className="flex-1 w-full animate-fade-in-up">{children}</main>

        {/* Footer Global */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 md:px-12 text-center text-sm border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} PT Vitraha Consindotama. Hak Cipta Dilindungi.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
              <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
