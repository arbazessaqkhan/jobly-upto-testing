import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
        name: 'siteName',
        label: 'Site Name',
        type: 'text',
        required: true
    },
    {
        name: 'siteDescription',
        label: 'Site Description',
        type: 'text',
        required: true
    },
    {
        name: 'siteUrl',
        label: 'Site URL',
        type: 'text',
        required: true
    },
    {
        name: 'siteLogo',
        label: 'Site Logo',
        type: 'upload',
        relationTo: 'media',
        required: true
    }
  ],
}