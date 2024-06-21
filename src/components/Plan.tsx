import { CircleHelp, Settings2 } from "lucide-react";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import Meter from "./Meter";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import PlanCard from "./PlanCard";

function Plan() {
	const planCards = [
		{
			task: "Salary Negotiation",
			type: "money",
			duration: "2 hrs",
			time: "10:00 AM",
			importance: 1, // High importance
			percentage: 80,
		},
		{
			task: "Gym Workout",
			type: "strength",
			duration: "1 hr",
			time: "06:00 AM",
			importance: 3, // Moderate to high importance
			percentage: 60,
		},
		{
			task: "Study Mathematics",
			type: "brain",
			duration: "1 hr",
			time: "02:00 PM",
			importance: 2, // Low to moderate importance
			percentage: 50,
		},
		{
			task: "Investing Strategy Meeting",
			type: "money",
			duration: "1 hr",
			time: "09:00 AM",
			importance: 1, // High importance
			percentage: 90,
		},
		{
			task: "Yoga Session",
			type: "strength",
			duration: "1 hr",
			time: "11:00 AM",
			importance: 2, // Low to moderate importance
			percentage: 40,
		},
		{
			task: "Code Review",
			type: "brain",
			duration: "30 mins",
			time: "03:30 PM",
			importance: 1, // High importance
			percentage: 70,
		},
		{
			task: "Yoga Session",
			type: "strength",
			duration: "1 hr",
			time: "11:00 AM",
			importance: 2, // Low to moderate importance
			percentage: 40,
		},
		{
			task: "Code Review",
			type: "brain",
			duration: "30 mins",
			time: "03:30 PM",
			importance: 1, // High importance
			percentage: 70,
		},
		{
			task: "Code Review",
			type: "brain",
			duration: "30 mins",
			time: "03:30 PM",
			importance: 1, // High importance
			percentage: 70,
		},
		{
			task: "Yoga Session",
			type: "strength",
			duration: "1 hr",
			time: "11:00 AM",
			importance: 2, // Low to moderate importance
			percentage: 40,
		},
		{
			task: "Code Review",
			type: "brain",
			duration: "30 mins",
			time: "03:30 PM",
			importance: 1, // High importance
			percentage: 70,
		},
	];

	return (
		<div className="relative h-full bg-white rounded-2xl p-3">
			<CircleHelp
				className="absolute top-2 right-2"
				size={25}
				color="#8C8C8C"
				opacity={"50%"}
			/>

			<div className="flex gap-2 items-center">
				<div className="flex gap-2">
					<div className="font-Inter text-4xl mt-2">Plan</div>
					<Meter
						percentage={100}
						size={52}
						importance={4}
						conicDiff={5}
						conincStart={85}
						gap={0}
					>
						<img src="/icons/target.png" alt="" className="mb-2.5 ms-2.5" />
					</Meter>
				</div>
				<div className="h-full pt-3">
					<Select>
						<SelectTrigger className="text-2xl text-[#8C8C8C]">
							<SelectValue placeholder="5 Apr, Mon" className="" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Today">5 Apr, Mon</SelectItem>
							<SelectItem value="Tomorrow">Tomorrow</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="flex gap-2 items-center mt-2">
				<div className="text-slate-400">Day Start 07:00 AM</div>
				<Settings2 size={15} className="mt-0.5 text-slate-600 cursor-pointer" />
			</div>
			<ScrollArea className="px-3 py-2 border-s-4 ms-1 h-[75%]">
				<div>
					{planCards.map((plan, index) => (
						<div className="" key={`${index}${plan}`}>
							<div className="w-[30px] flex justify-center">
								<div className="h-5 w-[0.15rem] rounded-full bg-gray-400" />
							</div>
							<PlanCard
								task={plan.task}
								type={plan.type}
								duration={plan.duration}
								time={plan.time}
								importance={plan.importance}
								percentage={plan.percentage}
							/>
						</div>

					))}
					<div className="w-[30px] flex justify-center">
						<div className="h-5 w-[0.15rem] rounded-full bg-gray-400" />
					</div>
				</div>
			</ScrollArea>
			<div className="text-slate-400">Day End 10:00 AM</div>

			<div className="mt-1 flex justify-end gap-2">
				<Button>Saved Task</Button>
				<Button variant={"destructive"}>Add Task</Button>
			</div>
		</div>
	);
}

export default Plan;
