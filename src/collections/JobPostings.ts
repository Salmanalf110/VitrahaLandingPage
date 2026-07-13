import type { CollectionConfig } from 'payload'

export const JobPostings: CollectionConfig = {
  slug: 'job-postings',
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'lokasi', 'statusAktif'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Judul Pekerjaan',
    },
    {
      name: 'deskripsi',
      type: 'richText',
      required: true,
    },
    {
      name: 'lokasi',
      type: 'text',
      required: true,
    },
    {
      name: 'statusAktif',
      type: 'checkbox',
      defaultValue: true,
      label: 'Lowongan Masih Aktif',
    },
  ],
}
