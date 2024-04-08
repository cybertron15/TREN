import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";

export default function Taskcard({
	task,
	type,
	duration,
	time,
	importance,
	percentage,
}) {
	const [per, setpercentage] = useState("0");
	const [start, setStart] = useState(false);
	const importance_map = {
		1: "#F6E5D9",
		2: "#FAF4BE",
		3: "#D4EDFB",
	};
	const type_map = {
		strength: "",
		money: "bg-[#FAF4BE]",
		Intelect: "bg-[#D4EDFB]",
	};

	const per_colors = {
		bad: "#FF9A9A",
		good: "#FFBF1B",
		excelent: "#A4CA92",
	};

	return (
		<>
			<div
				className={`flex border-2 rounded-lg p-2 pe-0 m-4 ${`bg-[${importance_map[importance]}]`}`}
			>
				<div className="flex gap-1">
					<div className="flex gap-4">
						<div className="borde flex flex-col justify-center">
							<img
								src="icons/strength-outline.png"
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
						<button
							className="w-9 h-9 rounded-full flex justify-center items-center"
							style={{
								background: `radial-gradient(closest-side, ${
									importance_map[importance]
								} 70%, transparent 80% 100%),conic-gradient(${
									Number(per) >= 75
										? per_colors.excelent
										: Number(per) >= 30
											? per_colors.good
											: per_colors.bad
								} ${per}%, ${importance_map[importance]} 0)`,
							}}
							type="button"
							onClick={() => {
								setStart(!start);
							}}
						>
							{start ? (
								<img
									src="icons/play-red.png"
									alt=""
									className="w-7 h-7 m-auto"
								/>
							) : (
								<img
									src="icons/pause-yellow.png"
									alt=""
									className="w-7 h-7 m-auto"
								/>
							)}
						</button>
					</div>
				</div>
				<button type="button" className="flex items-center">
					<EllipsisVertical color="#BCBCBC" size={"25"} className="w-fit" />
				</button>
			</div>
			<input
				type="range"
				min="0"
				max="100"
				value={per}
				className="slider"
				id="mySlider"
				onChange={(event) => {
					setpercentage(event.target.value);
				}}
			/>
		</>
	);
}
