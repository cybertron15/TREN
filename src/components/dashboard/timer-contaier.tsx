"use client"
import React, { useState } from 'react'
import Timer from '../Timer'
import { intervalToDuration } from 'date-fns';

function formatElapsedTime(seconds: number) {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    const pad = (n: number = 0) => String(n).padStart(2, "0");
    return `${pad(duration.hours)}:${pad(duration.minutes)}:${pad(duration.seconds)}`;
}

function TimerContainer() {
    const [stats, setstats] = useState({ per: 0, elapsedTime: 0 })
    const totalTime = {
        hours: 0,
        minutes: 1,
        seconds: 15
    }
    return (
        <div className='flex h-full flex-col justify-between items-center'>
            <span className='text-2xl'>Workout</span>
            <p className='text-gray-500'>completed {stats.per}%</p>

            <Timer totalTime={totalTime} setStats={setstats}/>
            <div className='flex justify-between w-full gap-3'>
                <div className='grow bg-muted text-center text-xs p-2 rounded-lg'>
                    <p>Time Spent</p>
                    {formatElapsedTime(stats.elapsedTime)}
                </div>
                <div className='grow bg-muted text-center text-xs p-2 rounded-lg'>
                    <p>Goal Time</p>
                    {formatElapsedTime(totalTime.hours * 3600 + totalTime.minutes * 60 + totalTime.seconds)}
                </div>
            </div>
        </div>
    )
}

export default TimerContainer