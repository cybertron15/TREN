"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function LogoDisplay() {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-red-500 data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image width={30} alt="logo" height={30} src={"/logo/logo.png"} className="size-8 mb-1" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <p className="truncate font-lg">TrenAi</p>
                <p className="truncate text-xs">Standard</p>
              </div>
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
