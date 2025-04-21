import type { CollectionConfig } from 'payload'
import { COMMON_COLUMN_FIELDS } from './Common-fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'
import { User } from '@/payload-types'


export const Assessments: CollectionConfig = {
  slug: 'assessments',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      // required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',

    },
    {
        name: 'job',
        label: 'Job',
        type: 'relationship',
        relationTo: 'jobs',

    },
    {
        name: 'questions',
        label: 'Questions',
        type: 'relationship',
        relationTo: 'questions',
        hasMany: true,
        hooks: {
          // takes only one argument
          afterRead: [({data, ...rest})=>{
            console.log(data)
          }],
          beforeChange: []
        }
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
    },
    access: {
    read: ({req}) => {
      //read by admins and application managers
      const user: User | null = req?.user;
      return user?.role === 'admin' || user?.role === 'assessment-manager' 
    },

    create: ({req}) => {
      //read by admins and application managers
      const user: User | null = req?.user;
      return user?.role === 'admin' || user?.role === 'assessment-manager' },
    
      update: ({req}) => {
        //read by admins and application managers
        const user: User | null = req?.user;
        return user?.role === 'admin' || user?.role === 'assessment-manager' },
      
      delete: ({req}) => {
        //read by admins and application managers
        const user: User | null = req?.user;
        return user?.role === 'admin' 

  }

  }
}
