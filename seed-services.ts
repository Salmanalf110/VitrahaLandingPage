import 'dotenv/config'
import { getPayload } from 'payload'
import config from './src/payload.config'

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const services = [
    {
      namaLayanan: 'Teknik Irigasi',
      kategori: 'SDA',
      deskripsiUmum: 'Layanan perencanaan dan pengawasan untuk sistem irigasi permukaan, irigasi rawa, maupun irigasi air tanah guna mendukung ketahanan pangan dan pengelolaan air pertanian yang efisien.',
      lingkupPerencanaan: {
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
              children: [{ type: 'text', text: 'Perencanaan teknis (SID), analisis hidrologi, desain saluran primer/sekunder, dan pemodelan efisiensi air.', version: 1, mode: 'normal' }]
            }
          ]
        }
      },
      lingkupSupervisi: {
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
              children: [{ type: 'text', text: 'Pengawasan konstruksi bendung, saluran, bangunan bagi/sadap, serta memastikan mutu material dan kesesuaian gambar desain.', version: 1, mode: 'normal' }]
            }
          ]
        }
      }
    },
    {
      namaLayanan: 'Bendungan & Waduk',
      kategori: 'SDA',
      deskripsiUmum: 'Penyediaan layanan teknis untuk pembangunan bendungan besar maupun embung yang berfungsi sebagai pengendali banjir, penyedia air baku, dan irigasi.',
      lingkupPerencanaan: {
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
              children: [{ type: 'text', text: 'Desain tubuh bendungan, pelimpah (spillway), bangunan pengelak, serta kajian analisis resiko dan instrumentasi bendungan.', version: 1, mode: 'normal' }]
            }
          ]
        }
      },
      lingkupSupervisi: {
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
              children: [{ type: 'text', text: 'Supervisi pelaksanaan konstruksi tanah/beton bendungan, instalasi instrumen keamanan bendungan, dan proses impounding.', version: 1, mode: 'normal' }]
            }
          ]
        }
      }
    },
    {
      namaLayanan: 'Sungai & Pantai',
      kategori: 'SDA',
      deskripsiUmum: 'Keahlian dalam normalisasi sungai, perlindungan tebing, dan rekayasa pantai untuk memitigasi bencana erosi dan banjir.',
      lingkupPerencanaan: {
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
              children: [{ type: 'text', text: 'Pemodelan hidrodinamika, desain tanggul sungai (revetment), breakwater, groin, dan masterplan pengendalian banjir.', version: 1, mode: 'normal' }]
            }
          ]
        }
      },
      lingkupSupervisi: {
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
              children: [{ type: 'text', text: 'Pengawasan pekerjaan pengerukan, pemasangan bronjong, sheet pile, dan infrastruktur penahan ombak.', version: 1, mode: 'normal' }]
            }
          ]
        }
      }
    },
    {
      namaLayanan: 'Geoteknik',
      kategori: 'Geoteknik',
      deskripsiUmum: 'Penyelidikan dan analisis mekanika tanah dan batuan sebagai fondasi dasar kelayakan keamanan semua infrastruktur sipil.',
      lingkupPerencanaan: {
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
              children: [{ type: 'text', text: 'Boring test, analisis stabilitas lereng, desain pondasi dalam/dangkal, dan mitigasi likuifaksi.', version: 1, mode: 'normal' }]
            }
          ]
        }
      },
      lingkupSupervisi: {
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
              children: [{ type: 'text', text: 'Pengawasan pengeboran, uji sondir/CPT di lapangan, serta evaluasi hasil uji laboratorium tanah.', version: 1, mode: 'normal' }]
            }
          ]
        }
      }
    }
  ]

  for (const svc of services) {
    await payload.create({
      collection: 'services',
      // @ts-ignore
      data: svc,
    })
  }

  console.log('Seeding selesai!')
  process.exit(0)
}

seed().catch(console.error)
