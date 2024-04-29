import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Title() {
	return (
		<div className="flex gap-2 bg-white rounded-xl px-4 justify-between">
			<div className="flex items-center text-8xl font-JetBrainsMono ">
				<span className="first-letter:text-black text-red-500">TREN</span> 
			</div>
			<div className="flex items-center">
				<Avatar className="w-16 h-16 ring-2 ring-red-500">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}

export default Title;
