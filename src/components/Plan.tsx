import { CircleHelp, Settings2 } from "lucide-react";
import React from "react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select-mod";
import Meter from "./Meter";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import PlanCard from "./PlanCard";
import AddActivity from "./AddActivity";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Plans {
    task: string;
    type: string;
    duration: string;
    time: string;
    importance: number;
    percentage: number;
}

function getDateRange() {
    const today = new Date();
    const day = today.getDate();
    let startDay, endDay;

    if (day > 20) {
        startDay = 20;
        endDay = endOfMonth(today).getDate();
    } else if (day > 10) {
        startDay = 10;
        endDay = 20;
    } else {
        startDay = 1;
        endDay = 10;
    }

    return eachDayOfInterval({
        start: new Date(today.getFullYear(), today.getMonth(), startDay),
        end: new Date(today.getFullYear(), today.getMonth(), endDay),
    }).map((date) => format(date, "do MMM, EEE"));
}

function Plan() {
    const planCards: Plans[] = [];
    const dates = getDateRange();
    const todayFormatted = format(new Date(), "do MMM, EEE");

    return (
        <div className="relative h-full bg-white rounded-2xl p-3">
            <CircleHelp
                className="absolute top-2 right-2"
                size={25}
                color="#8C8C8C"
                opacity={"50%"}
            />

            <div className="flex gap-2 items-center">
                <div className="flex gap-2">
                    <div className="font-Inter text-4xl mt-2">Plan</div>
                    <HoverCard>
                        <HoverCardTrigger className="cursor-pointer">
                            <Meter
                                percentage={100}
                                size={52}
                                importance={4}
                                conicDiff={5}
                                conincStart={85}
                                gap={0}
                            >
                                <img src="/icons/target.png" alt="" className="mb-2.5 ms-2.5" />
                            </Meter>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            Current Plan Details
                            ---
                            Weekly Plan Details
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <div className="h-full pt-3">
                    <Select>
                        <SelectTrigger className="text-2xl text-[#8C8C8C]">
                            <SelectValue placeholder={todayFormatted} />
                        </SelectTrigger>
                        <SelectContent>
                            {dates.map((item) => (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex gap-2 items-center mt-2">
                <div className="text-slate-400">Day Start 07:00 AM</div>
                <Settings2 size={15} className="mt-0.5 text-slate-600 cursor-pointer" />
            </div>
            <ScrollArea className="px-3 py-2 border-s-4 ms-1 h-[75%]">
                <div>
                    {planCards.length === 0 ? (
                        <div className="text-gray-400 text-center p-10">
                            Looks like you don't have a plan for the day. Plan the day by adding new tasks or <span className="underline">Use Existing Plan</span>
                        </div>
                    ) : (
                        <>
                            {planCards.map((plan, index) => (
                                <PlanCard
                                    key={`${index}${plan.task}`}
                                    task={plan.task}
                                    type={plan.type}
                                    duration={plan.duration}
                                    time={plan.time}
                                    importance={plan.importance}
                                    percentage={plan.percentage}
                                />
                            ))}
                        </>
                    )}
                </div>
            </ScrollArea>
            <div className="text-slate-400">Day End 10:00 AM</div>
            <div className="mt-1 flex justify-end gap-2">
                <Button className="font-Inter">Save Plan</Button>
                <AddActivity />
            </div>
        </div>
    );
}

export default Plan;
