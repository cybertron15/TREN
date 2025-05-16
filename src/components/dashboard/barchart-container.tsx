"use client"
import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { CustomBarchart } from './custom-barchart';

function BarChartContainer() {

	const [range, setrange] = useState("today");
	const ranges = ['week', 'month', 'year']
	return (
		<div className='flex flex-col gap-1 h-full'>
			<div className='flex justify-between items-center gap-2'>
				<div className='flex gap-2'>
					<span className='text-xl'>Performance</span>
					<Badge variant={'destructive'} className='hover:bg-green-700/30 text-xs px-1 py-0.5 bg-green-700/30 font-light'>{`+10%`}</Badge>
				</div>
				<div className='flex text-xs gap-1 text-xm bg-muted rounded-2xl px-2 py-1 items-center'>
					{
						ranges.map((item) => {
							return (
								<button
									key={item}
									className={`hover:bg-background/50 rounded-xl px-2 py-1 cursor-pointer ${range === item && 'bg-background'}`}
									onClick={() => setrange(item)}
								>
									{item.charAt(0).toUpperCase() + item.slice(1)}
								</button>
							)
						})
					}
				</div>
			</div>
			<span className='text-3xl'>60<span className='text-gray-500'>%</span></span>
			<CustomBarchart />
		</div>
	)
}

export default BarChartContainer