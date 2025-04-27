import React from 'react'
import './styles.css'
import Header from '@/libs/layout/header'
import { Toaster } from 'sonner'


export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ paddingTop: '6rem' }}>{children}</main>
        <Toaster richColors/>
      </body>
    </html>
  )
}
