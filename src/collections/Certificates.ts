import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  admin: {
    useAsTitle: 'namaSertifikat',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'namaSertifikat',
      type: 'text',
      required: true,
    },
    {
      name: 'fileDokumen',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Gambar/Dokumen Sertifikat',
    },
    {
      name: 'tanggalTerbit',
      type: 'date',
    },
  ],
}
