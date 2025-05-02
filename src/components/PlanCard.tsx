import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";
import Meter from "./Meter";
import TypeFiller from "./TypeFiller";
import { format, formatDuration, intervalToDuration } from "date-fns";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

type Props = {
    task: string;
    type: string;
    duration: number; // Assume duration is in minutes
    time: number; // Assume time is a timestamp (UNIX epoch)
    importance: string;
    percentage: number;
};

function PlanCard({
    task,
    type,
    duration,
    time,
    importance,
    percentage,
}: Props) {
    const [per, setpercentage] = useState(percentage);

    const importance_map = {
        1: "white",
        2: "white",
        3: "white",
    };

    // Format the timestamp into a readable time
    const formattedTime = format(new Date(time), "hh:mm a");

    // Convert duration (in minutes) into a readable format (e.g., 1h 30m)
    const formattedDuration = formatDuration(
        intervalToDuration({ start: 0, end: duration * 60 * 1000 })
    );

    return (
        <div
            className="flex justify-between rounded-lg py-0/5"
            style={{ backgroundColor: importance_map[importance] }}
        >
            <div className="flex gap-2 items-center text-[0.7rem]">
                <div className="flex flex-col gap-1.5">
                    <div className="w-[30px] flex justify-center">
                        <div className="h-3 w-[0.15rem] bg-black" />
                    </div>
                    <div className="group">
                        <Meter percentage={per} importance={importance} size={30} gap={4}>
                            <TypeFiller type={type} varient={"solid"} per={per} />
                        </Meter>
                    </div>
                    <div className="w-[30px] flex justify-center">
                        <div className="h-3 w-[0.15rem] bg-black" />
                    </div>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="text-start text-sm font-Inter truncate ... w-32">
                            {task}
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-600">{task}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <span className="text-xs text-slate-500">
                    {formattedTime} | {formattedDuration}
                </span>
            </div>
            <div className="flex items-center gap-2 p-2">
                <button type="button" className="hover:text-red-600">
                    <Trash size={20} />
                </button>
                <button type="button" className="hover:text-red-600">
                    <Pen size={20} />
                </button>
            </div>
        </div>
    ); 	
}

export default PlanCard;
