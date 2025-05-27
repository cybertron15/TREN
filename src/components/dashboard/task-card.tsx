import { EllipsisVertical, Pause, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { stringTo12hrFormatTimeString } from "@/utils/dateTimeUtils";
import Meter from "../Meter";

type Props = {
	task: string;
	goal: string;
	category: string;
	selected: boolean;
	duration: { hours: number; minutes: number; seconds: number };
	startTime: string;
	completion: number;
	subtasks: boolean;
	priority: number;
};
export default function Taskcard({
	task,
	goal,
	category,
	duration,
	selected,
	startTime,
	priority,
	completion,
	subtasks,
}: Props) {
	const [per, setpercentage] = useState(completion);
	const [start, setStart] = useState(false);

	const priority_map = {
		1: "High",
		2: "Mid",
		3: "Low",
	};
	const category_map = {
		strength: "strength-outline.png",
		money: "money-outline.png",
		brain: "brain-outline.png",
	}

	const totalDuration = duration.hours * 3600 + duration.minutes * 60 + duration.seconds;

	const [elapsedTime, setElapsedTime] = useState(0);
	useEffect(() => {
			let interval: NodeJS.Timeout | null = null;
			if (start) {
				interval = setInterval(() => {
					setElapsedTime((prev) => {
						if (prev < totalDuration) {
							const newTime = prev + 1;
							const newPer = Math.round((newTime / totalDuration) * 100);
							setpercentage(newPer);
							
							return newTime;
						}
	
						if (interval) clearInterval(interval);
						return prev;
	
					});
				}, 1000);
			} else if (interval) {
				clearInterval(interval);
			}
			return () => {
				if (interval) clearInterval(interval);
			};
		}, [start, duration]);

	return (
		<div
			className={`relative flex flex-col w-full rounded-lg p-2 py-3.5 pe-0 bg-muted mb-3 ${selected && " border border-primary shadow-lg"}`}
		>
			<div className="absolute flex w-full justify-end text-[0.6rem] px-1 top-1 right-1">
				<div className="flex items-center gap-1">
					
					<span
						className={
							priority_map[priority as keyof typeof priority_map] === "High"
								? "text-primary"
								: priority_map[priority as keyof typeof priority_map] === "Mid"
									? "text-yellow-600"
									: "text-green-700"
						}
					>
						{priority_map[priority as keyof typeof priority_map]}
					</span>
					<div
						className={`w-1.5 h-1.5 rounded-full ${priority_map[priority as keyof typeof priority_map] === "High"
								? "bg-primary"
								: priority_map[priority as keyof typeof priority_map] === "Mid"
									? "bg-yellow-600"
									: "bg-green-700"
							}`}
					/>
				</div>

			</div>
			<div className="flex gap-4 cursor-pointer items-center">
				<Meter
					percentage={per}
					importance={priority}
					size={34}
					gap={3}
					conincStart={85}
				>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div onClick={() => setStart(!start)}>
						{start ?
							<Pause fill="currentColor" stroke="0" className="w-[80%] h-[80%] aspect-square m-auto shadow-xl rounded-full text-gray-400" />
							:
							<Play fill="currentColor" stroke="0" className="w-[80%] h-[80%] aspect-square m-auto shadow-xl rounded-full text-gray-400 ps-0.5" />
						}
					</div>
				</Meter>
				<div className="flex flex-col justify-center text-start">
					<div className="flex gap-1">
						<span className="text-sm font-Inter truncate ... max-w-40" title={task}>
							{task}
						</span>
					</div>
					<div className="flex text-xs font-Inter text-primary">
						<span>
							{/* {stringTo12hrFormatTimeString(startTime)} | {`${duration.slice(0,2)} hr ${duration.slice(3,5)} m`} */}
							{/* {stringTo12hrFormatTimeString("00:00:00")} | {`${"00"} hr ${"00"} m`} */}
							{goal}
						</span>
					</div>
				</div>
			</div>
			<div className="absolute flex w-full justify-end text-[0.6rem] px-1 bottom-1 right-1 text-gray-400">
				<span>{startTime} |  {(duration.hours + duration.minutes / 60 + duration.seconds / 3600).toFixed(1)}h</span>
			</div>
		</div>
	);
}
