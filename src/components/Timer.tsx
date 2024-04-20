import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { CircleHelp } from "lucide-react";
type props = {
	taskName: string;
	timer: { hours: number; minutes: number; seconds: number };
};
export default function Timer({ taskName, timer }: props) {
	// const color = "#FB7474"
	const bgColor = "white";
	const counterColor = "#FB7474";
	const counterBgColor = "#FFE8E8";
	const [per, setper] = useState(0);
	const duration = moment.duration(timer, "second");
	const spentTime = useRef(moment.duration(0, "second"));

	const [start, setStart] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const interval = setInterval(() => {
			if (spentTime.current.asSeconds() <= duration.asSeconds() && start) {
				let newPer =
					(spentTime.current.asSeconds() / duration.asSeconds()) * 100;
				newPer = Number(newPer.toFixed(2));
				setper(newPer);
				spentTime.current.add(100, "milliseconds");
			} else {
				clearInterval(interval);
				// spentTime.current = spentTime.asSeconds()
			}
		}, 100);

		return () => {
			clearInterval(interval);
			// spentTimeTime.current = spentTime.asSeconds()
		};
	}, [start]);

	return (
		<div className="relative border-4 rounded-2xl w-72 h-72 p-4">
			<button type="button" className="absolute top-2 right-2">
				<CircleHelp className=" border-red-500" size={30} color="#8C8C8C" opacity={"50%"}/>
			</button>

			<div
				style={{
					background: `radial-gradient(closest-side, ${bgColor} 88%, transparent 90% 100%), 
                    conic-gradient(${counterColor} ${per}%, ${counterBgColor} 0)`,
				}}
				className="w-full h-full rounded-full flex flex-col justify-center items-center gap-2 pt-6"
			>
				<div className="border border-[#FB7474] py-1 px-4 rounded-3xl">
					{taskName}
				</div>
				<div className="text-4xl font-PlexMono">{`${moment
					.utc(spentTime.current.asMilliseconds())
					.format("HH:mm:ss")}`}</div>
				<button
					className="rounded-full flex justify-center items-center"
					type="button"
					onClick={() => {
						setStart(!start);
					}}
				>
					<img
						src={`icons/${start ? "pause-red" : "play-red"}.png`}
						alt=""
						className="w-14 h-14 m-auto shadow-xl rounded-full"
					/>
				</button>
			</div>
		</div>
	);
}
