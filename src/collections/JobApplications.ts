import type { CollectionConfig } from 'payload'
import { COMMON_COLUMN_FIELDS } from './Common-fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'
import { User } from '@/payload-types';


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
      name: 'phone',
      label: 'Phone',
      type: 'text',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
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
    },
    access: {
      read: ({req}) => {
        //read by admins and application managers
        const user: User | null = req?.user;
        return user?.role === 'admin' || user?.role === 'application-manager' 
      },
  
      create: ({req}) => {
        //read by admins and application managers
        // const user: User | null = req?.user;
        return true },
      
        update: ({req}) => {
          //read by admins and application managers
          const user: User | null = req?.user;
          return user?.role === 'admin'
        },
        
        delete: ({req}) => {
          //read by admins and application managers
          const user: User | null = req?.user;
          return user?.role === 'admin' 
  
    }
  
    }

}
