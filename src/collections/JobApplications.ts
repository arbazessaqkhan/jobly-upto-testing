import type { CollectionConfig } from 'payload'
import { COMMON_COLUMN_FIELDS } from './Common-fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'


export const JobApplications: CollectionConfig = {
  slug: 'job_applications',
  admin: {
    useAsTitle: 'name',
    
  },
  labels: {
    singular: 'Job Application',
    // plural name will reflect
    plural: 'Job Applications'
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      // required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',

    },
    {
        name: 'job',
        label: 'Job',
        type: 'relationship',
        relationTo: 'jobs',

    },
    {
        name: 'cv',
        label: 'CV',
        type: 'upload',
        relationTo: 'media'
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
            {
                label: 'Applied',
                value: 'applied'
            },
            {
                label: 'Interviewing',
                value: 'interviewing'
            },
            {
                label: 'Hired',
                value: 'hired'
            },
            {
                label: 'Rejected',
                value: 'rejected',
            },
        ]
    }
    ,
    ...COMMON_COLUMN_FIELDS
  ],
  timestamps: true,
  
  hooks: {
      beforeChange: [commonCollectionBeforeChangeCreatedByUpdatedByHook],
    }

}
