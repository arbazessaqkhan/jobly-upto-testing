import type { CollectionConfig } from 'payload'


export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
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
          Cell:'/ButtonComponent',
          // Field: '' 
        }
      }
    }
  ],
}
