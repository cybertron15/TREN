import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Title() {
	return (
		<div className="flex gap-4 bg-white rounded-xl px-1 justify-between w-full">
			<div className="flex flex-col justify-center font-JetBrainsMono h-full">
				<span className=" text-black text-[50px] leading-none">FEB</span> 
				<span className=" text-black text-[30px] leading-none">TRE<span className="text-red-500">N2</span> </span> 
			</div>
			<div className="flex items-center py-3">
				<Avatar className="w-full h-full ring-4 ring-red-500">
					<AvatarImage src="/avatar.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}

export default Title;
