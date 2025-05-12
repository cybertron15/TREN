"use client"

import {
  Settings,
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function Nav({
  items,
}: {
  items: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {

  return (
    <SidebarGroup >
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center">
                <item.icon className="" style={{width:"18px",height:"18px"}}/>
                <span className="font-medium mt-0.5">{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Settings className="" style={{width:"18px",height:"18px"}}/>
            <span className="font-medium mt-0.5">Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
