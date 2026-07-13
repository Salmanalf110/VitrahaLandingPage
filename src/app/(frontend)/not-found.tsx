import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="text-9xl font-serif font-bold text-slate-200 mb-4">404</div>
      <h1 className="text-3xl font-bold text-primary mb-4">Halaman Tidak Ditemukan</h1>
      <p className="text-slate-600 max-w-md mx-auto mb-8">
        Maaf, halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau tidak tersedia untuk sementara waktu.
      </p>
      <Link href="/" className="bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded font-bold transition-colors shadow-lg">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
