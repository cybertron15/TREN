import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircleHelp } from "lucide-react";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
// visit for more info https://react-simple-star-rating.vercel.app/?path=/story/example--on-pointer-move

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import PerformanceCard from "@/components/PerformanceCard";

function Journal() {
	const [ratingValue, setRatingValue] = useState(0);

	const handleRating = (rate: number) => {
		setRatingValue(rate);
		console.log(rate);
	};
	return (
		<div className="h-svh flex px-1">
			<div className="w-fit h-full p-1 py-2">
				<DatePicker />
			</div>
			<div className="h-full p-1 w-[40%] py-2">
				<div className="relative flex flex-col h-full font-Inter bg-white p-3 rounded-xl">
					<CircleHelp
						className="absolute top-2 right-2"
						size={25}
						color="#8C8C8C"
						opacity={"50%"}
					/>
					<div className=" flex mb-1 p-3 gap-3">
						<div className="flex items-center gap-1">
							<div className="font-Inter text-5xl">1st April, Monday</div>
						</div>
						<div className="h-full flex items-end mt-1">
							<Select>
								<SelectTrigger className="text-2xl text-[#8C8C8C]">
									<SelectValue placeholder="Day 1" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Today">Day 1</SelectItem>
									<SelectItem value="Tomorrow">Day 2</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<hr className="w-full border-t-2" />

					<div className="relative p-3">
						<div className="text-2xl mt-2">
							How Satisfied are with your day?
						</div>
						<Rating
							onClick={handleRating}
							SVGstyle={{ display: "inline-block" }}
							transition={true}
							initialValue={0}
							// showTooltip={true}
							// tooltipArray={["Terrible", "Bad", "Average", "Great", "Prefect"]}
							fillColor="#F44949"
							className="mt-2"
						/>
						<div className="text-2xl mt-3">How was your day?</div>
						<Textarea
							placeholder="Write a summary how your day started and what you did thoughout the day."
							className="mt-2 h-40 text-slate-500"
						/>

						<div className="text-2xl mt-3">
							What could have been done to improve the day?
						</div>
						<Textarea
							placeholder="write 2-3 points on how you could have inproved your day."
							className="mt-2 h-40 text-slate-500"
						/>
						<Button className="w-full mt-10">Save Data</Button>
					</div>
				</div>
			</div>
			<div className="h-full p-1 flex-grow py-2">
				<div className="relative flex flex-col h-full font-Inter bg-white p-3 rounded-xl">
					<CircleHelp
						className="absolute top-2 right-2"
						size={25}
						color="#8C8C8C"
						opacity={"50%"}
					/>
					<div className="mb-1 p-3 gap-3">
						<div className="font-Inter text-5xl">Tasks Performance</div>
						<hr className="w-full border-t-2 mt-4" />

					</div>
					<div className="h-[85%]">
						<ScrollArea className="h-full px-2">
							<PerformanceCard/>
							<PerformanceCard/>
							<PerformanceCard/>
							<PerformanceCard/>
							<PerformanceCard/>
							<PerformanceCard/>
							<PerformanceCard/>
						</ScrollArea>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Journal;
