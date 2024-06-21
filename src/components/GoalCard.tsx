import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import Meter from "./Meter";
import TypeFiller from "./TypeFiller";
import moment, { Moment, duration } from "moment";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

type Props = {
	id: string;
	completion: number;
	deadline: string;
	category: string;
	priority:string
	name: string;
	importance: string;
	workedFor: string;
};

export default function GoalCard({
	id,
	completion,
	deadline,
	category,
	priority,
	name,
	importance,
	workedFor 
}: Props) {
	const [per, setpercentage] = useState(completion);
	const targetDate = moment(deadline);
	const now = moment()
	const [timeLeft, settimeLeft] = useState(getDateParts(moment.duration(targetDate.diff(now))));
	// console.log(workedFor);
	
	// console.log(getDateParts(moment.duration(moment(deadline).second())));
	
	function getWorkedFormatedDuration(duration: string) {
		let day = 0
		const fragments = duration.split(" ")
		console.log(fragments);
		
		if (fragments.length > 1){
			day =  Number.parseInt(fragments[0])
			const [hour , minutes, seconds] = fragments[1].split(":")
			return `${day}d ${hour}h ${minutes}m`
		}
		const [hour , minutes, seconds] = fragments[0].split(":")
			return `${day}d ${hour}h ${minutes}m`
	}
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

	function getDateParts(duration: moment.Duration){
		// Extract days, hours, minutes, and seconds from the duration
		const days = Math.floor(duration.asDays());
		const hours = duration.hours();
		const minutes = duration.minutes();
		const seconds = duration.seconds();
		return { days, hours, minutes, seconds }
	}


	// Set an interval to update the countdown every second
	useEffect(() => {
		// Function to update the countdown
		const updateCountdown = setInterval(() => {
			const now = moment(); // Current time
			const duration = moment.duration(targetDate.diff(now)); // Time remaining
			if (duration.asSeconds() <= 0) {
				clearInterval(updateCountdown);
			} 
			else{
				settimeLeft(getDateParts(duration))
			}
		}, 60000);

		return () => {
			clearInterval(updateCountdown);
		};
	});

	return (
		<div
			className="group flex rounded-lg p-2 pe-0 my-2"
		>
			<div className="flex gap-1 w-full justify-between">
				<div className="flex gap-4">
					<div className="flex flex-col justify-center">
						<span className="text-lg font-Inter font-bold text-[#E70000]">{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m left`}</span>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="text-base text-start font-Inter truncate ... max-w-48 mb-1">
									{name}
								</TooltipTrigger>
								<TooltipContent className="bg-slate-600">
									{name}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<div className="flex text-xs font-Inter text-[#8C8C8C]">
							<span>{getWorkedFormatedDuration(workedFor)}</span>
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
						<TypeFiller type={category} per={per} varient="outline" />
					</Meter>
					<button type="button" className="flex items-center">
						<EllipsisVertical color="#BCBCBC" size={"30"} className="w-fit" />
					</button>
				</div>
			</div>
		</div>
	);
}
