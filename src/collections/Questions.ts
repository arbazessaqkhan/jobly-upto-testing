import type { CollectionConfig } from 'payload'
import { COMMON_COLUMN_FIELDS } from './Common-fields'
import { commonCollectionBeforeChangeCreatedByUpdatedByHook } from './Jobs/hooks/jobsBeforeChange.hook'
import { User } from '@/payload-types';
import { Where } from 'payload';


export const Questions: CollectionConfig = {
  slug: 'questions',
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
        // move to next question
        name: 'duration',
        label: 'Duration (in minutes)',
        type: 'number',

    },

    {
        name: 'questionType',
        label: 'Question Type',
        type: 'select',
        options: [
            {
                label: 'Multiple Choice',
                value: 'mcq'
            },
            {
                label: 'Essay',
                value: 'essay'
            },
            
        ],
      
    },
    {
        name: 'options',
        label: 'Options',
        type: 'array',
        fields: [
            {
                name: 'option',
                label: 'Option',
                type: 'text'
            },
            {
                name: 'isCorrect',
                label: 'Is Correct?',
                type: 'checkbox'
            },
            
        ],
        admin: {
            condition: (data) => data.questionType === 'mcq'
        }
          
    },
    {
        name: 'response',
        label: 'Response',
        type: 'textarea',
        admin: {
            condition: (data) => data.questionType === 'essay'
        }
    },
    
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
          if(user?.role === 'admin'){
            return true
          }
          else if(user?.role === 'question-manager1' || user?.role === 'question-manager2'){
            const where: Where = {
              createdBy: {
                equals: user?.id
            }
            
          }
          return where
          }
          return false
        },
    
        create: ({req}) => {
          //read by admins and application managers
          const user: User | null = req?.user;
          if(user?.role === 'admin'){
            return true
          }
          else if(user?.role === 'question-manager1' || user?.role === 'question-manager2'){
            const where: Where = {
              createdBy: {
                equals: user?.id
            }
            
          }
          return where
          }
          return false

        }
          ,
        
          update: ({req}) => {
            //read by admins and application managers
            const user: User | null = req?.user;
          if(user?.role === 'admin'){
            return true
          }
          else if(user?.role === 'question-manager1' || user?.role === 'question-manager2'){
            const where: Where = {
              createdBy: {
                equals: user?.id
            }
            
          }
          return where
          }
          return false 
        },
          
          delete: ({req}) => {
            //read by admins and application managers
            const user: User | null = req?.user;
            return user?.role === 'admin' 
    
      }
    
      }
}
