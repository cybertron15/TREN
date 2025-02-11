import { Skeleton } from "../ui/skeleton";
import React from "react";


export default function SkeletonTaskcard() {
    return (
        <div
            className="flex w-full rounded-lg p-2 pe-0"
        >
            <div className="flex justify-between w-full">
                <div className="flex gap-4 w-full">
                    <div className="borde flex flex-col justify-center">
                        {/* Img skeleton */}
                        <Skeleton className="w-9 h-9 rounded-full" />
                    </div>
                    <div className="flex flex-col gap-1 justify-center text-start w-full pe-2">
                        <div className="flex gap-1">
                            <Skeleton className="w-full h-4" />
                        </div>
                        <div className="flex text-xs font-Inter text-[#8C8C8C]">
                            <span className="flex gap-2">
                                <Skeleton className="w-20 h-4"/><Skeleton className="w-20 h-4"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
