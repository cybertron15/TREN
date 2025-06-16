"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { CircleHelp, Pause, Play } from "lucide-react";

type Props = {
	totalTime: { hours: number; minutes: number; seconds: number };
	setStats?: Dispatch<SetStateAction<{
		per: number,
		elapsedTime: number
	}>>
};



export default function Timer({ totalTime, setStats }: Props) {
	const bgColor = "hsl(var(--muted))";
	const counterColor = "hsl(var(--primary))";
	const counterBgColor = "hsl(var(--accent))";

	const totalDuration = totalTime.hours * 3600 + totalTime.minutes * 60 + totalTime.seconds;
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
						const newPer = Math.round((newTime / totalDuration) * 100);
						setPer(newPer);
						if (setStats) {
							setStats({ per: newPer, elapsedTime: newTime })
						}
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

		<div className="relative rounded-2xl w-[45%] aspect-square p-4">
			<div
				style={{
					background: `
								    radial-gradient(closest-side, ${bgColor} 80%, transparent 82.5%),
								    conic-gradient(${counterColor} ${per}%, ${counterBgColor} 0)
								  `,
				}}
				className="w-full h-full rounded-full flex flex-col justify-center items-center gap-2"
			>
				<button
					className="relative h-full appearance-none shadow-none rounded-full flex justify-center items-center cursor-pointer w-full"
					type="button"
					onClick={() => setStart(!start)}
				>
					{start ?
						<Pause fill="currentColor" stroke="0" className="w-[50%] h-[50%] aspect-square m-auto shadow-xl rounded-full text-gray-400" />
						:
						<Play fill="currentColor" stroke="0" className="w-[50%] h-[50%] aspect-square m-auto shadow-xl rounded-full ps-1 text-gray-400" />
					}

				</button>
			</div>
		</div>

	);
}