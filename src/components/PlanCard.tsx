import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";
import Meter from "./Meter";
import TypeFiller from "./TypeFiller";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

type Props = {
	task: string;
	type: string;
	duration: number;
	time: number;
	importance: string;
	percentage: number;
};

function PlanCard({
	task,
	type,
	duration,
	time,
	importance,
	percentage,
}: Props) {
	const [per, setpercentage] = useState(percentage);
	// const importance_map = {
	// 	1: "#F6E5D9",
	// 	2: "#FAF4BE",
	// 	3: "#D4EDFB",
	// };
	//TODO change the hardcoded color values
	const importance_map = {
		1: "white",
		2: "white",
		3: "white",
	};

	return (
		<div
			className="flex justify-between rounded-lg py-0/5"
			style={{ backgroundColor: importance_map[importance] }}
		>
			<div className="group flex gap-2 items-center text-[0.7rem]">
					<Meter percentage={per} importance={importance} size={30} gap={4}>
						<TypeFiller type={type} varient={"solid"} per={per} />
					</Meter>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="text-start text-sm font-Inter truncate ... w-32">
							{task}
						</TooltipTrigger>
						<TooltipContent className="bg-slate-600">{task}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<span className="text-xs text-slate-500">
					{time} | {duration}
				</span>
			</div>
			<div className="flex items-center gap-2 p-2">
				<button type="button" className="hover:text-red-600">
					<Trash size={20} />
				</button>
				<button type="button" className="hover:text-red-600">
					<Pen size={20} />
				</button>
			</div>
		</div>
	);
}

export default PlanCard;
