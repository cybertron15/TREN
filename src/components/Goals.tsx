import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleHelp } from "lucide-react";
import React from "react";
import GoalCard from "./GoalCard";
import { useLoaderData } from "react-router-dom";
interface APIres {
	success: boolean
	data: Goal[]
}

interface LoaderData {
	tasks: APIres
	plan: APIres
	goals: APIres
}
function Goals() {
	// const goalList = [
	// 	{
	// 		deadline: "2024-05-01",
	// 		title: "Complete New Website Project",
	// 		progress: 40,
	// 		type: "strength",
	// 		importance: 1,
	// 		timeSpent: 20,
	// 	},
	// 	{
	// 		deadline: "2024-08-01",
	// 		title: "Learn Python for Data Science",
	// 		progress: 60,
	// 		type: "brain",
	// 		importance: 2,
	// 		timeSpent: 35,
	// 	},
	// 	{
	// 		deadline: "2024-05-15",
	// 		title: "Complete 30-Day Fitness Challenge",
	// 		progress: 80,
	// 		type: 'strength',
	// 		importance: 3,
	// 		timeSpent: 25,
	// 	},
	// 	{
	// 		deadline: "2024-12-31",
	// 		title: "Read 20 Books This Year",
	// 		progress: 25,
	// 		type: "money",
	// 		importance: 2,
	// 		timeSpent: 15,
	// 	},
	// ];
	const {goals} = useLoaderData() as LoaderData
	
	const goalList = goals.data
	return (
		<div className="relative flex flex-col h-full p-3">
			<CircleHelp
				className="absolute top-2 right-2"
				size={25}
				color="#8C8C8C"
				opacity={"50%"}
			/>
			<div className="flex items-center gap-2">
				<div className="font-Inter text-4xl">Goals</div>
				<button
					type="button"
					className="flex items-center justify-center bg-red-500 w-7 h-7 rounded-lg text-3xl text-white font-PlexMono mt-1 font-thin"
				>
					<div className="mb-0.5">+</div>
				</button>
			</div>
			<ScrollArea className="h-full">
				{goalList.map((goal, index) => (
					<div key={`${index}${goal}`}>
						<GoalCard
							id={goal.id} 
							priority={goal.priority}						
							deadline={goal.deadline} // insert UTC date with time
							name={goal.name}
							completion={goal.progress}
							category={goal.category}
							importance={goal.importance}
							workedFor={goal.worked_for} />
						<hr className="w-full" />
					</div>
				))}
			</ScrollArea>
		</div>
	);
}

export default Goals;
