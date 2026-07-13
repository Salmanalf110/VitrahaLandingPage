import type { CollectionConfig } from 'payload'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  admin: {
    useAsTitle: 'namaPelamar',
    defaultColumns: ['namaPelamar', 'lowongan', 'tanggalLamar'],
  },
  access: {
    // Publik bisa create (melamar), tapi hanya admin yang bisa baca
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    // Sesuai request, admin hanya bisa baca (read-only), tidak bisa update/delete sembarangan
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user), // Boleh delete jika spam, atau bisa ubah ke false
  },
  fields: [
    {
      name: 'lowongan',
      type: 'relationship',
      relationTo: 'job-postings',
      required: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'namaPelamar',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'fileCV',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'tanggalLamar',
      type: 'date',
      admin: {
        readOnly: true,
      }
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.tanggalLamar = new Date().toISOString();
        }
        return data;
      }
    ]
  }
}
