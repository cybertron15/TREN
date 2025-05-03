"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function LogoDisplay() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image width={16} alt="logo" height={16} src={"/logo/logo.png"} className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">TrenAi</span>
                <span className="truncate text-xs">Standard</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
