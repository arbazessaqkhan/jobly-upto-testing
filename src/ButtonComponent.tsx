'use client'
import React, { useEffect } from 'react'
import { DefaultCellComponentProps } from 'payload'

const ButtonComponent: React.FC<DefaultCellComponentProps> = (props: DefaultCellComponentProps) => {

  function markActive() {
      //send a patch req to server /api/users/user_id
    //   useEffect(()=> {
        
    //   })
      const { id, ...rest } = props.rowData
      const url = `/api/users/${id}`
      const data = {
        ...rest,
        active: true
      }
      const options = {
        method: 'PATCH',
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
    <button type="button" onClick={markActive}>
      Mark as Active
    </button>
  )
}

export default ButtonComponent
