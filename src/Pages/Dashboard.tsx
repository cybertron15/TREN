import Goals from "@/components/Goals";
import Plan from "@/components/Plan";
import StatCard from "@/components/StatCard";
import Tasks from "@/components/Tasks";
import Timer from "@/components/Timer";
import Title from "@/components/Title";
import { CircleHelp } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Dashbaord() {
	return (
		<div className="flex flex-col h-[100vh]">
			<div className="flex h-[15%]">
				<div className="w-[25%] p-1 pt-2 ps-2">
					<div className="flex gap-3 bg-white rounded-xl px-4 justify-between w-full h-full">
						<Title />
					</div>
				</div>
				<div className="p-1 pt-2 pe-2 w-[75%]">
					<div className="relative bg-white flex justify-around rounded-2xl h-full p-1">
						<CircleHelp
							className="absolute top-2 right-2"
							size={25}
							color="#8C8C8C"
							opacity={"50%"}
						/>
						<div className="w-[20%] text-xl">
							<StatCard
								duration={"Yesterday"}
								strength={50}
								money={80}
								brain={20}
							/>
						</div>
						<div className="w-[20%] text-xl">
							<StatCard
								duration={"Today"}
								strength={50}
								money={80}
								brain={20}
							/>
						</div>
						<div className="w-[20%] text-xl">
							<StatCard duration={"Week"} strength={50} money={80} brain={20} />
						</div>
						<div className="w-[20%] text-xl">
							<StatCard
								duration={"Month"}
								strength={50}
								money={80}
								brain={20}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex h-[85%] ">
				<div className="w-[25%] p-1 ps-2 pb-2 h-full">
					<Tasks />
				</div>
				<div className="w-[25%] flex flex-col">
					<div className="h-[40%] p-1">
						<div className="h-full bg-white rounded-2xl">
							<Timer
								taskName={"DSA"}
								timer={{
									hours: 0,
									minutes: 4,
									seconds: 2,
								}}
							/>
						</div>
					</div>
					<div className="flex-grow p-1 pb-2 h-[60%]">
						<div className="h-full bg-white rounded-2xl">
							<Goals />
						</div>
					</div>
				</div>
				<div className="h-full w-[30%] p-1 pb-2">
					<Plan />
				</div>
				<div className="w-[20%] h-[100%] p-1 pb-2 flex flex-col gap-2">
					<div className="bg-white rounded-xl w-full h-[40%] flex justify-center items-center">
						Analytics
					</div>
					<div className="bg-white rounded-xl w-full h-[20%] flex justify-center items-center">
						GYM
					</div>
					<div className="bg-white rounded-xl w-full h-[20%] flex justify-center items-center">
						Nutrition
					</div>
					<Link to="/journal" className="bg-white rounded-xl w-full h-[20%] flex justify-center items-center">
						<div className="">
							Journal
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Dashbaord;
