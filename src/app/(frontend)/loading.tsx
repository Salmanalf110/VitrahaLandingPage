import React from 'react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        {/* Logo Animation */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-lg"></div>
          <div className="absolute inset-0 border-4 border-secondary rounded-lg animate-spin" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}></div>
          <div className="absolute inset-0 flex items-center justify-center font-serif font-bold text-primary text-xl">V</div>
        </div>
        <div className="text-primary font-medium tracking-widest uppercase text-sm animate-pulse">Memuat...</div>
      </div>
    </div>
  )
}
