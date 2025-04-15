import type { CollectionConfig } from 'payload'
import { Where } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'created_at'],
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
                  }
                },
                {
                  name: 'description',
                  type: 'richText',
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
    }
    ,

    
    //collapsible
    {
      label: 'group',
      type: 'collapsible',
      fields: [
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'salary',
          type: 'number',
          required: true,  
        },
      ]
    },
    {
      name: 'created_at',
      type: 'date',
      defaultValue: () => new Date(),
      // changing using admin to day and time also
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        }
    }
  },
  //relationship
  {
    name: 'author',
    label: 'Author',
    type: 'relationship',
    relationTo: 'users',
    hasMany: true,
    filterOptions: (params) => {
      // console.log(params)
        const query: Where = {
          active: {
            equals: true
          }
        }
        return query
    }
  }
  ],
}
