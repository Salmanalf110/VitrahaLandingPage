import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import JobApplicationForm from './JobApplicationForm'
import { notFound } from 'next/navigation'

export default async function JobDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const jobId = params.id

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let job: any = null
  try {
    job = await payload.findByID({
      collection: 'job-postings',
      id: jobId,
    })
  } catch (error) {
    notFound()
  }

  if (!job || !job.statusAktif) {
    notFound()
  }

  return (
    <div className="flex flex-col font-sans bg-slate-50 min-h-screen">
      <div className="bg-primary py-16 px-6 md:px-12 text-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/karir" className="text-secondary-light hover:text-white flex items-center gap-2 mb-8 text-sm font-medium transition-colors w-max">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Daftar Lowongan
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{job.judul}</h1>
          <div className="flex flex-wrap items-center gap-6 text-primary-light">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {job.lokasi}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Diterbitkan: {new Date(job.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Deskripsi Pekerjaan (Kiri) */}
          <div className="w-full lg:w-3/5 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Detail Pekerjaan</h2>
            
            <div className="prose prose-slate max-w-none text-slate-600">
              {job.deskripsi?.root?.children.map((node: any, idx: number) => {
                if (node.type === 'paragraph') {
                  return <p key={idx} className="mb-4">{node.children?.map((c: any) => c.text).join('')}</p>
                }
                if (node.type === 'heading') {
                  const H = node.tag as keyof JSX.IntrinsicElements
                  return <H key={idx} className="font-bold text-slate-800 mt-8 mb-4">{node.children?.map((c: any) => c.text).join('')}</H>
                }
                if (node.type === 'list') {
                  const ListTag = node.listType === 'number' ? 'ol' : 'ul'
                  const listClass = node.listType === 'number' ? 'list-decimal' : 'list-disc'
                  return (
                    <ListTag key={idx} className={`${listClass} pl-5 mb-6 space-y-2`}>
                      {node.children.map((li: any, liIdx: number) => (
                        <li key={liIdx}>{li.children?.map((c: any) => c.text).join('')}</li>
                      ))}
                    </ListTag>
                  )
                }
                return null;
              })}
            </div>
          </div>

          {/* Form Lamaran (Kanan) */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-8">
            <JobApplicationForm jobId={job.id} />
          </div>

        </div>
      </main>
    </div>
  )
}
