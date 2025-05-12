import { AppSidebar } from "@/components/app-sidebar"
import ToggleTheme from "@/components/toggle-theme";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'See your tasks, insights, and progress.',
};

export default function Page() {
	
	return (
		<>
			<AppSidebar />
			<SidebarInset>
				<header className="flex justify-between h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<h1 className="text-2xl">Dashboard</h1>
					</div>
					<ToggleTheme />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
					</div>
					<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
				</div>
			</SidebarInset>
		</>
	)
}
