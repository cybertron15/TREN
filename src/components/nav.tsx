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
import { useState } from "react"

export function Nav({
  items,
}: {
  items: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {

  const [selected, setselected] = useState("Dashboard")

  return (
    <SidebarGroup >
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton onClick={()=>setselected(item.name)} className={`${selected === item.name && "bg-sidebar-accent"}`} asChild>
              <a href={item.url} className={`flex items-center`}>
                <item.icon style={{width:"18px",height:"18px"}} className={`${selected === item.name && "text-sidebar-accent-foreground"}`}/>
                <span className={`font-medium mt-0.5 ${selected === item.name && "text-sidebar-accent-foreground"}`}>{item.name}</span>
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
