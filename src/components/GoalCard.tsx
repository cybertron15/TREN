import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import Meter from "./Meter";
import TypeFiller from "./TypeFiller";
import moment, { duration } from "moment";
import { log } from "console";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

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
	const [per, setpercentage] = useState(progress);
	const [timeLeft, settimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	// const importance_map = {
	// 	1: "#F6E5D9",
	// 	2: "#FAF4BE",
	// 	3: "#D4EDFB",
	// };
	const importance_map = {
		1: "white",
		2: "white",
		3: "white",
	};

	// TODO  change the hardcoded color values

	const type_map = {
		strength: "strength.png",
		money: "money.png",
		brain: "brain.png",
	};


	// const targetDate = moment(deadline);
	const targetDate = moment(deadline);

	// Set an interval to update the countdown every second
	useEffect(() => {
		// Function to update the countdown
		const updateCountdown = setInterval(() => {
			const now = moment(); // Current time
			const duration = moment.duration(targetDate.diff(now)); // Time remaining
			if (duration.asSeconds() <= 0) {
				clearInterval(updateCountdown);
			} else {
				// Extract days, hours, minutes, and seconds from the duration
				const days = Math.floor(duration.asDays());
				const hours = duration.hours();
				const minutes = duration.minutes();
				const seconds = duration.seconds();
				settimeLeft({ days, hours, minutes, seconds });
			}
		}, 6000);

		return () => {
			clearInterval(updateCountdown);
		};
	}, []);

	return (
		<div
			className="group flex rounded-lg p-2 pe-0 m-4"
			style={{ backgroundColor: importance_map[importance] }}
		>
			<div className="flex gap-1 w-full justify-between">
				<div className="flex gap-4">
					<div className="flex flex-col justify-center">
						<span className="text-lg font-Inter font-bold text-[#E70000]">{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m left`}</span>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="text-base font-Inter truncate ... max-w-48 mb-1">
									{title}
								</TooltipTrigger>
								<TooltipContent className="bg-slate-600">
									{title}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<div className="flex text-xs font-Inter text-[#8C8C8C]">
							<span>{`Worked ${timeSpent}`}</span>
						</div>
					</div>
				</div>
				<div className="flex gap-1 items-center">
					<Meter
						percentage={per}
						importance={importance}
						size={65}
						gap={12}
						conincStart={85}
					>
						<TypeFiller type={type} per={per} varient="outline" />
					</Meter>
					<button type="button" className="flex items-center">
						<EllipsisVertical color="#BCBCBC" size={"30"} className="w-fit" />
					</button>
				</div>
			</div>
		</div>
	);
}
