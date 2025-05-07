import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn/components/ui/tabs'

import config from '@/payload.config'
// import './styles.css'
import ButtonTab from '@/app/(frontend)/tabs/ButtonTab'
import IconTab from '@/app/(frontend)/tabs/IconTab'
import DialogTab from '@/app/(frontend)/tabs/DialogTab'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home mx-10">
      <Tabs defaultValue="button" className="w-full ">
        <TabsList>
          <TabsTrigger value="button">Button Components</TabsTrigger>
          <TabsTrigger value="icon">Icon Components</TabsTrigger>
          <TabsTrigger value="dialogs">Dialogs Components</TabsTrigger>
        </TabsList>
        <TabsContent value="button">
          <ButtonTab />
        </TabsContent>
        <TabsContent value="icon">
          <IconTab />
        </TabsContent>
        <TabsContent value="dialogs">
          <DialogTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}