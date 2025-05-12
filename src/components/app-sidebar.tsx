"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Lightbulb,
  NotebookText,
  PieChart,
} from "lucide-react"

import { Nav } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { LogoDisplay } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      name: "Planner",
      url: "#",
      icon: Lightbulb,
    },
    {
      name: "Journal",
      url: "#",
      icon: NotebookText,
    },
    {
      name: "Analytics",
      url: "#",
      icon: PieChart,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="dark: border-sidebar-border"  {...props}>
      <SidebarHeader>
        <LogoDisplay />
      </SidebarHeader>
      <SidebarContent>
        <Nav items={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail className="" />
    </Sidebar>
  )
}
