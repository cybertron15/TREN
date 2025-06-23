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
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Nav({
  items,
}: {
  items: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname()
  const [selected, setselected] = useState<string>()
  useEffect(() => {
    console.log("selected", selected,pathname.split("/"),pathname.split("/")[0]);
    setselected(pathname.split("/")[1])
  }, [pathname])
  
  return (
    <SidebarGroup >
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton onClick={()=>setselected(item.name.toLowerCase())} className={`${selected === item.name.toLowerCase() && "bg-sidebar-accent"}`} asChild>
              <Link href={item.url} className={`flex items-center`}>
                <item.icon style={{width:"18px",height:"18px"}} className={`${selected === item.name && "text-sidebar-accent-foreground"}`}/>
                <span className={`font-medium mt-0.5 ${selected === item.name && "text-sidebar-accent-foreground"}`}>{item.name}</span>
              </Link>
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
