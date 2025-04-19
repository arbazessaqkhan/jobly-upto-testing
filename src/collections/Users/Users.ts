import type { CollectionConfig } from 'payload'
import { COMMON_COLUMN_FIELDS } from '../Common-fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from '../Jobs/hooks/jobsBeforeChange.hook'


export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    // components: {
    //   Description: '/collections/Users/ui/ButtonComponent',
    //   afterList: '/collections/Users/ui/ButtonComponent',
    //   edit: {
    //     SaveButton: '/collections/Users/ui/ButtonComponent'
    //   }
    // }

  },
  auth: true,
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
      name: 'active',
      label: 'Is Active',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'Mark as active',
      type: 'ui',
      admin: {
        components: {
          Cell:'/collections/Users/ui/ButtonComponent',
          // Field: '' 
          Field: '/collections/Users/ui/ButtonComponent'
        }
      }
    },
    ...COMMON_COLUMN_FIELDS
  ],
  
  timestamps: true,
  hooks: {
      beforeChange: [commonCollectionBeforeChangeCreatedByUpdatedByHook],
    }
}
