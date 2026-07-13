import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'tahun', 'provinsi', 'jenisLayanan'],
  },
  access: {
    read: () => true, // Publik bisa melihat proyek
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      label: 'Nama Proyek',
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi Proyek',
    },
    {
      name: 'tahun',
      type: 'number',
      required: true,
      label: 'Tahun Proyek',
    },
    {
      name: 'provinsi',
      type: 'select',
      required: true,
      label: 'Provinsi',
      options: [
        'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Jambi', 'Sumatera Selatan',
        'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung', 'Kepulauan Riau',
        'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Banten',
        'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
        'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara',
        'Sulawesi Utara', 'Sulawesi Tengah', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Gorontalo', 'Sulawesi Barat',
        'Maluku', 'Maluku Utara',
        'Papua', 'Papua Barat', 'Papua Selatan', 'Papua Tengah', 'Papua Pegunungan', 'Papua Barat Daya'
      ],
    },
    {
      name: 'jenisLayanan',
      type: 'select',
      required: true,
      label: 'Jenis Layanan',
      options: [
        { label: 'Irigasi', value: 'irigasi' },
        { label: 'Bendungan', value: 'bendungan' },
        { label: 'Waduk', value: 'waduk' },
        { label: 'Sungai', value: 'sungai' },
        { label: 'Pantai', value: 'pantai' },
        { label: 'Irigasi Rawa', value: 'irigasi_rawa' },
        { label: 'Air Tanah', value: 'air_tanah' },
        { label: 'Air Baku', value: 'air_baku' },
      ],
    },
    {
      name: 'jenisPekerjaan',
      type: 'select',
      required: true,
      label: 'Jenis Pekerjaan',
      options: [
        { label: 'Perencanaan', value: 'perencanaan' },
        { label: 'Supervisi', value: 'supervisi' },
      ],
    },
    {
      name: 'klien',
      type: 'text',
      label: 'Klien',
    },
    {
      name: 'galeri',
      type: 'array',
      label: 'Galeri Foto Proyek',
      fields: [
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
