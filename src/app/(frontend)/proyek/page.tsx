import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function ProyekPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  // Next.js 15: searchParams is a Promise
  const sp = await props.searchParams
  const provinsiFilter = typeof sp.provinsi === 'string' ? sp.provinsi : ''
  const tahunFilter = typeof sp.tahun === 'string' ? sp.tahun : ''

  // Build query
  const where: any = {}
  if (provinsiFilter) where.provinsi = { equals: provinsiFilter }
  if (tahunFilter) where.tahun = { equals: parseInt(tahunFilter) }

  const projectsQuery = await payload.find({
    collection: 'projects',
    where: Object.keys(where).length > 0 ? where : undefined,
    limit: 100, // Menampilkan hingga 100 proyek
    sort: '-tahun',
  })

  const provinces = ['Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat', 'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan', 'Papua Barat Daya'].sort()
  
  const allProjectsForYears = await payload.find({ collection: 'projects', limit: 1000 })
  const uniqueYears = Array.from(new Set(allProjectsForYears.docs.map(p => p.tahun))).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">


      <div className="bg-slate-900 text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-4">Portofolio Proyek</h1>
          <p className="text-slate-400 max-w-2xl text-lg">Menelusuri jejak karya kami dalam mengembangkan infrastruktur sumber daya air di seluruh pelosok negeri.</p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filter */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-8">
            <h2 className="font-bold text-primary text-lg mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter Proyek
            </h2>
            
            <form action="/proyek" method="GET" className="space-y-6">
              <div>
                <label htmlFor="provinsi" className="block text-sm font-medium text-slate-700 mb-2">Provinsi</label>
                <select 
                  id="provinsi" 
                  name="provinsi" 
                  defaultValue={provinsiFilter}
                  className="w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                >
                  <option value="">Semua Provinsi</option>
                  {provinces.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tahun" className="block text-sm font-medium text-slate-700 mb-2">Tahun</label>
                <select 
                  id="tahun" 
                  name="tahun" 
                  defaultValue={tahunFilter}
                  className="w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                >
                  <option value="">Semua Tahun</option>
                  {uniqueYears.map(yr => (
                    <option key={String(yr)} value={String(yr)}>{yr}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button type="submit" className="flex-1 bg-primary hover:bg-primary-light text-white py-2 px-4 rounded-md font-medium transition-colors text-sm shadow-sm">Terapkan</button>
                {(provinsiFilter || tahunFilter) && (
                  <Link href="/proyek" className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 px-4 rounded-md font-medium transition-colors text-sm text-center">Reset</Link>
                )}
              </div>
            </form>
          </div>
        </aside>

        {/* Project Grid */}
        <div className="w-full md:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Menampilkan {projectsQuery.docs.length} Proyek</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsQuery.docs.length > 0 ? (
              projectsQuery.docs.map((project: any) => (
                <div key={project.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="h-48 bg-slate-100 relative overflow-hidden">
                    {project.galeri && project.galeri.length > 0 && typeof project.galeri[0].foto === 'object' && project.galeri[0].foto.url ? (
                       <Image 
                         src={project.galeri[0].foto.url} 
                         alt={project.nama} 
                         fill 
                         className="object-cover group-hover:scale-105 transition-transform duration-700" 
                       />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                        <svg className="w-10 h-10 mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span className="text-sm font-medium">Tanpa Foto</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">{project.tahun}</span>
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">{project.provinsi}</span>
                      {project.jenisLayanan && <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded capitalize">{project.jenisLayanan.replace('_', ' ')}</span>}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors line-clamp-2">{project.nama}</h3>
                    <p className="text-slate-500 text-sm font-medium mb-1">Klien: {project.klien || '-'}</p>
                    <p className="text-slate-500 text-sm capitalize">Pekerjaan: {project.jenisPekerjaan}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-24 bg-white rounded-xl border border-dashed border-slate-300">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-900 mb-1">Tidak Ada Hasil</h3>
                <p className="text-slate-500">Kami tidak menemukan proyek yang sesuai dengan kriteria saringan Anda.</p>
                <Link href="/proyek" className="inline-block mt-4 text-secondary hover:text-secondary-light font-medium">Hapus Saringan</Link>
              </div>
            )}
          </div>
        </div>
        
      </main>
      

    </div>
  )
}
