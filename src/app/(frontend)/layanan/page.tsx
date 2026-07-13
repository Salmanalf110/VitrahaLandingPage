import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function LayananPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const servicesQuery = await payload.find({
    collection: 'services',
    limit: 100,
  })

  return (
    <div className="flex flex-col font-sans">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 px-6 md:px-12 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-blend-overlay bg-black/70">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Layanan Keahlian</h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Menyediakan solusi rekayasa terpadu, mulai dari tahap perencanaan teknis hingga supervisi konstruksi untuk menjamin keandalan infrastruktur.
          </p>
        </div>
      </div>

      <main className="flex-1 py-20 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {servicesQuery.docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesQuery.docs.map((service: any) => (
                <div key={service.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                  <div className="bg-primary p-6 text-white border-b-4 border-secondary">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-2xl font-serif font-bold">{service.namaLayanan}</h2>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">{service.kategori}</span>
                    </div>
                    <p className="text-slate-200 text-sm opacity-90 leading-relaxed">{service.deskripsiUmum}</p>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col gap-6 flex-1">
                    {/* Perencanaan */}
                    {service.lingkupPerencanaan && service.lingkupPerencanaan.root && service.lingkupPerencanaan.root.children.length > 0 && (
                      <div>
                        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          Tahap Perencanaan (Design)
                        </h3>
                        <div className="text-sm text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-100">
                          {service.lingkupPerencanaan.root.children.map((node: any, i: number) => {
                            if (node.type === 'paragraph') {
                              return <p key={i} className="mb-2">{node.children?.map((c: any) => c.text).join('')}</p>
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Supervisi */}
                    {service.lingkupSupervisi && service.lingkupSupervisi.root && service.lingkupSupervisi.root.children.length > 0 && (
                      <div>
                        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4V5a2 2 0 00-2-2H9a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-5" /></svg>
                          Tahap Supervisi (Construction)
                        </h3>
                        <div className="text-sm text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-100">
                          {service.lingkupSupervisi.root.children.map((node: any, i: number) => {
                            if (node.type === 'paragraph') {
                              return <p key={i} className="mb-2">{node.children?.map((c: any) => c.text).join('')}</p>
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">Data layanan belum tersedia. Silakan tambahkan di Admin Panel.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  )
}
