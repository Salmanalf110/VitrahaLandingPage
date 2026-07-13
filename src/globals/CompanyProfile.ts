import type { GlobalConfig } from 'payload'

export const CompanyProfile: GlobalConfig = {
  slug: 'company-profile',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'profilSingkat',
      type: 'richText',
      required: true,
      label: 'Profil Singkat',
    },
    {
      name: 'sejarah',
      type: 'richText',
      label: 'Sejarah Perusahaan (Opsional)',
    },
    {
      name: 'visi',
      type: 'richText',
      required: true,
    },
    {
      name: 'misi',
      type: 'richText',
      required: true,
    },
    {
      name: 'kontakEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'kontakTelepon',
      type: 'text',
      required: true,
    },
    {
      name: 'alamatKantor',
      type: 'richText',
      required: true,
    },
    {
      name: 'linkPeta',
      type: 'text',
      label: 'Link Peta (Google Maps embed URL)',
    },
  ],
}
