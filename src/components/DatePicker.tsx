import { ChevronDown, ChevronUp } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";

function DatePicker() {
	const [year, setyear] = useState(moment().year());
    const [month, setmonth] = useState(moment.monthsShort()[moment().month()])
    const [week, setweek] = useState("Week 1")    
	return (
		<div className="flex flex-col h-full font-Inter bg-white p-3 rounded-xl">
			<div className="flex gap-2 items-center my-2">
				<div className="text-6xl first-letter:text-black text-[#F44949]">
					{year}
				</div>
				<div className="flex flex-col">
					<button
						type="button"
						onClick={() => {
							setyear(year + 1);
						}}
					>
						<ChevronUp
							className=""
							strokeWidth={"5"}
							color="#BCBCBC"
							size={28}
						/>
					</button>
					<button
						type="button"
						onClick={() => {
							setyear(year - 1);
						}}
					>
						<ChevronDown
							className=""
							strokeWidth={"5"}
							color="#BCBCBC"
							size={28}
						/>
					</button>
				</div>
			</div>
			<div className="flex h-full py-2">
				<div className="flex flex-col justify-between h-full py-1 ps-2">
					{moment.monthsShort().map((item) => {
						return (
							<button onClick={()=>{setmonth(item)}} type="button" key={item} className={`text-2xl me-3 ${month===item?"text-red-600":"text-[#9A9A9A]"} hover:text-red-600`}>
								{item}
							</button>
						);
					})}
				</div>

                <div className="w-1 h-full bg-[#BCBCBC] opacity-40 rounded-lg"/>
                <div className="flex flex-col justify-between h-full py-1 ms-4">
                    {["TREN 1","TREN 2","TREN 3"].map((item) => {
						return (
							<button onClick={()=>{setweek(item)}} type="button" key={item} className={`text-2xl me-3 ${week===item?"text-red-600":"text-[#9A9A9A]"} hover:text-red-600`}>
								{item}
							</button>
						);
					})}
                </div>
			</div>
		</div>
	);
}

export default DatePicker;
