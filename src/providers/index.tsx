'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { NhostProvider } from "@nhost/nextjs"
import { nhost } from '../lib/nhost'
import { SidebarProvider } from '@/components/ui/sidebar'

interface ProviderProps {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <NhostProvider nhost={nhost}>
      <ClerkProvider>
        <SidebarProvider>

          {children}
        </SidebarProvider>
      </ClerkProvider>
    </NhostProvider>
  )
}

export default Provider 