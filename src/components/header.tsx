"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import ToggleTheme from './toggle-theme'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

function Header() {
    const pathname = usePathname()
    const pathnames = pathname.split('/').filter(Boolean)

    return (
        <header className="flex justify-between h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                {pathnames.length <= 1 ? (
                    <h1 className="text-2xl capitalize">{pathnames[0] || "Dashboard"}</h1>
                ) : (
                    <Breadcrumb>
                        {pathnames.map((name, idx) => {
                            const to = '/' + pathnames.slice(0, idx + 1).join('/')
                            const isLast = idx === pathnames.length - 1
                            return (
                                <BreadcrumbItem key={to}>
                                    <BreadcrumbLink asChild>
                                        {isLast ? (
                                            <span className="capitalize">{name}</span>
                                        ) : (
                                            <Link href={to} className="capitalize">{name}</Link>
                                        )}
                                    </BreadcrumbLink>
                                    {!isLast && <BreadcrumbSeparator />}
                                </BreadcrumbItem>
                            )
                        })}
                    </Breadcrumb>
                )}
            </div>
            <ToggleTheme />
        </header>
    )
}

export default Header