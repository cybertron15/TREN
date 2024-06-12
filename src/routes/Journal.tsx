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
import { CircleHelp, Home, HomeIcon } from "lucide-react";
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
import { Link } from "react-router-dom";

function Journal() {
	const [ratingValue, setRatingValue] = useState(0);
	const performanceData = [
		{
			work: "Morning workout - 30 mins cardio, 20 mins strength training.",
			plan: "Meal prep for the week, grocery shopping for healthy ingredients.",
			type: "strength",
			duration: "1 hour 30 mins",
			completion: "80%",
			reason: "",
			task: "Fitness"
		},
		{
			work: "Read a chapter of 'Atomic Habits' book, practiced meditation for 15 mins.",
			plan: "Attend mindfulness workshop to improve focus and reduce stress.",
			type: "brain",
			duration: "1 hour",
			completion: "70%",
			reason: "Work emergency",
			task: "Personal Growth"
		},
		{
			work: "Scheduled and attended doctor's appointment for annual check-up.",
			plan: "Plan weekend getaway with family, research on nearby vacation spots.",
			type: "money",
			duration: "2 hours",
			completion: "90%",
			reason: "",
			task: "Health & Wellness"
		},
		{
			work: "Worked on passion project - painting a landscape, explored new painting techniques.",
			plan: "Visit art gallery for inspiration, connect with local artists for collaboration.",
			type: "brain",
			duration: "2 hours 30 mins",
			completion: "60%",
			reason: "Lack of motivation",
			task: "Creativity"
		},
		{
			work: "Volunteered at local homeless shelter, served meals to those in need.",
			plan: "Donate unused clothes and household items to charity.",
			type: "money",
			duration: "3 hours",
			completion: "85%",
			reason: "",
			task: "Community Service"
		},
		{
			work: "Spent quality time with family - played board games, cooked dinner together.",
			plan: "Plan family movie night, research on family-friendly movies.",
			type: "strength",
			duration: "2 hours",
			completion: "75%",
			reason: "",
			task: "Family Time"
		},
		{
			work: "Attended language exchange meetup, practiced conversational Spanish.",
			plan: "Enroll in online language course for advanced Spanish learning.",
			type: "brain",
			duration: "1 hour 45 mins",
			completion: "95%",
			reason: "",
			task: "Language Learning"
		},
		{
			work: "Attended financial planning seminar, reviewed monthly budget and expenses.",
			plan: "Consult with financial advisor to discuss investment opportunities.",
			type: "money",
			duration: "2 hours 15 mins",
			completion: "85%",
			reason: "",
			task: "Financial Management"
		},
		{
			work: "Visited elderly neighbor, helped with grocery shopping and household chores.",
			plan: "Plan visit to nursing home to spend time with elderly residents.",
			type: "strength",
			duration: "1 hour 30 mins",
			completion: "90%",
			reason: "",
			task: "Community Outreach"
		},
		{
			work: "Explored new hiking trail, enjoyed outdoor adventure with friends.",
			plan: "Plan camping trip with friends, research on camping gear.",
			type: "strength",
			duration: "3 hours",
			completion: "70%",
			reason: "Bad weather",
			task: "Outdoor Exploration"
		}
	];
	
	

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
			<div className="relative h-full p-1 flex-grow py-2">
			<Link to={"/dashboard"} className="absolute border-8 rounded-full top-0 right-0 p-2 w-fit cursor-pointer">
						<Home size={25} className="text-red-500" />
					</Link>
			<div className=" flex flex-col h-full font-Inter bg-white p-3 rounded-xl">
					
					{/* <CircleHelp
						className="absolute top-2 right-2"
						size={25}
						color="#8C8C8C"
						opacity={"50%"}
					/> */}
					<div className="mb-1 p-3 gap-3">
						<div className="font-Inter text-5xl">Tasks Performance</div>
						<hr className="w-full border-t-2 mt-4" />
					</div>
					<div className="h-[85%]">
						<ScrollArea className="h-full px-2">
							{performanceData.map((item, index) => {
								return (
									<PerformanceCard
										task={item.task}
										work={item.work}
										plan={item.plan}
										type={item.type}
										duration={item.duration}
										complition={item.completion}
										reasons={item.reasons}
									/>
								);
							})}
						</ScrollArea>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Journal;
