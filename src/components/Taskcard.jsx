import React, { useState } from 'react'
import { Flex, Text, Card, Avatar, Box } from '@radix-ui/themes';
export default function Taskcard({ task, type, duration, time, importance, percentage }) {
    const importance_map = {
        1: "red",
        2: "yellow",
        3: "blue"
    }

    return (
        <div className='flex border rounded-lg gap-4 p-2'>
            <div className=''>
                <img src="icons/muscle.png" alt="muscle" className='w-10 h-10 border' />
            </div>
            <div>
                <span className='text-xl font-'>workout</span>
                <div className='flex'>

                    <span>07:00 AM</span> |
                    <span>02 hrs</span>
                </div>
            </div>
        </div>
    )
}
