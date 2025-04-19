
import { Field } from "payload";

export const COMMON_COLUMN_FIELDS: Field[] = [
    // {
    //     name: 'createdAt',
    //     label: 'Created At',
    //     type: 'date',
    //     // defaultValue: () => new Date(), set by server no default val
    //     // changing using admin to day and time also
    //     admin: {
    //       date: {
    //         pickerAppearance: 'dayAndTime'
    //       }
    //   }
    // },
    //   {
    //     name: 'updatedAt',
    //     label: 'Updated At',
    //     type: 'date',

    //     // changing using admin to day and time also
    //     admin: {
    //       date: {
    //         pickerAppearance: 'dayAndTime'
    //       }
    //   }
    //   },
    //relationship
    {
      name: 'createdBy',
      label: 'Created By',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        readOnly: true,
        //show only whenever present
        condition: (data) => data?.createdBy !== undefined
      }
    },
    {
      name: 'updatedBy',
      label: 'Updated By',
      type: 'relationship',      relationTo: 'users',
      hasMany: false,
      admin: {
        readOnly: true,
        condition: (data) => data?.updatedBy !== undefined
      }
    }
]