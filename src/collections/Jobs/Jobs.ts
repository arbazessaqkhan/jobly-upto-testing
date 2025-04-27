import type {  CollectionConfig, FieldHook, FieldHookArgs } from 'payload'
import { COMMON_COLUMN_FIELDS } from '../Common-fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './hooks/jobsBeforeChange.hook'
import { Job, User } from '@/payload-types'
import { JobsEndpoint } from './endpoints/samplejobs.endpoints'
import { adminAndRoleAccess } from '@/access/adminAndRoleAccess'
import { isAdminOnlyAccess } from '@/access/isAdminOnlyAccess'
import { formJobEndpoint } from './endpoints/form.jobs.endpoints'


// const fieldLevelHook: FieldHook = async({data})=>{
//   if(data?.title){
//     data.title = data.title.toUpperCase() + ' field level hook' || data.title
//   }
//   console.log('field level',data)
//   // return data not return here max call stack error
// }

const converToSlug = (str: string) => {
  return str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '').replace(/[^\w-]/g, '')
}


const beforeChangeSlugFieldJobsHook: FieldHook = async(args: FieldHookArgs<Job>)=>{
  const {data} = args
  if (data?.title){
    data.slug = converToSlug(data.title)
  }
  
}

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  endpoints: [formJobEndpoint],
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'created_at'],
    //hide jobs for application manager
    hidden:({user}) => {
      return user?.role !== 'admin' && user?.role !== 'job-manager'
    }
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Basic info",
          description: "The basic information about the job",
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '30%'
                  },
                  // hooks: {
                  //   beforeChange: [fieldLevelHook]
                  // }
                  }
                ,
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ]
            },
            {
              name: 'location',
              type: 'select',
              options: [
                { label: 'Remote', value: 'remote' },
                { label: 'Hybrid', value: 'hybrid' },
                { label: 'On-Site', value: 'on-site' },
              ],

              
            },
          ]
        },
        {
          label: "Comments",
          description: "The comments about the job",
          fields: [
            {
              name: 'comments',
              type: 'array',
              fields: [
                {
                  name: 'author',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'comment',
                  type: 'richText',
                  required: true,
                }
              ],
              
            },
          ]
        }
      ],
    },
        //collapsible
        {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
        },
        {
              name: 'salary',
              type: 'number',
              required: true,  
              
              access: {
                  update: ({req}) => {
                    const user: User | null = req?.user;
                    return user?.role === 'admin'
                  }
                }
              
        },
        {
              name: 'slug',
              type: 'text',
              // required: true,
              hooks: {
                    beforeChange: [beforeChangeSlugFieldJobsHook]
                  },

              admin: {
                readOnly: true,
                condition: (data: Partial<Job>) => {
                  console.log('data:',data?.slug)
                  return !!data?.title
                  
                } 
              }

        },  

        ...COMMON_COLUMN_FIELDS
        
  ],
  
  timestamps: true,
  hooks: {
    beforeChange: [commonCollectionBeforeChangeCreatedByUpdatedByHook],
  },
  // endpoints: [JobsEndpoint],
  access: {
    read: adminAndRoleAccess('job-manager'),

    create: adminAndRoleAccess('job-manager'),
    
      update: adminAndRoleAccess('job-manager'),
      
      delete: isAdminOnlyAccess,

  }

}
