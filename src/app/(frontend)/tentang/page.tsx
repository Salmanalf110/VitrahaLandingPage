import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Helper untuk mengambil teks murni dari Lexical RichText (Pengalaman)
function extractLexicalText(lexicalData: any): string {
  if (!lexicalData || !lexicalData.root) return '';
  let text = '';
  function traverse(node: any) {
    if (node.type === 'text') text += node.text + ' ';
    if (node.children) node.children.forEach(traverse);
  }
  traverse(lexicalData.root);
  return text.trim();
}

export default async function TentangPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Ambil Data Profil Perusahaan (untuk visi misi dll nanti)
  const companyProfile = await payload.findGlobal({
    slug: 'company-profile',
  })

  // Ambil data tim
  const teamQuery = await payload.find({
    collection: 'team-members',
    limit: 100,
  })

  // Kelompokkan data tim berdasarkan divisi
  const teamByDivision: Record<string, any[]> = {}
  
  // Urutan divisi yang diinginkan
  const divisionOrder = [
    'Manajerial',
    'Ahli Bendungan',
    'Ahli Irigasi',
    'Ahli Sungai & Pantai',
    'Ahli Geoteknik',
    'Ahli Lingkungan',
    'Ahli Air Tanah',
    'Lainnya'
  ]

  // Inisialisasi struktur
  divisionOrder.forEach(div => teamByDivision[div] = [])

  // Memasukkan data ke dalam grup
  teamQuery.docs.forEach((member: any) => {
    const div = member.divisi || 'Lainnya'
    if (!teamByDivision[div]) teamByDivision[div] = []
    teamByDivision[div].push(member)
  })

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">


      {/* Hero Section Tentang Kami */}
      <div className="bg-slate-900 text-white py-20 px-6 md:px-12 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-blend-overlay bg-black/70">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Tentang Kami</h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Lebih dari dua dekade mendedikasikan keahlian teknik untuk pembangunan infrastruktur sumber daya air berkelanjutan di Indonesia.
          </p>
        </div>
      </div>

      <main className="flex-1 w-full">
        {/* Sejarah, Visi, Misi */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Kisah Kami</div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Membangun Kepercayaan Sejak Dua Dekade Silam</h2>
              <div className="text-slate-600 leading-relaxed space-y-4">
                {companyProfile?.sejarah ? (
                  <div dangerouslySetInnerHTML={{ __html: extractLexicalText(companyProfile.sejarah) }} />
                ) : (
                  <p>Berdiri dengan dedikasi penuh terhadap rekayasa teknik sumber daya air, PT Vitraha Consindotama telah berevolusi menjadi mitra strategis pemerintah dan swasta dalam merancang infrastruktur yang tidak hanya fungsional, tetapi juga berkelanjutan dan berwawasan lingkungan.</p>
                )}
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-secondary">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Visi</h3>
                <div className="text-slate-600 leading-relaxed italic">
                  "{extractLexicalText(companyProfile?.visi) || 'Menjadi perusahaan konsultan teknik terdepan yang berkontribusi nyata pada pengelolaan sumber daya air berkelanjutan di Indonesia.'}"
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-primary">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Misi</h3>
                <div className="text-slate-600 leading-relaxed">
                  {extractLexicalText(companyProfile?.misi) ? (
                    <div dangerouslySetInnerHTML={{ __html: extractLexicalText(companyProfile.misi) }} />
                  ) : (
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Menyelenggarakan layanan konsultansi dengan standar kualitas tinggi dan inovasi rekayasa.</li>
                      <li>Mengembangkan keahlian SDM secara berkelanjutan.</li>
                      <li>Mengedepankan prinsip kelestarian lingkungan dalam setiap desain infrastruktur.</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sertifikat & Legalitas */}
        <section className="py-24 px-6 md:px-12 bg-primary text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-secondary-light font-bold tracking-widest uppercase text-sm mb-3">Legalitas & Sertifikasi</div>
              <h2 className="text-4xl font-serif font-bold mb-6">Bukti Kompetensi & Standar Mutu</h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-lg">Setiap langkah kami dikawal oleh sertifikasi resmi dan pengakuan standar mutu industri.</p>
            </div>
            
            {/* Untuk sementara, tampilkan grid statis jika belum ada query Sertifikat */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map((i) => (
                <div key={i} className="bg-white/10 rounded-xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-secondary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <h4 className="font-bold text-sm">Sertifikat ISO {9001 + i}</h4>
                  <p className="text-xs text-slate-300 mt-1">Sistem Manajemen</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
               <p className="text-sm text-slate-300 italic">*Daftar sertifikat aktual dapat diunggah melalui Admin Panel.</p>
            </div>
          </div>
        </section>

        {/* Bagian Inti: Our Team (Tahap 5) */}
        <section className="py-24 px-6 md:px-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Tim Ahli Kami</div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">Konsultan Kompeten Berpengalaman</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Didukung oleh tenaga ahli tersertifikasi dari berbagai disiplin ilmu teknik untuk memastikan standar kualitas terbaik.</p>
            </div>

            {/* Iterasi Grup Divisi */}
            <div className="space-y-20">
              {divisionOrder.map((division) => {
                const members = teamByDivision[division]
                if (members.length === 0) return null // Jangan tampilkan divisi yang kosong

                return (
                  <div key={division}>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-8 border-b-2 border-slate-200 pb-2 inline-block">
                      {division}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                      {members.map((member) => (
                        <div key={member.id} className="relative group overflow-hidden rounded-xl bg-white shadow-md border border-slate-200 cursor-pointer">
                          
                          {/* Kondisi Normal (Base Card) */}
                          <div className="aspect-[3/4] relative bg-slate-100 flex flex-col items-center justify-center">
                            {member.foto && typeof member.foto === 'object' && member.foto.url ? (
                              <Image 
                                src={member.foto.url} 
                                alt={member.nama} 
                                fill 
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                              />
                            ) : (
                              // Placeholder Siluet jika tidak ada foto
                              <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-400">
                                <svg className="w-24 h-24 mb-4 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                              </div>
                            )}
                            
                            {/* Gradien Overlay bawah */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-90"></div>
                            
                            {/* Teks Informasi Dasar (Nama & Jabatan) */}
                            <div className="absolute bottom-0 left-0 w-full p-5 text-white transform group-hover:translate-y-4 group-hover:opacity-0 transition-all duration-300">
                              <h4 className="font-bold text-lg leading-tight">{member.nama}</h4>
                              <p className="text-secondary-light text-sm mt-1">{member.jabatan}</p>
                            </div>
                          </div>

                          {/* Kondisi Hover (Lapisan Interaktif Muncul ke Atas) */}
                          <div className="absolute inset-0 bg-primary/95 text-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col">
                            <h4 className="font-bold text-lg text-secondary-light mb-1">{member.nama}</h4>
                            <p className="text-xs text-slate-300 mb-6 pb-4 border-b border-white/20">{member.jabatan}</p>
                            
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                              {/* Pendidikan */}
                              {member.pendidikan && member.pendidikan.length > 0 && (
                                <div className="mb-5">
                                  <div className="font-semibold text-xs mb-2 uppercase tracking-wider text-slate-400">Pendidikan</div>
                                  <ul className="text-sm space-y-2 text-slate-200">
                                    {member.pendidikan.map((p: any, i: number) => (
                                      <li key={i} className="leading-snug">
                                        <span className="block font-medium">{p.gelar || ''} {p.institusi}</span>
                                        <span className="text-xs text-slate-400">{p.tahunLulus}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {/* Keahlian Khusus */}
                              {member.keahlian && member.keahlian.length > 0 && (
                                <div>
                                  <div className="font-semibold text-xs mb-2 uppercase tracking-wider text-slate-400">Keahlian Khusus</div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {member.keahlian.map((k: any, i: number) => (
                                      <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs text-slate-200">
                                        {k.namaKeahlian}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            
            {teamQuery.docs.length === 0 && (
              <div className="text-center py-20 border border-dashed border-slate-300 rounded-xl">
                <p className="text-slate-500 mb-4">Belum ada data anggota tim.</p>
                <Link href="/admin/collections/team-members" target="_blank" className="text-secondary hover:text-secondary-light font-medium underline">
                  Tambahkan Anggota Tim di Admin Panel
                </Link>
              </div>
            )}
            
          </div>
        </section>
      </main>
      

    </div>
  )
}
