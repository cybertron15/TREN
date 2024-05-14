import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Rating } from "react-simple-star-rating";
import { Pen, Info } from "lucide-react";

type Props = {
	work: string;
	plan: string;
	type: string;
	duration: string;
	complition: string;
};

function PerformanceCard({ work, plan, type, duration, complition}: Props) {
	const [ratingValue, setRatingValue] = useState(0);
	const [toggleEditMode, settoggleEditMode] = useState(false);
	const [info, setinfo] = useState({ work, plan });
	const handleRating = (rate: number) => {
		setRatingValue(rate);
		console.log(rate);
	};
	return (
		<div className="p-3 border-2 rounded-lg mt-2">
			<div className="flex items-center gap-2 w-full justify-between">
				<div className="flex gap-2">
					<img
						src={`icons/${type}-solid.png`}
						alt="muscle"
						className="w-full h-full group-hover:hidden"
					/>
					<div className="text-2xl">GYM</div>
					<button
						type="button"
						className="hover:text-red-600"
						onClick={() => {
							settoggleEditMode(!toggleEditMode);
						}}
					>
						{toggleEditMode ? (
							<Info size={20} color="grey" />
						) : (
							<Pen size={20} color="grey" />
						)}
					</button>
				</div>
				<Rating
					onClick={handleRating}
					SVGstyle={{ display: "inline-block" }}
					transition={true}
					initialValue={0}
					// showTooltip={true}
					tooltipArray={["Terrible", "Bad", "Average", "Great", "Prefect"]}
					tooltipClassName="text-sm"
					fillColor="#F44949"
					className=""
					size={30}
				/>
			</div>
			<div className="text-slate-500 mt-1 text-sm">
				Worked for {duration} | {complition}% completed
			</div>
			<hr className="w-full border-t-2 mt-2" />

			{toggleEditMode ? (
				<div>
					<div className="text-lg mt-2">What did you work on?</div>
					<Textarea
						className="mt-2 h-20 text-slate-500"
						placeholder="Write what you did today"
						value={info.work}
						onChange={(e) => {
							setinfo({ ...info, work: e.target.value });
						}}
					/>
					<div className="text-lg mt-2">What's your plan for tomorrow?</div>
					<Textarea
						className="mt-2 h-20 text-slate-500"
						placeholder="Write what you need to get done tomorrow"
						value={info.plan}
						onChange={(e) => {
							setinfo({ ...info, plan: e.target.value });
						}}
					/>
					<div className="flex gap-2 mt-4 w-full hidden">
						<Button
							variant={"outline"}
							className="hover:border-red-500 flex-grow"
							onClick={() => {
								settoggleEditMode(!toggleEditMode);
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								settoggleEditMode(!toggleEditMode);
							}}
							className="flex-grow"
						>
							Save
						</Button>
					</div>
				</div>
			) : (
				<>
					<div className="text-sm mt-2">{"What I did"}</div>
					<div className="text-sm text-slate-500">
						{info.work?.length >= 5 ? info.work : "-"}
					</div>
					<div className="text-sm mt-2">{"Plan for tomorrow"}</div>
					<div className="text-sm text-slate-500">
						{info.plan?.length >= 5 ? info.plan : "-"}
					</div>
				</>
			)}
		</div>
	);
}

export default PerformanceCard;
