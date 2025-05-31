import { BicepsFlexed, Brain, CircleDollarSign, Pause, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import Meter from "../Meter";

type Props = {
    goal: string;
    category: string;
    priority: number;
    timeLeft: string; // Format: "X days Y hours left"
    selected?: boolean;
    completion: number; // Percentage completion
};

export default function DeadLineCard({
    goal,
    category,
    timeLeft,
    selected,
    priority,
    completion,
}: Props) {
    const [per, setpercentage] = useState(completion);
    const [start, setStart] = useState(false);

    const priority_map = {
        1: "High",
        2: "Mid",
        3: "Low",
    };
    const category_map = {
        strength: BicepsFlexed,
        brain: Brain,
        money: CircleDollarSign,
    }

    const CategoryIcon = ({ category }: { category: keyof typeof category_map }) => {
        const Icon = category_map[category];
        return (
            <div>
                <Icon
                    className="w-[80%] h-[80%] aspect-square m-auto shadow-xl rounded-full text-gray-400"
                />
            </div>
        );
    };


    return (
        <div
            className={`relative flex flex-col w-full rounded-lg p-2 py-3.5 pe-0 bg-muted mb-3 ${selected && " border border-primary shadow-lg"}`}
        >
            <div className="absolute flex w-full justify-end text-[0.6rem] px-1 top-1 right-1">
                <div className="flex items-center gap-1">

                    <span
                        className={
                            priority_map[priority as keyof typeof priority_map] === "High"
                                ? "text-primary"
                                : priority_map[priority as keyof typeof priority_map] === "Mid"
                                    ? "text-yellow-600"
                                    : "text-green-700"
                        }
                    >
                        {priority_map[priority as keyof typeof priority_map]}
                    </span>
                    <div
                        className={`w-1.5 h-1.5 rounded-full ${priority_map[priority as keyof typeof priority_map] === "High"
                            ? "bg-primary"
                            : priority_map[priority as keyof typeof priority_map] === "Mid"
                                ? "bg-yellow-600"
                                : "bg-green-700"
                            }`}
                    />
                </div>

            </div>
            <div className="flex gap-2 cursor-pointer items-center">
                <Meter
                    percentage={per}
                    importance={priority}
                    size={34}
                    gap={3}
                    conincStart={85}
                >
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <div >

                        {/* <Pause fill="currentColor" stroke="0" className="w-[80%] h-[80%] aspect-square m-auto shadow-xl rounded-full text-gray-400" />

                        <Play fill="currentColor" stroke="0" className="w-[80%] h-[80%] aspect-square m-auto shadow-xl rounded-full text-gray-400 ps-0.5" /> */}
                        <CategoryIcon  category={category as keyof typeof category_map} />
                    </div>
                </Meter>
                <div className="flex flex-col justify-center text-start">
                    <div className="flex gap-1">
                        <span className="text-sm font-Inter truncate ... max-w-24" title={goal}>
                            {goal}
                        </span>
                    </div>
                    <div className="flex text-xs font-Inter text-primary">
                        <span>
                            only {timeLeft}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
