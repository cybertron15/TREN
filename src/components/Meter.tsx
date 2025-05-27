// biome-ignore lint/style/useImportType: <explanation>
import React from "react";

type Props = {
	percentage: number,
	size:number,
	importance: number,
	conincStart?: number,
	conicDiff?: number,
	gap?: number,
	children: React.ReactNode;
}
function Meter({
	percentage,
	size,
	importance = 4,
	conincStart = 80,
	conicDiff = 5,
	gap = 5,
	children,
}: Props) {
	// const importance_map = {
	// 	1: "#F6E5D9",
	// 	2: "#FAF4BE",
	// 	3: "#D4EDFB",
    //     4: "white"
	// };
	
	

	const bgColor = "hsl(var(--muted))";
	const counterColor = "hsl(var(--primary))";
	const counterBgColor = "hsl(var(--accent))";
	return (
		<div
			className="group rounded-full flex justify-center items-center"
			style={{
				background: `radial-gradient(closest-side, ${bgColor} ${conincStart}%, transparent ${conincStart + conicDiff}% 100%), conic-gradient(${counterColor} ${percentage}%, ${counterBgColor}  0)`,
				width: size,
				height: size,
				padding: gap,
			}}
		>
			{children}
		</div>
	);
}

export default Meter;
