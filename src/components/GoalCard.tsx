"use client"
import React, { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import Meter from "./Meter";
import TypeFiller from "./TypeFiller";
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    parseISO,
} from "date-fns";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";

type Props = {
    id: string;
    completion: number;
    deadline: string;
    category: string;
    priority: string;
    name: string;
    importance: string;
    workedFor: string;
};

export default function GoalCard({
    id,
    completion,
    deadline,
    category,
    priority,
    name,
    importance,
    workedFor,
}: Props) {
    const [per, setpercentage] = useState(completion);
    const targetDate = parseISO(deadline);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

    function getWorkedFormattedDuration(duration: string) {
        let day = 0;
        const fragments = duration.split(" ");

        if (fragments.length > 1) {
            day = Number.parseInt(fragments[0]);
            const [hour, minutes, seconds] = fragments[1].split(":");
            return `${day}d ${hour}h ${minutes}m`;
        }
        const [hour, minutes, seconds] = fragments[0].split(":");
        return `${day}d ${hour}h ${minutes}m`;
    }

    function getTimeLeft(targetDate: Date) {
        const now = new Date();
        const days = differenceInDays(targetDate, now);
        const hours = differenceInHours(targetDate, now) % 24;
        const minutes = differenceInMinutes(targetDate, now) % 60;
        return { days, hours, minutes };
    }

    useEffect(() => {
        const updateCountdown = setInterval(() => {
            const now = new Date();
            if (targetDate.getTime() - now.getTime() <= 0) {
                clearInterval(updateCountdown);
            } else {
                setTimeLeft(getTimeLeft(targetDate));
            }
        }, 60000);

        return () => clearInterval(updateCountdown);
    }, [targetDate]);

    return (
        <div
            className={`relative group flex rounded-lg p-2 pe-0 my-2 ${
                timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 ? "animate-pulse" : ""
            }`}
        >
            {timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && (
                <Badge className="absolute right-0 top-2">Due</Badge>
            )}
            <div className="flex gap-1 w-full justify-between">
                <div className="flex gap-4">
                    <div className="flex flex-col justify-center">
                        <span className="text-lg font-Inter font-bold text-[#E70000]">
                            {`${timeLeft.days <= 0 ? 0 : timeLeft.days}d ${timeLeft.hours <= 0 ? 0 : timeLeft.hours}h ${timeLeft.minutes <= 0 ? 0 : timeLeft.minutes}m left`}
                        </span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="text-base text-start font-Inter truncate ... max-w-48 mb-1">
                                    {name}
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-600">{name}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className="flex text-xs font-Inter text-[#8C8C8C]">
                            <span>{getWorkedFormattedDuration(workedFor)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    <Meter
                        percentage={per}
                        importance={Number.parseFloat(importance)}
                        size={65}
                        gap={12}
                        conincStart={85}
                    >
                        <TypeFiller type={category} per={per} varient="outline" />
                    </Meter>
                    <button type="button" className="flex items-center">
                        <EllipsisVertical color="#BCBCBC" size={"30"} className="w-fit" />
                    </button>
                </div>
            </div>
        </div>
    );
}
