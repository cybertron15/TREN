import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";
import Meter from "./Meter";
import TypeFiller from "./TypeFiller";

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
	const [per, setpercentage] = useState("90");
	const importance_map = {
		1: "#F6E5D9",
		2: "#FAF4BE",
		3: "#D4EDFB",
	};

	return (
		<div
			className="flex border-2 justify-between rounded-lg p-1"
			style={{ backgroundColor: importance_map[importance] }}
		>
			<div className="group flex gap-2 items-center">
				<Meter
					percentage={per}
					importance={importance}
					size={50}
					gap={8}
				>
					<TypeFiller type={type} varient={"solid"} per={per}/>
				</Meter>

				<div className="flex flex-col">
					<span className="text-lg"> {task} </span>
					<span className="text-xs">
						{time} | {duration}
					</span>
				</div>
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
