import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Meter from "./Meter";

type Props = {
	task: string;
	type: string;
	duration: number;
	time: number;
	importance: string;
	percentage: number;
};
export default function Taskcard({
	task,
	type,
	duration,
	time,
	importance,
	percentage,
}: Props) {
	const [per, setpercentage] = useState("0");
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
		<>
			<div
				className="group flex border-2 rounded-lg p-2 pe-0 m-4"
				style={{ backgroundColor: importance_map[importance] }}
			>
				<div className="flex justify-between w-full">
					<div className="flex gap-4">
						<div className="borde flex flex-col justify-center">
							<img
								src={`icons/${type_map[type]}`}
								alt="muscle"
								className="w-9 h-9"
							/>
						</div>
						<div className="flex flex-col justify-center">
							<span className="text-base font-Inter">{task}</span>
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
						<Meter percentage={per} importance={importance} size={33} gap={0} conincStart={70}>
							<button type="button" onClick={()=>setStart(!start)}>
								<img
								src={`icons/${start?"play-red":"pause-yellow"}.png`}
								alt=""
								className="w-7 h-7 rounded-full"
								/>
							</button>
						</Meter>
						<button type="button" className="flex items-center">
							<EllipsisVertical color="#BCBCBC" size={"25"} className="w-fit" />
						</button>
					</div>
				</div>
			</div>
			<input
				type="range"
				min="0"
				max="100"
				value={per}
				className="slider w-40 ms-10"
				id="mySlider"
				onChange={(event) => {
					setpercentage(event.target.value);
				}}
			/>
		</>
	);
}
