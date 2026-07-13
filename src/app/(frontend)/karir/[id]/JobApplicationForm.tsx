'use client'

import React, { useActionState, useEffect, useState } from 'react'
import { submitJobApplication } from './actions'

interface Props {
  jobId: string;
}

export default function JobApplicationForm({ jobId }: Props) {
  const [state, formAction, isPending] = useActionState(submitJobApplication, null)
  const [fileName, setFileName] = useState<string>('')

  // Handle file selection to show filename
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName('')
    }
  }

  // Jika sukses, tampilkan state Sukses (Tidak perlu halaman baru)
  if (state?.success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl border border-green-200 text-center animate-fade-in shadow-sm">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Lamaran Terkirim!</h3>
        <p className="text-green-700">Terima kasih atas ketertarikan Anda. Tim HRD kami akan meninjau kualifikasi Anda dan menghubungi Anda melalui email jika Anda terpilih untuk tahap selanjutnya.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-2xl font-serif font-bold text-primary mb-6">Kirim Lamaran Sekarang</h3>
      
      {state?.message && !state.success && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md border border-red-200 text-sm">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="jobId" value={jobId} />
        
        {/* ANTI-SPAM HONEYPOT */}
        <div aria-hidden="true" className="opacity-0 absolute -z-50 w-0 h-0 overflow-hidden" tabIndex={-1}>
          <label>Leave this field empty</label>
          <input type="text" name="address_secondary" tabIndex={-1} autoComplete="off" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
          <input 
            type="text" 
            name="namaPelamar"
            required
            className="w-full border border-slate-300 rounded-md py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
            placeholder="John Doe" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Alamat Email *</label>
          <input 
            type="email" 
            name="email"
            required
            className="w-full border border-slate-300 rounded-md py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" 
            placeholder="john@example.com" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Unggah Curriculum Vitae (PDF) *</label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-md py-8 px-4 text-center hover:bg-slate-50 transition-colors">
            <input 
              type="file" 
              name="fileCV"
              accept=".pdf,application/pdf"
              required
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {fileName ? (
              <div className="text-primary font-medium flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {fileName}
              </div>
            ) : (
              <div className="text-slate-500 flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span>Klik atau seret file PDF Anda ke sini (Max 5MB)</span>
              </div>
            )}
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-secondary hover:bg-secondary-light text-white py-4 px-8 rounded font-bold tracking-wide transition-colors shadow-lg shadow-secondary/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengirim Lamaran...
            </>
          ) : 'Kirim Lamaran'}
        </button>
      </form>
    </div>
  )
}
