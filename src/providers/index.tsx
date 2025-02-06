'use client'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { NhostProvider } from "@nhost/nextjs"
import { nhost } from '../lib/nhost'
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'

interface ProviderProps {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <NhostProvider nhost={nhost}>
        {children}
      </NhostProvider>
    </ClerkProvider>
  )
}

export default Provider 