import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";

type Props = {
	deadline: number;
	title: string;
	progress: number;
	type: string;
	importance: string;
	timeSpent: number;
};

export default function GoalCard({
	deadline,
	timeSpent,
	title,
	progress,
	type,
	importance,
}: Props) {
	const [per, setpercentage] = useState("90");
	const [start, setStart] = useState(false);
	const importance_map = {
		1: "#F6E5D9",
		2: "#FAF4BE",
		3: "#D4EDFB",
	};

	const type_map = {
		strength: "strength.png",
		money: "money.png",
		brain: "brain.png",
	};

	const per_colors = {
		bad: "#FF9A9A",
		good: "#FFBF1B",
		excelent: "#A4CA92",
	};

	return (
		<div
			className="group flex border-2 rounded-lg p-2 pe-0 m-4"
			style={{ backgroundColor: importance_map[importance] }}
		>
			<div className="flex gap-1 w-full justify-between">
				<div className="flex gap-4">
					<div className="flex flex-col justify-center">
						<span className="text-lg font-Inter font-bold text-[#E70000]">{`${deadline} left`}</span>
						<span className="text-base font-Inter">{`${title} left`}</span>
						<div className="flex text-xs font-Inter text-[#8C8C8C]">
							<span>{`Worked ${timeSpent}`}</span>
						</div>
					</div>
				</div>
				<div className="flex gap-1 items-center">
					<div
						className="w-16 h-16 rounded-full flex justify-center items-center"
						style={{
							background: `radial-gradient(closest-side, ${
								importance_map[importance]
							} 85%, transparent 90% 100%),conic-gradient(${
								Number(per) >= 75
									? per_colors.excelent
									: Number(per) >= 30
										? per_colors.good
										: per_colors.bad
							} ${per}%, ${importance_map[importance]} 0)`,
						}}
					>
						<div>
							<div className="w-11 hidden group-hover:block">
								<div
									className="text-center"
									style={{
										color:
											Number(per) >= 75
												? per_colors.excelent
												: Number(per) >= 30
													? per_colors.good
													: per_colors.bad,
									}}
								>
									<span>{per}%</span>
								</div>
							</div>
							<div className="flex flex-col justify-center  group-hover:hidden">
								<img
									src={`icons/${type_map[type]}`}
									alt="muscle"
									className="w-9 h-9"
								/>
							</div>
						</div>
					</div>
				<button type="button" className="flex items-center">
					<EllipsisVertical color="#BCBCBC" size={"30"} className="w-fit" />
				</button>
				</div>
			</div>
		</div>
	);
}
