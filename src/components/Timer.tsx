import React, { useEffect, useRef, useState } from "react";
import { differenceInSeconds, format } from "date-fns";
import { CircleHelp } from "lucide-react";

type Props = {
	taskName: string;
	timer: { hours: number; minutes: number; seconds: number };
};

export default function Timer({ taskName, timer }: Props) {
	const bgColor = "white";
	const counterColor = "#FB7474";
	const counterBgColor = "#FFE8E8";

	const totalDuration =
		timer.hours * 3600 + timer.minutes * 60 + timer.seconds;
	const spentTime = useRef(0);
	const [per, setPer] = useState(0);
	const [start, setStart] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;
		if (start) {
			interval = setInterval(() => {
				setElapsedTime((prev) => {
					if (prev < totalDuration) {
						const newTime = prev + 1;
						setPer((newTime / totalDuration) * 100);
						return newTime;
					}
					
					if (interval) clearInterval(interval);
					return prev;

				});
			}, 1000);
		} else if (interval) {
			clearInterval(interval);
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [start, totalDuration]);

	return (
		<div className="relative rounded-2xl w-full h-full flex justify-center items-center p-4">
			<button type="button" className="absolute top-2 right-2">
				<CircleHelp className="border-red-500" size={25} color="#8C8C8C" opacity={"50%"} />
			</button>
			<div className="relative rounded-2xl w-64 h-64 p-4">
				<div
					style={{
						background: `radial-gradient(closest-side, ${bgColor} 88%, transparent 90% 100%), 
                    conic-gradient(${counterColor} ${per}%, ${counterBgColor} 0)`,
					}}
					className="w-full h-full rounded-full flex flex-col justify-center items-center gap-2 pt-6"
				>
					<div className="border border-[#FB7474] py-1 px-4 rounded-3xl">{taskName}</div>
					<div className="text-4xl font-PlexMono">
						{format(new Date(elapsedTime * 1000), "HH:mm:ss")}
					</div>
					<button
						className="rounded-full flex justify-center items-center"
						type="button"
						onClick={() => setStart(!start)}
					>
						<img
							src={`/icons/${start ? "pause-red" : "play-red"}.png`}
							alt="start"
							className="w-14 h-14 m-auto shadow-xl rounded-full"
						/>
					</button>
				</div>
			</div>
		</div>
	);
}