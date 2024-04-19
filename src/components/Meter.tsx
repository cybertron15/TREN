import React from "react";

function Meter({
	percentage,
	size,
	importance,
	conincStart = 80,
	conicDiff = 5,
	gap = 5,
	children,
}) {
	const importance_map = {
		1: "#F6E5D9",
		2: "#FAF4BE",
		3: "#D4EDFB",
	};

	const per_colors = {
		bad: "#FF9A9A",
		good: "#FFBF1B",
		excelent: "#A4CA92",
	};
	return (
		<div
			className="group rounded-full flex justify-center items-center"
			style={{
				background: `radial-gradient(closest-side, ${
					importance_map[importance]
				} ${conincStart}%, transparent ${conincStart + conicDiff}% 100%), conic-gradient(${
					Number(percentage) >= 75
						? per_colors.excelent
						: Number(percentage) >= 30
							? per_colors.good
							: per_colors.bad
				} ${percentage}%, ${importance_map[importance]}  0)`,
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
