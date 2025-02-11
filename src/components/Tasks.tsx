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
import { useLoaderData, useNavigation } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import SkeletonTaskcard from "./skeletons/Taskcard";
import { toast } from "sonner";

enum TaskType {
	SHORT = 1,
	LONG = 2,
}

enum Priority {
	LOW = 1,
	MEDIUM = 2,
	HIGH = 3,
}

interface Tasks {
	id: string;
	owner: string; // Assuming the 'owner' is referenced by an ID of CustomUser
	related_goal?: string | null; // Assuming the 'related_goal' is referenced by an ID of Goals
	name: string;
	category: string; // Assuming the 'category' is referenced by an ID of Categories
	task_type: TaskType;
	start_time: string;
	did_start_on_time?: boolean; // Did not specify a default, assuming it can be undefined
	actual_start_time?: Date | null;
	duration: string; // DurationField can be represented as ISO 8601 duration string
	completion: number;
	priority: Priority;
	parent?: string | null; // Assuming 'parent' is referenced by an ID of Tasks
	subtasks?: Tasks[]; // Related subtask objects (self-referencing)
}

interface APIres {
	success: boolean
	data: Tasks[]
}

interface LoaderData {
	tasks: APIres
	plan: APIres
	goals: APIres
}
function Tasks() {
	// const taskList = [
	// 	{
	// 		task: "Morning Run",
	// 		type: "strength",
	// 		duration: "1 hr",
	// 		time: "06:30 AM",
	// 		importance: 1,
	// 		percentage: 100,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Stock Trading",
	// 		type: "money",
	// 		duration: "3 hrs",
	// 		time: "09:00 AM",
	// 		importance: 3,
	// 		percentage: 40,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Office Work",
	// 		type: "brain",
	// 		duration: "8 hrs",
	// 		time: "09:00 AM",
	// 		importance: 3,
	// 		percentage: 60,
	// 		subtasks: [
	// 			{
	// 				task: "Team Meeting",
	// 				type: "brain",
	// 				duration: "1 hr",
	// 				time: "10:00 AM",
	// 				importance: 2,
	// 				percentage: 30,
	// 				subtasks: [],
	// 			},
	// 			{
	// 				task: "Client Call",
	// 				type: "brain",
	// 				duration: "45 mins",
	// 				time: "11:00 AM",
	// 				importance: 3,
	// 				percentage: 15,
	// 				subtasks: [],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		task: "Lunch Break",
	// 		type: "brain",
	// 		duration: "1 hr",
	// 		time: "01:00 PM",
	// 		importance: 2,
	// 		percentage: 100,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Afternoon Walk",
	// 		type: "strength",
	// 		duration: "45 mins",
	// 		time: "03:00 PM",
	// 		importance: 1,
	// 		percentage: 50,
	// 		subtasks: [],
	// 	},
	// 	// {
	// 	// 	task: "Gym Session",
	// 	// 	type: "strength",
	// 	// 	duration: "1.5 hrs",
	// 	// 	time: "06:00 PM",
	// 	// 	importance: 1,
	// 	// 	percentage: 25,
	// 	// 	subtasks: [
	// 	// 		{
	// 	// 			task: "Strength Training",
	// 	// 			type: "strength",
	// 	// 			duration: "45 mins",
	// 	// 			time: "06:30 PM",
	// 	// 			importance: 2,
	// 	// 			percentage: 30,
	// 	// 			subtasks: [],
	// 	// 		},
	// 	// 	],
	// 	// },
	// 	// {
	// 	// 	task: "Dinner Preparation",
	// 	// 	type: "brain",
	// 	// 	duration: "1 hr",
	// 	// 	time: "07:00 PM",
	// 	// 	importance: 3,
	// 	// 	percentage: 40,
	// 	// 	subtasks: [],
	// 	// },
	// 	// {
	// 	// 	task: "Dinner with Family",
	// 	// 	type: "brain",
	// 	// 	duration: "1 hr",
	// 	// 	time: "08:00 PM",
	// 	// 	importance: 3,
	// 	// 	percentage: 100,
	// 	// 	subtasks: [],
	// 	// },
	// 	// {
	// 	// 	task: "Reading Book",
	// 	// 	type: "brain",
	// 	// 	duration: "1 hr",
	// 	// 	time: "09:00 PM",
	// 	// 	importance: 2,
	// 	// 	percentage: 70,
	// 	// 	subtasks: [],
	// 	// },
	// 	{
	// 		task: "Meditation",
	// 		type: "brain",
	// 		duration: "30 mins",
	// 		time: "09:30 PM",
	// 		importance: 1,
	// 		percentage: 50,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Watching a Movie",
	// 		type: "brain",
	// 		duration: "2 hrs",
	// 		time: "10:00 PM",
	// 		importance: 3,
	// 		percentage: 30,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Bedtime",
	// 		type: "strength",
	// 		duration: "8 hrs",
	// 		time: "11:00 PM",
	// 		importance: 1,
	// 		percentage: 100,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Morning Workout",
	// 		type: "strength",
	// 		duration: "1 hr",
	// 		time: "06:30 AM",
	// 		importance: 1,
	// 		percentage: 70,
	// 		subtasks: [
	// 			{
	// 				task: "Cardio",
	// 				type: "strength",
	// 				duration: "30 mins",
	// 				time: "07:00 AM",
	// 				importance: 2,
	// 				percentage: 40,
	// 				subtasks: [],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		task: "Weekly Planning",
	// 		type: "brain",
	// 		duration: "1 hr",
	// 		time: "11:00 AM",
	// 		importance: 3,
	// 		percentage: 20,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Budget Review",
	// 		type: "money",
	// 		duration: "1 hr",
	// 		time: "01:00 PM",
	// 		importance: 2,
	// 		percentage: 60,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Coffee Break",
	// 		type: "brain",
	// 		duration: "15 mins",
	// 		time: "02:30 PM",
	// 		importance: 1,
	// 		percentage: 100,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Afternoon Nap",
	// 		type: "strength",
	// 		duration: "30 mins",
	// 		time: "03:00 PM",
	// 		importance: 1,
	// 		percentage: 100,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Grocery Shopping",
	// 		type: "brain",
	// 		duration: "45 mins",
	// 		time: "04:00 PM",
	// 		importance: 2,
	// 		percentage: 30,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Yoga Session",
	// 		type: "strength",
	// 		duration: "1 hr",
	// 		time: "05:00 PM",
	// 		importance: 3,
	// 		percentage: 60,
	// 		subtasks: [],
	// 	},
	// 	{
	// 		task: "Personal Finance Management",
	// 		type: "money",
	// 		duration: "1 hr",
	// 		time: "08:00 PM",
	// 		importance: 3,
	// 		percentage: 40,
	// 		subtasks: [],
	// 	},
	// ];
	const {tasks} = useLoaderData() as LoaderData
	
	const taskList: Tasks[] = tasks.data
	// console.log(taskList);
	
	const navigation = useNavigation()
	
	return (
		<div className="rounded-2xl bg-white h-full flex flex-col">
			<div className="relative flex mb-1 p-3">
				<CircleHelp
					className="absolute top-1.5 right-1.5 hidden"
					size={25}
					color="#8C8C8C"
					opacity={"50%"}
				/>
				<div className="flex items-center gap-1">
					<div className="font-Inter text-4xl">Tasks</div>
					<div className="bg-red-500 w-7 h-7 rounded-full justify-center text-white font-PlexMono mt-1 flex items-center text-sm">
						{tasks.success?taskList.length:"0"}
					</div>
				</div>
				<div className="h-full flex items-end mt-1">
					{/* <Select>
						<SelectTrigger className="text-2xl text-[#8C8C8C]">
							<SelectValue placeholder="Day 1" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={"Day 1"}>Day 1</SelectItem>
							<SelectItem value={"Day 2"}>Day 2</SelectItem>
							<SelectItem value={"Day 3"}>Day 3</SelectItem>
							<SelectItem value={"Day 4"}>Day 4</SelectItem>
							<SelectItem value={"Day 5"}>Day 5</SelectItem>
							<SelectItem value={"Day 6"}>Day 6</SelectItem>
							<SelectItem value={"Day 7"}>Day 7</SelectItem>
							<SelectItem value={"Day 8"}>Day 8</SelectItem>
							<SelectItem value={"Day 9"}>Day 9</SelectItem>
							<SelectItem value={"Day 10"}>Day 10</SelectItem>
						</SelectContent>
					</Select> */}
				</div>
			</div>

			<ScrollArea className="h-full px-2 m-2 over">
				
				{
				tasks.success?
					navigation.state !== "idle" ?
					<SkeletonTaskcard /> :
					taskList.length !== 0 ?
						taskList.map((task) => {
							return task.subtasks !== undefined ? (
								<Accordion type="single" key={task.id} collapsible>
									<AccordionItem value={task.name}>
										<AccordionTrigger>
											<Taskcard
												task={task.name}
												category={task.category}
												duration={task.duration}
												startTime={task.start_time}
												completion={task.completion}
												subtasks={false}
												priority={task.priority}
											/>
										</AccordionTrigger>
										<AccordionContent>
											{task?.subtasks.map((subtask) => {
												return (
													<Taskcard
														task={subtask.name}
														category={subtask.category}
														duration={subtask.duration}
														startTime={subtask.start_time}
														completion={subtask.completion}
														subtasks={false}
														key={subtask.id}
														priority={task.priority}
													/>
												);
											})}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							) : (
								<div className="pb-2" key={task.id}>
									<div>
										<Taskcard
											task={task.name}
											category={task.category}
											duration={task.duration}
											startTime={task.start_time}
											completion={task.completion}
											subtasks={false}
											priority={task.priority}
										/>
									</div>
									<hr className="w-full mt-2" />
								</div>
							);
						}) :
						<div className="mt-[20%] text-center text-slate-400">
							No tasks. Add tasks from plan section.
						</div>
						:
						<div className="mt-[20%] text-center text-slate-400">
							Failed to fetch tasks
						</div>
				}
			</ScrollArea>
		</div>
	);
}

export default Tasks;
