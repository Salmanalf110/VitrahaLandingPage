import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const jobs = [
    {
      judul: 'Senior Civil Engineer (Bendungan)',
      lokasi: 'Jakarta Pusat / Site Project',
      statusAktif: true,
      deskripsi: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                { type: 'text', text: 'Kami mencari Senior Civil Engineer yang berpengalaman dalam perencanaan dan supervisi proyek bendungan skala besar.', version: 1, mode: 'normal' }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              format: '',
              indent: 0,
              version: 1,
              children: [
                { type: 'text', text: 'Kualifikasi:', version: 1, mode: 'normal' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'listitem',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [{ type: 'text', text: 'Pendidikan minimal S1 Teknik Sipil / Pengairan.', version: 1, mode: 'normal' }]
                },
                {
                  type: 'listitem',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [{ type: 'text', text: 'Pengalaman minimal 7 tahun di proyek bendungan.', version: 1, mode: 'normal' }]
                },
                {
                  type: 'listitem',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [{ type: 'text', text: 'Memiliki SKA (Sertifikat Keahlian) Ahli Bendungan / Sumber Daya Air.', version: 1, mode: 'normal' }]
                }
              ]
            }
          ]
        }
      }
    },
    {
      judul: 'Drafter / CAD Operator',
      lokasi: 'Kantor Pusat - Jakarta',
      statusAktif: true,
      deskripsi: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                { type: 'text', text: 'Dibutuhkan segera Drafter berpengalaman untuk mendukung tim perencanaan teknis sumber daya air.', version: 1, mode: 'normal' }
              ]
            },
            {
              type: 'heading',
              tag: 'h3',
              format: '',
              indent: 0,
              version: 1,
              children: [
                { type: 'text', text: 'Kualifikasi:', version: 1, mode: 'normal' }
              ]
            },
            {
              type: 'list',
              listType: 'bullet',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'listitem',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [{ type: 'text', text: 'Lulusan SMK Pembangunan / D3 Teknik Sipil.', version: 1, mode: 'normal' }]
                },
                {
                  type: 'listitem',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [{ type: 'text', text: 'Mahir mengoperasikan AutoCAD (2D & 3D) dan Civil 3D.', version: 1, mode: 'normal' }]
                }
              ]
            }
          ]
        }
      }
    }
  ]

  for (const job of jobs) {
    await payload.create({
      collection: 'job-postings',
      // @ts-ignore
      data: job,
    })
  }

  console.log('Seeding jobs selesai!')
  process.exit(0)
}

seed().catch(console.error)
