'use client'
import React, { useEffect } from 'react'
import { DefaultCellComponentProps } from 'payload'
import {useDocumentInfo} from "@payloadcms/ui"
import { Button } from '../../../libs/shadcn/components/ui/button'


const ButtonComponent: React.FC<DefaultCellComponentProps> = (props) => {

    const {id, initialData} = useDocumentInfo();

    //props.rowData for cell and initialData for field/edit mode //y id for for rowData or data respectively
    const fieldOrCellData = props.rowData || initialData;

    useEffect(()=>{
        console.log("props:",id, fieldOrCellData)
    })

  function markActive() {
      //send a patch req to server /api/users/user_id
    //   useEffect(()=> {
        
    //   })
      const { id, ...rest } = fieldOrCellData
      const url = `/api/users/${id}`
      const data = {
        ...rest,
        active: true
      }
      const options = {
        method: 'PATCH',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch(url, options).then(
        response => {
            if(!response.ok){
                throw new Error("n/w res not ok")
            }
            return response.json()
        }
      ).then(data=> {
        console.log('success:', data)
        window.location.reload();
      }).catch(error=> {
        console.log('error:', error)
      })

      
  }

  return (
    <Button type="button" onClick={markActive}>
      Mark as Active
    </Button>
  )
}

export default ButtonComponent
