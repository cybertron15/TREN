"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import { CustomPiechart } from './custom-piechart';

function PieChartContainer() {

    const [range, setrange] = useState("today");
    const ranges = ['week', 'month', 'year']
    return (
        <div className='flex flex-col gap-1 h-full'>
            <div className='flex justify-between items-center gap-2 '>
                <div className='flex gap-2'>
                    <span className='text-xl'>Impact hours</span>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='hover:bg-background/50 hover:cursor-pointer p-1'>
                        <Button variant="default" className="flex text-xs gap-1 text-xm bg-muted h-fit rounded-xl items-center">
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                            <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-xs border-none bg-background">
                        {ranges.map((item) => (
                            <DropdownMenuItem
                                key={item}
                                onClick={() => setrange(item)}
                                className={range === item ? "bg-background font-semibold" : ""}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CustomPiechart />
        </div>
    )
}

export default PieChartContainer