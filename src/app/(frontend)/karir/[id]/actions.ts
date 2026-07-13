'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function submitJobApplication(prevState: any, formData: FormData) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const jobId = formData.get('jobId') as string
    const namaPelamar = formData.get('namaPelamar') as string
    const email = formData.get('email') as string
    const file = formData.get('fileCV') as File
    
    // ANTI-SPAM: Honeypot Check
    // Bot biasanya akan mengisi semua kolom input yang ada di dalam form.
    // Kolom 'address_secondary' disembunyikan dari manusia, jadi jika ada isinya, pasti itu bot.
    const honeypot = formData.get('address_secondary') as string
    if (honeypot) {
      // Kita pura-pura sukses agar bot tidak mencoba cara lain
      return { success: true, message: 'Lamaran Anda berhasil dikirim! Kami akan menghubungi Anda segera.' }
    }

    if (!jobId || !namaPelamar || !email || !file || file.size === 0) {
      return { success: false, message: 'Harap isi semua kolom dan unggah CV Anda.' }
    }

    if (file.type !== 'application/pdf') {
      return { success: false, message: 'File CV harus berformat PDF.' }
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return { success: false, message: 'Ukuran file CV maksimal 5MB.' }
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 1. Upload File ke koleksi Media secara aman (bypassing access control karena server-side)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `CV ${namaPelamar}`,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    // 2. Buat rekaman Job Application
    await payload.create({
      collection: 'job-applications',
      data: {
        lowongan: jobId,
        namaPelamar,
        email,
        fileCV: media.id,
      },
    })

    return { success: true, message: 'Lamaran Anda berhasil dikirim! Kami akan menghubungi Anda segera.' }

  } catch (error) {
    console.error('Error submitting application:', error)
    return { success: false, message: 'Terjadi kesalahan sistem saat mengirim lamaran. Silakan coba lagi nanti.' }
  }
}
