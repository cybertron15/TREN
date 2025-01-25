import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";
import Meter from "./Meter";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { stringTo12hrFormatTimeString } from "@/utils/dateTimeUtils";

type Props = {
	task: string;
	category: string;
	duration: string;
	startTime: string;
	completion: number;
	subtasks: boolean;
	priority: number;
};
export default function Taskcard({
	task,
	category,
	duration,
	startTime,
	priority,
	completion,
	subtasks,
}: Props) {
	const [per, setpercentage] = useState(completion);
	const [start, setStart] = useState(false);
	// const importance_map = {
	// 	1: "#F6E5D9",
	// 	2: "#FAF4BE",
	// 	3: "#D4EDFB",
	// };


	//TODO change the hardcoded color values

	const per_colors = {
		bad: "black",
		good: "black",
		excelent: "black",
	};

	const priority_map = {
		1: "urgent",
		2: "imp",
		3: "chill",
	};
	const category_map = {
		strength: "strength-outline.png",
		money: "money-outline.png",
		brain: "brain-outline.png",
	}
	
	return (
		<div
			className="flex w-full rounded-lg p-2 pe-0"
			style={{
				backgroundColor:
					priority_map[priority as keyof typeof priority_map],
			}}
		>
			<div className="flex justify-between w-full">
				<div className="flex gap-4">
					<div className="borde flex flex-col justify-center">
						<img
							src={`/icons/${category_map[category as keyof typeof category_map]}`}
							alt="strength"
							className="w-9 h-9"
						/>
					</div>
					<div className="flex flex-col justify-center text-start">
						<div className="flex gap-1">
							{task.length > 17 ? (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="text-base font-Inter truncate ... max-w-32">
											{task}
										</TooltipTrigger>
										<TooltipContent className="bg-slate-600">
											{task}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								<span className="text-base font-Inter truncate ... max-w-32">
									{task}
								</span>
							)}
							{subtasks && (
								<ChevronUpIcon className="h-4 w-4 mt-1 shrink-0 text-muted-foreground transition-transform duration-200 rotate-90" />
							)}
						</div>
						<div className="flex text-xs font-Inter text-[#8C8C8C]">
							<span>
							{/* {stringTo12hrFormatTimeString(startTime)} | {`${duration.slice(0,2)} hr ${duration.slice(3,5)} m`} */}
							{stringTo12hrFormatTimeString("00:00:00")} | {`${"00"} hr ${"00"} m`}
							</span>
						</div>
					</div>
				</div>
				<div className="flex gap-1 items-center">
					<div className="w-11">
						<div
							className="ms-auto w-fit"
							style={{
								color:
									Number(per) >= 75
										? per_colors.excelent
										: Number(per) >= 30
											? per_colors.good
											: per_colors.bad,
							}}
						>
							{per?per:"0"}%
						</div>
					</div>
					<Meter
						percentage={per}
						importance={priority}
						size={34}
						gap={3}
						conincStart={70}
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div onClick={() => setStart(!start)}>
							<img
								src={`/icons/${start ? "play-red" : "pause-red"}.png`}
								alt=""
								className="aspect-square rounded-full"
							/>
						</div>
					</Meter>
					{/* <div className="flex items-center hover:cursor-pointer">
						<EllipsisVertical color="#BCBCBC" size={"25"} className="w-fit" />
					</div> */}
				</div>
			</div>
		</div>
	);
}
