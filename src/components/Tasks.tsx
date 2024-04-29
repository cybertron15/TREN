import React from "react";
import Taskcard from "./Taskcard";
import { CircleHelp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

function Tasks() {
	const taskList = [
		{
			task: "Morning Run",
			type: "strength",
			duration: "1 hr",
			time: "06:30 AM",
			importance: 1,
			percentage: 100,
			subtasks: [],
		},
		{
			task: "Stock Trading",
			type: "money",
			duration: "3 hrs",
			time: "09:00 AM",
			importance: 3,
			percentage: 40,
			subtasks: [],
		},
		{
			task: "Office Work",
			type: "brain",
			duration: "8 hrs",
			time: "09:00 AM",
			importance: 3,
			percentage: 60,
			subtasks: [
				{
					task: "Team Meeting",
					type: "brain",
					duration: "1 hr",
					time: "10:00 AM",
					importance: 2,
					percentage: 30,
					subtasks: [],
				},
				{
					task: "Client Call",
					type: "brain",
					duration: "45 mins",
					time: "11:00 AM",
					importance: 3,
					percentage: 15,
					subtasks: [],
				},
			],
		},
		{
			task: "Lunch Break",
			type: "brain",
			duration: "1 hr",
			time: "01:00 PM",
			importance: 2,
			percentage: 100,
			subtasks: [],
		},
		{
			task: "Afternoon Walk",
			type: "strength",
			duration: "45 mins",
			time: "03:00 PM",
			importance: 1,
			percentage: 50,
			subtasks: [],
		},
		// {
		// 	task: "Gym Session",
		// 	type: "strength",
		// 	duration: "1.5 hrs",
		// 	time: "06:00 PM",
		// 	importance: 1,
		// 	percentage: 25,
		// 	subtasks: [
		// 		{
		// 			task: "Strength Training",
		// 			type: "strength",
		// 			duration: "45 mins",
		// 			time: "06:30 PM",
		// 			importance: 2,
		// 			percentage: 30,
		// 			subtasks: [],
		// 		},
		// 	],
		// },
		// {
		// 	task: "Dinner Preparation",
		// 	type: "brain",
		// 	duration: "1 hr",
		// 	time: "07:00 PM",
		// 	importance: 3,
		// 	percentage: 40,
		// 	subtasks: [],
		// },
		// {
		// 	task: "Dinner with Family",
		// 	type: "brain",
		// 	duration: "1 hr",
		// 	time: "08:00 PM",
		// 	importance: 3,
		// 	percentage: 100,
		// 	subtasks: [],
		// },
		// {
		// 	task: "Reading Book",
		// 	type: "brain",
		// 	duration: "1 hr",
		// 	time: "09:00 PM",
		// 	importance: 2,
		// 	percentage: 70,
		// 	subtasks: [],
		// },
		{
			task: "Meditation",
			type: "brain",
			duration: "30 mins",
			time: "09:30 PM",
			importance: 1,
			percentage: 50,
			subtasks: [],
		},
		{
			task: "Watching a Movie",
			type: "brain",
			duration: "2 hrs",
			time: "10:00 PM",
			importance: 3,
			percentage: 30,
			subtasks: [],
		},
		{
			task: "Bedtime",
			type: "strength",
			duration: "8 hrs",
			time: "11:00 PM",
			importance: 1,
			percentage: 100,
			subtasks: [],
		},
		{
			task: "Morning Workout",
			type: "strength",
			duration: "1 hr",
			time: "06:30 AM",
			importance: 1,
			percentage: 70,
			subtasks: [
				{
					task: "Cardio",
					type: "strength",
					duration: "30 mins",
					time: "07:00 AM",
					importance: 2,
					percentage: 40,
					subtasks: [],
				},
			],
		},
		{
			task: "Weekly Planning",
			type: "brain",
			duration: "1 hr",
			time: "11:00 AM",
			importance: 3,
			percentage: 20,
			subtasks: [],
		},
		{
			task: "Budget Review",
			type: "money",
			duration: "1 hr",
			time: "01:00 PM",
			importance: 2,
			percentage: 60,
			subtasks: [],
		},
		{
			task: "Coffee Break",
			type: "brain",
			duration: "15 mins",
			time: "02:30 PM",
			importance: 1,
			percentage: 100,
			subtasks: [],
		},
		{
			task: "Afternoon Nap",
			type: "strength",
			duration: "30 mins",
			time: "03:00 PM",
			importance: 1,
			percentage: 100,
			subtasks: [],
		},
		{
			task: "Grocery Shopping",
			type: "brain",
			duration: "45 mins",
			time: "04:00 PM",
			importance: 2,
			percentage: 30,
			subtasks: [],
		},
		{
			task: "Yoga Session",
			type: "strength",
			duration: "1 hr",
			time: "05:00 PM",
			importance: 3,
			percentage: 60,
			subtasks: [],
		},
		{
			task: "Personal Finance Management",
			type: "money",
			duration: "1 hr",
			time: "08:00 PM",  
			importance: 3,
			percentage: 40,
			subtasks: [],
		},
	];
	return (
		<>
		
			<div className="flex mb-4 justify-between">
				<div className="flex items-center gap-1">
					<div className="font-Inter text-4xl">Tasks</div>
					<div className="bg-red-500 w-7 h-7 rounded-full justify-center text-white font-PlexMono mt-1 flex items-center text-sm">
						{taskList.length}
					</div>
					<CircleHelp
						className="mt-1 "
						size={33}
						color="#8C8C8C"
						opacity={"50%"}
					/>
				</div>
				<div className="mt-auto">
					<Select>
						<SelectTrigger className="text-lg text-[#8C8C8C]">
							<SelectValue placeholder="Today" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Today">Today</SelectItem>
							<SelectItem value="Tomorrow">Tomorrow</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			
			<ScrollArea className="h-full p-2">
				{taskList.map((task) => {
					return task.subtasks.length !== 0 ? (
						<Accordion type="single" key={task.task} collapsible>
							<AccordionItem value={task.task}>
								<AccordionTrigger>
									<Taskcard
										task={task.task}
										type={task.type}
										duration={task.duration}
										time={task.time}
										importance={task.importance}
										percentage={task.percentage}
										subtasks={true}
									/>
								</AccordionTrigger>
								<AccordionContent>
									{task.subtasks.map((subtask) => {
										return (
											<Taskcard
												task={subtask.task}
												type={subtask.type}
												duration={subtask.duration}
												time={subtask.time}
												importance={subtask.importance}
												percentage={subtask.percentage}
												subtasks={false}
												key={`${subtask.task}`}
											/>
										);
									})}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					) : (
						<div className="pb-2" key={task.task}>
							<div>
								<Taskcard
									task={task.task}
									type={task.type}
									duration={task.duration}
									time={task.time}
									importance={task.importance}
									percentage={task.percentage}
									subtasks={false}
								/>
							</div>
							<hr className="w-full mt-2" />
						</div>
					);
				})}
			</ScrollArea>
			
	
		</>
	);
}

export default Tasks;
