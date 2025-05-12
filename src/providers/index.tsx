'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { NhostProvider } from "@nhost/nextjs"
import { nhost } from '../lib/nhost'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from 'next-themes'

interface ProviderProps {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider enableSystem>
      <NhostProvider nhost={nhost}>
        <ClerkProvider>
          <SidebarProvider>

            {children}
          </SidebarProvider>
        </ClerkProvider>
      </NhostProvider>
    </ThemeProvider>
  )
}

export default Provider 