import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'divisi', 'jabatan'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'divisi',
      type: 'select',
      required: true,
      options: [
        'Ahli Irigasi',
        'Ahli Geoteknik',
        'Ahli Lingkungan',
        'Ahli Sungai & Pantai',
        'Ahli Bendungan',
        'Ahli Air Tanah',
        'Manajerial',
        'Lainnya'
      ],
    },
    {
      name: 'jabatan',
      type: 'text',
      required: true,
    },
    {
      name: 'keahlian',
      type: 'array',
      fields: [
        {
          name: 'namaKeahlian',
          type: 'text',
          required: true,
        }
      ]
    },
    {
      name: 'pengalaman',
      type: 'richText',
    },
    {
      name: 'pendidikan',
      type: 'array',
      fields: [
        {
          name: 'institusi',
          type: 'text',
          required: true,
        },
        {
          name: 'gelar',
          type: 'text',
        },
        {
          name: 'tahunLulus',
          type: 'text',
        }
      ]
    },
  ],
}
