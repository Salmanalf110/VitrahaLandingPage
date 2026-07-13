import { postgresAdapter } from '@payloadcms/db-postgres'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { TeamMembers } from './collections/TeamMembers'
import { Certificates } from './collections/Certificates'
import { JobPostings } from './collections/JobPostings'
import { JobApplications } from './collections/JobApplications'
import { Services } from './collections/Services'
import { CompanyProfile } from './globals/CompanyProfile'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects, TeamMembers, Certificates, JobPostings, JobApplications, Services],
  globals: [CompanyProfile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    }
  }),
  sharp,
  localization: {
    locales: ['en'],
    fallback: true,
    defaultLocale: 'en',
  },
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
