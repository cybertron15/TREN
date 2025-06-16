import { AppSidebar } from "@/components/app-sidebar"
import BarChartContainer from "@/components/dashboard/barchart-container";
import CalendarView from "@/components/dashboard/calendar";
import DeadlineContainer from "@/components/dashboard/deadline-container";
import PieChartContainer from "@/components/dashboard/piechart-container";
import TasksContainer from "@/components/dashboard/tasks-container";
import TimerContainer from "@/components/dashboard/timer-contaier";
import ToggleTheme from "@/components/toggle-theme";
import { ScrollArea } from "@/components/ui/scroll-area";
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
			<SidebarInset className="h-[100vh] overflow-hidden">
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
					{/* Top section - naturally sized (fixed height or content-based) */}
					<div className="grid auto-rows-min gap-4 md:grid-cols-12">
						<div className="bg-muted/50 md:col-span-3 rounded-xl p-4 h-[40vh]" >
							<TimerContainer />
						</div>
						<div className="relative bg-muted/50 md:col-span-4 rounded-xl p-4 h-[40vh]" >
							<BarChartContainer />
						</div>
						<div className="bg-muted/50 md:col-span-3 rounded-xl p-4 h-[40vh]">
							<PieChartContainer />
						</div>
						<div className="bg-muted/50 md:col-span-2 rounded-xl h-[40vh] p-4" >
							<DeadlineContainer />
						</div>
					</div>

					{/* Bottom section - grows to fill available space */}
					<div className="grid gap-4 md:grid-cols-12 flex-1 w-full">
						<div className="bg-muted/50 flex flex-col flex-1 md:col-span-3 rounded-xl p-4 w-full" >
							<TasksContainer />
						</div>
						<div className="bg-muted/50 md:col-span-9 rounded-xl">
							<div className="overflow-hidden p-4 rounded-xl h-full">
								<ScrollArea className="overflow-y-auto h-[45vh] pr-2">
									<CalendarView />
								</ScrollArea>
								
							</div>
						</div>
					</div>
				</div>

			</SidebarInset>
		</>
	)
}
