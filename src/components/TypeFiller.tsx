import React from "react";

function TypeFiller({ type, per, varient="" }) {
	
	const per_colors = {
		bad: "#FF9A9A",
		good: "#FFBF1B",
		excelent: "#A4CA92",
	};
	return (
		<>
			<img
				src={`icons/${type}${varient?`-${varient}`:varient}.png`}
				alt="muscle"
				className="w-full h-full group-hover:hidden"
			/>

			<div className="w-11 hidden group-hover:block">
				<div
					className="text-center"
					style={{
						color:
							Number(per) >= 75
								? per_colors.excelent
								: Number(per) >= 30
									? per_colors.good
									: per_colors.bad,
					}}
				>
					<span>{per}%</span>
				</div>
			</div>
		</>
	);
}

export default TypeFiller;
