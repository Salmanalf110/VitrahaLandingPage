import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function KarirPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const jobsQuery = await payload.find({
    collection: 'job-postings',
    where: {
      statusAktif: {
        equals: true,
      },
    },
    sort: '-createdAt',
  })

  return (
    <div className="flex flex-col font-sans">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-6 md:px-12 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-blend-overlay bg-black/70">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Karir & Rekrutmen</h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Bergabunglah bersama kami dalam merancang dan membangun masa depan infrastruktur sumber daya air Indonesia. Kami selalu mencari talenta terbaik untuk maju bersama.
          </p>
        </div>
      </div>

      <main className="flex-1 py-20 px-6 md:px-12 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-serif font-bold text-primary mb-4">Lowongan Terbuka</h2>
             <p className="text-slate-600">Temukan posisi yang sesuai dengan keahlian Anda dan jadilah bagian dari perubahan.</p>
          </div>

          {jobsQuery.docs.length > 0 ? (
            <div className="space-y-6">
              {jobsQuery.docs.map((job: any) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8">
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">{job.judul}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {job.lokasi}
                      </span>
                      <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded-md text-xs">Aktif</span>
                    </div>
                  </div>
                  <div>
                    <Link href={`/karir/${job.id}`} className="inline-block bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-md transition-colors w-full md:w-auto text-center">
                      Lihat Detail & Melamar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
              <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-slate-700 mb-2">Belum ada lowongan terbuka</h3>
              <p className="text-slate-500">Saat ini tidak ada posisi yang sedang kami cari. Silakan periksa kembali di lain waktu.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
