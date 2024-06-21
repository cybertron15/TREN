import Goals from "@/components/Goals";
import Plan from "@/components/Plan";
import StatCard from "@/components/StatCard";
import Tasks from "@/components/Tasks";
import Timer from "@/components/Timer";
import Title from "@/components/Title";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import axiosInstance from "@/utils/axiousInstance";
import isLoggedIn from "@/utils/loginCheck";
import {
	Apple,
	CircleHelp,
	Dumbbell,
	LineChart,
	NotebookPen,
} from "lucide-react";
import React from "react";
import { Link, redirect, type LoaderFunctionArgs } from "react-router-dom";

function Dashbaord() {
	return (
		<div className="flex flex-col h-[100vh]">
			<div className="flex h-[15%]">
				<div className="w-[25%] p-1 pt-2 ps-2">
					<div className="flex gap-3 bg-white rounded-xl px-4 justify-between w-full h-full">
						<Title />
					</div>
				</div>
				<div className="p-1 pt-2 pe-2 w-[75%]">
					<div className="relative bg-white flex justify-around rounded-2xl h-full p-1">
						<CircleHelp
							className="absolute top-2 right-2"
							size={25}
							color="#8C8C8C"
							opacity={"50%"}
						/>
						<div className="w-[20%] text-xl">
							<StatCard
								duration={"Yesterday"}
								strength={50}
								money={80}
								brain={20}
							/>
						</div>
						<div className="w-[20%] text-xl">
							<StatCard
								duration={"Today"}
								strength={50}
								money={80}
								brain={20}
							/>
						</div>
						<div className="w-[20%] text-xl">
							<StatCard duration={"Week"} strength={50} money={80} brain={20} />
						</div>
						<div className="w-[20%] text-xl">
							<StatCard
								duration={"Month"}
								strength={50}
								money={80}
								brain={20}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex h-[85%] ">
				<div className="w-[25%] p-1 ps-2 pb-2 h-full">
					<Tasks />
				</div>
				<div className="w-[20%] h-[100%] p-1 pb-2 flex flex-col gap-2">
					<div className="h-[40%]">
						<div className="h-full bg-white rounded-2xl">
							<Timer
								taskName={"DSA"}
								timer={{
									hours: 0,
									minutes: 4,
									seconds: 2,
								}}
							/>
						</div>
					</div>
					<div className="h-[30%] flex gap-2">
						<div className="bg-white rounded-xl w-full flex justify-center items-center">
							<LineChart size={70} strokeWidth={1} />
						</div>
						<div className="bg-white rounded-xl w-full flex flex-col gap-2 justify-center items-center p-2">
							<Dumbbell size={70} strokeWidth={1} />
						</div>
					</div>

					<div className="flex h-[30%] gap-2">
						<div className="bg-white rounded-xl w-full flex justify-center items-center">
							<Apple size={70} strokeWidth={1} />
						</div>
						<Link
							to="/journal"
							className="bg-white rounded-xl w-full flex justify-center items-center"
						>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="text-base font-Inter truncate ... max-w-48 mb-1">
										{<NotebookPen size={70} strokeWidth={1} />}
									</TooltipTrigger>
									<TooltipContent className="bg-slate-600">
										Journal
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Link>
					</div>
				</div>
				<div className="w-[25%] flex flex-col">
					<div className="flex-grow p-1 pb-2 h-[100%]">
						<div className="h-full bg-white rounded-2xl">
							<Goals />
						</div>
					</div>
				</div>
				<div className="h-full w-[30%] p-1 pb-2 pe-2">
					<Plan />
				</div>
			</div>
		</div>
	);
}

async function loader({ params, request }: LoaderFunctionArgs) {
	if (!isLoggedIn()) {
		return redirect("/login")
	}
	const result = { tasks: { success: false, data: "failed to fetch tasks" }, goals: { success: false, data: "failed to fetch goals" }, plan: { success: false, data: "failed to fetch plan" } }
	try {
		const response = await axiosInstance.get('/tasks')
		result.tasks.success = true
		result.tasks.data =  response.data

	} catch (error) {
		console.log("failed to fetch tasks", error)
	}

	try {
		const response = await axiosInstance.get('/goals')
		result.goals.success = true
		result.goals.data =  response.data

	} catch (error) {
		console.log("failed to fetch goals", error)
	}

	try {
		const response = await axiosInstance.get('/plan')
		result.plan.success = true
		result.plan.data =  response.data

	} catch (error) {
		console.log("failed to fetch plans", error)
	}

	return result
}
export { loader }
export default Dashbaord;
