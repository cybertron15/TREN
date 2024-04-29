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

type Props = {
	task: string;
	type: string;
	duration: string;
	time: string;
	importance: number;
	percentage: number;
	subtasks: boolean;
};
export default function Taskcard({
	task,
	type,
	duration,
	time,
	importance,
	percentage,
	subtasks,
}: Props) {
	const [per, setpercentage] = useState(percentage);
	const [start, setStart] = useState(false);
	const importance_map = {
		1: "#F6E5D9",
		2: "#FAF4BE",
		3: "#D4EDFB",
	};

	const type_map = {
		strength: "strength-outline.png",
		money: "money-outline.png",
		brain: "brain-outline.png",
	};

	const per_colors = {
		bad: "#FF9A9A",
		good: "#FFBF1B",
		excelent: "#A4CA92",
	};

	return (
		<div
			className="flex border-2 w-full rounded-lg p-2 pe-0"
			style={{
				backgroundColor:
					importance_map[importance as keyof typeof importance_map],
			}}
		>
			<div className="flex justify-between w-full">
				<div className="flex gap-4">
					<div className="borde flex flex-col justify-center">
						<img
							src={`icons/${type_map[type as keyof typeof type_map]}`}
							alt="muscle"
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
								{time} | {duration}
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
							{per}%
						</div>
					</div>
					<Meter
						percentage={per}
						importance={importance}
						size={34}
						gap={3}
						conincStart={70}
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div onClick={() => setStart(!start)}>
							<img
								src={`icons/${start ? "play-red" : "pause-yellow"}.png`}
								alt=""
								className="aspect-square rounded-full"
							/>
						</div>
					</Meter>
					<div className="flex items-center hover:cursor-pointer">
						<EllipsisVertical color="#BCBCBC" size={"25"} className="w-fit" />
					</div>
				</div>
			</div>
		</div>
	);
}
