"use client"
import React, { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import DeadLineCard from './deadline-card';

function DeadlineContainer() {
    const tasks = [
        {
            goal: "Write bias blog",
            category: "brain",
            priority: 2,
            timeLeft: "1 day 4 hours left",
            completion: 50
        },
        {
            goal: "Study prompts",
            category: "brain",
            priority: 1,
            timeLeft: "0 days 2 hours left",
            completion: 40
        },
        {
            goal: "Leg workout",
            category: "strength",
            priority: 3,
            timeLeft: "0 days 0 hours left",
            completion: 80
        },
        {
            goal: "Explore AI tools",
            category: "brain",
            priority: 2,
            timeLeft: "0 days 1 hours left",
            completion: 50
        },
        {
            goal: "Read 10 pages",
            category: "brain",
            priority: 1,
            timeLeft: "0 days 0 hours left",
            completion: 90
        },
        {
            goal: "Send invoices",
            category: "money",
            priority: 2,
            timeLeft: "0 days 1 hours left",
            completion: 60
        },
        {
            goal: "Plan content",
            category: "brain",
            priority: 1,
            timeLeft: "2 days 3 hours left",
            completion: 10
        },
        {
            goal: "Check expenses",
            category: "money",
            priority: 3,
            timeLeft: "0 days 0 hours left",
            completion: 70
        },
        {
            goal: "Draft podcast",
            category: "brain",
            priority: 2,
            timeLeft: "0 days 0 hours left",
            completion: 90
        },
        {
            goal: "Mobility work",
            category: "strength",
            priority: 3,
            timeLeft: "0 days 1 hours left",
            completion: 80
        }
    ];


    return (
        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <span className="text-xl">Deadlines</span>
            </div>

            {/* Scrollable Task List - fills remaining height */}
            <ScrollArea className="overflow-y-auto h-[30vh] pr-2">
                {tasks.map((task, index) => (
                    <DeadLineCard key={index} {...task} />
                ))}
            </ScrollArea>

        </div>
    );
}

export default DeadlineContainer;
