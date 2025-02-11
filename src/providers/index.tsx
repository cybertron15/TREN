'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { NhostProvider } from "@nhost/nextjs"
import { nhost } from '../lib/nhost'

interface ProviderProps {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <NhostProvider nhost={nhost}>
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </NhostProvider>
  )
}

export default Provider 