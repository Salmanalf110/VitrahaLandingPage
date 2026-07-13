import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import config from '@/payload.config'

// Helper untuk mengambil teks murni dari Lexical RichText
function extractLexicalText(lexicalData: any): string {
  if (!lexicalData || !lexicalData.root) return 'Inovasi Sumber Daya Air untuk Masa Depan yang Berkelanjutan.';
  let text = '';
  function traverse(node: any) {
    if (node.type === 'text') text += node.text;
    if (node.children) node.children.forEach(traverse);
  }
  traverse(lexicalData.root);
  return text || 'Inovasi Sumber Daya Air untuk Masa Depan yang Berkelanjutan.';
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Ambil Data Profil Perusahaan
  const companyProfile = await payload.findGlobal({
    slug: 'company-profile',
  })

  // Ambil Data Proyek (Limit 1000 untuk menghitung metrics unik)
  const allProjects = await payload.find({
    collection: 'projects',
    limit: 1000,
  })

  const totalProjects = allProjects.totalDocs
  // @ts-ignore (provinsi field exists but TS might not map it perfectly without generated types yet)
  const distinctProvinces = new Set(allProjects.docs.map(p => p.provinsi)).size

  // Proyek Terbaru (Top 3)
  const latestProjects = await payload.find({
    collection: 'projects',
    limit: 3,
    sort: '-createdAt',
  })

  const tagline = extractLexicalText(companyProfile?.profilSingkat)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">



      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/hero.jpg" 
          alt="Infrastruktur Bendungan" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
        
        <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto drop-shadow-2xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              Solusi Rekayasa <br/> <span className="text-secondary drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Sumber Daya Air</span> Terpadu
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
               {tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-secondary hover:bg-secondary-light text-white px-8 py-4 rounded font-bold tracking-wide transition-colors shadow-lg shadow-secondary/30">
                Eksplorasi Proyek Kami
              </button>
              <button className="bg-primary/80 hover:bg-primary border border-white/20 text-white px-8 py-4 rounded font-bold tracking-wide transition-colors backdrop-blur-sm">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="relative z-20 -mt-16 mx-4 md:mx-auto max-w-6xl w-full">
        <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 p-2 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-8 hover:bg-slate-50 transition-colors rounded-lg">
              <div className="text-5xl font-bold text-primary mb-3">20+</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">Tahun Pengalaman</div>
            </div>
            <div className="p-8 hover:bg-slate-50 transition-colors rounded-lg">
              <div className="text-5xl font-bold text-primary mb-3">{totalProjects > 0 ? totalProjects : '500+'}</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">Proyek Terselesaikan</div>
            </div>
            <div className="p-8 hover:bg-slate-50 transition-colors rounded-lg">
              <div className="text-5xl font-bold text-primary mb-3">{distinctProvinces > 0 ? distinctProvinces : '38'}</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">Provinsi Terjangkau</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bidang Layanan */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Keahlian Kami</div>
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">Layanan Konsultansi Komprehensif</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Mendukung pembangunan infrastruktur keairan nasional melalui kajian, perencanaan, dan supervisi konstruksi yang andal.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Irigasi', 'Bendungan', 'Waduk', 'Sungai & Pantai', 'Irigasi Rawa', 'Air Tanah', 'Air Baku', 'Pengendalian Banjir'].map((service, i) => (
            <div key={i} className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border-t-4 border-t-transparent hover:border-t-secondary hover:-translate-y-1">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/5 transition-colors">
                <div className="w-6 h-6 border-2 border-secondary rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
              </div>
              <h3 className="font-bold text-lg text-primary mb-3">{service}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Perencanaan dan Supervisi teknis terpadu berstandar SNI.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proyek Terbaru */}
      <section className="py-24 px-6 md:px-12 bg-primary text-white w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="text-secondary-light font-bold tracking-widest uppercase text-sm mb-3">Portofolio</div>
              <h2 className="text-4xl font-serif font-bold">Proyek Unggulan Terbaru</h2>
            </div>
            <a href="#" className="text-white hover:text-secondary-light font-medium flex items-center gap-2 transition-colors">
              Lihat Semua Proyek &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestProjects.docs.length > 0 ? (
              latestProjects.docs.map((project: any) => (
                <div key={project.id} className="bg-primary-light rounded-xl overflow-hidden group cursor-pointer">
                  <div className="h-48 bg-slate-800 relative overflow-hidden">
                    {/* Jika tidak ada gambar, tampilkan pattern/warna solid */}
                    <div className="absolute inset-0 bg-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                      <span className="text-slate-500 font-serif">Tak Ada Foto</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex gap-2 mb-4">
                      <span className="bg-primary text-xs font-bold px-3 py-1 rounded-full text-secondary-light border border-secondary/20">{project.tahun}</span>
                      {project.provinsi && <span className="bg-primary text-xs font-bold px-3 py-1 rounded-full text-slate-300 border border-slate-700">{project.provinsi}</span>}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-secondary-light transition-colors">{project.nama}</h3>
                    <p className="text-slate-400 text-sm">{project.klien}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 border border-dashed border-slate-700 rounded-xl">
                <p className="text-slate-400">Belum ada data proyek. Silakan tambahkan proyek di Admin Panel.</p>
              </div>
            )}
          </div>
        </div>
      </section>


    </div>
  )
}
