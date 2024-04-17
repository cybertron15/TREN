import React, {useState} from "react";
type props = {
	taskName: string;
	timer: number;
};
export default function Timer({ taskName, timer }: props) {
	// const color = "#FB7474"
	const bgColor = "white";
	const counterColor = "#FB7474";
	const counterBgColor = "white";
	const per = 50;
	const time = new Date()
    const [start, setStart] = useState(false);
	return (
		<div className="bg border-4 rounded-2xl w-72 h-72 p-4">
			<div
				style={{
					background: `radial-gradient(closest-side, ${bgColor} 88%, transparent 90% 100%), 
                    conic-gradient(${counterColor} ${per}%, ${counterBgColor} 0)`,
				}}
				className="w-full h-full rounded-full flex flex-col justify-center items-center gap-2 pt-6"
			>
				<div className="border border-[#FB7474] py-1 px-4 rounded-3xl">{taskName}</div>
				<div className="text-4xl font-PlexMono">{"02:22:01"}</div>
				<button
					className="rounded-full flex justify-center items-center"
					type="button"
					onClick={() => {
						setStart(!start);
					}}
				>
						<img src={`icons/${start?"play-red":"pause-red"}.png`} alt="" className="w-14 h-14 m-auto shadow-xl rounded-full" />
				
				</button>
			</div>
		</div>
	);
}
