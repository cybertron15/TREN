import React, { Children, useState } from "react";
import Meter from "./Meter";
import TypeFiller from "./TypeFiller";

type props = {
	duration: string;
	strength: number;
	money: number;
	brain: number;
};
function StatCard({ strength, money, brain, duration }: props) {
	const importance_map = {
		1: "#F6E5D9",
		2: "#FAF4BE",
		3: "#D4EDFB",
	};

	const type_map = {
		strength: "strength-solid.png",
		money: "money-solid.png",
		brain: "brain-solid.png",
	};
	const per_colors = {
		bad: "#FF9A9A",
		good: "#FFBF1B",
		excelent: "#A4CA92",
	};
	const power = Math.round((strength + money + brain) / 3);
    
	const types = {
		strength,
		money,
		brain,
        power
	};
	Object.keys(types).map(() => {});
	return (
		<div className="w-full flex flex-col gap-2">
			<div className="text-center">{duration}</div>
			<div className="flex justify-between">
				{Object.keys(types).map((item, index) => {

					return (
							<Meter
								percentage={types[item]}
								importance={"4"}
								size={46}
								gap={8}
								conincStart={85}
                                key={item}
							>
								<TypeFiller type={item} varient={"solid"} per={types[item]} />
							</Meter>
					);
				})}
			</div>
		</div>
	);
}

export default StatCard;
