import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'namaLayanan',
    defaultColumns: ['namaLayanan', 'kategori'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'namaLayanan',
      type: 'text',
      required: true,
      label: 'Nama Layanan (Contoh: Irigasi, Bendungan)',
    },
    {
      name: 'kategori',
      type: 'select',
      options: [
        { label: 'Sumber Daya Air', value: 'SDA' },
        { label: 'Geoteknik', value: 'Geoteknik' },
        { label: 'Lingkungan', value: 'Lingkungan' },
        { label: 'Lainnya', value: 'Lainnya' },
      ],
      required: true,
      defaultValue: 'SDA',
    },
    {
      name: 'deskripsiUmum',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Singkat',
    },
    {
      name: 'lingkupPerencanaan',
      type: 'richText',
      label: 'Lingkup Pekerjaan Perencanaan (Planning/Design)',
    },
    {
      name: 'lingkupSupervisi',
      type: 'richText',
      label: 'Lingkup Pekerjaan Supervisi (Construction Supervision)',
    },
  ],
}
