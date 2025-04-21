// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/Users'
import { Media } from './collections/Media'
import { Jobs } from './collections/Jobs/Jobs'
import { JobApplications } from './collections/JobApplications'
import { Assessments } from './collections/Assessments'
import { Questions } from './collections/Questions'
import { Settings } from './app/globals/Settings'
import { JobsEndpoint } from './collections/Jobs/endpoints/jobs.endpoints'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // components: {
    //   graphics: {
    //     Logo: '/collections/Users/ui/ButtonComponent',
    //   }
    // }
  },
  collections: [Users, Media, Jobs, JobApplications, Assessments, Questions],
  globals: [Settings],
  hooks: {
    afterError:[async ({ error }) => console.error('root level hook',error),

    ]
  },
  endpoints: [JobsEndpoint],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
