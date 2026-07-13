import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Helper untuk mengambil teks murni dari Lexical
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

export default async function KontakPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const companyProfile = await payload.findGlobal({
    slug: 'company-profile',
  })

  const alamat = extractLexicalText(companyProfile?.alamatKantor) || 'Alamat belum diatur.'
  const email = companyProfile?.kontakEmail || 'info@vitraha.com'
  const telepon = companyProfile?.kontakTelepon || '(021) 12345678'
  // Gunakan peta default Monas jika linkPeta tidak diisi
  const petaUrl = companyProfile?.linkPeta || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009623838!2d106.7408892556534!3d-6.229746499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta!5e0!3m2!1sid!2sid!4v1689139828888!5m2!1sid!2sid'

  return (
    <div className="flex flex-col font-sans">
      <div className="bg-slate-900 text-white py-20 px-6 md:px-12 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-blend-overlay bg-black/70">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Hubungi Kami</h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Mari berkolaborasi membangun infrastruktur masa depan. Tim kami siap membantu memberikan solusi rekayasa terbaik untuk proyek Anda.
          </p>
        </div>
      </div>

      <main className="flex-1 py-20 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Informasi Kontak */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Informasi Kantor</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Alamat</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{alamat}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Email</h4>
                    <a href={`mailto:${email}`} className="text-secondary hover:text-secondary-light font-medium text-sm transition-colors">{email}</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Telepon</h4>
                    <a href={`tel:${telepon}`} className="text-secondary hover:text-secondary-light font-medium text-sm transition-colors">{telepon}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Peta */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[400px]">
              <iframe 
                src={petaUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Kirim Pesan</h3>
              <form action={`mailto:${email}`} method="GET" encType="text/plain" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap</label>
                    <input type="text" className="w-full border border-slate-300 rounded-md py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Instansi/Perusahaan</label>
                    <input type="text" className="w-full border border-slate-300 rounded-md py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="PT Contoh" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Pesan Anda</label>
                  <textarea name="body" rows={4} className="w-full border border-slate-300 rounded-md py-3 px-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all" placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>
                <button type="submit" className="bg-secondary hover:bg-secondary-light text-white py-3 px-8 rounded font-bold tracking-wide transition-colors shadow-lg shadow-secondary/30">
                  Kirim via Aplikasi Email
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
