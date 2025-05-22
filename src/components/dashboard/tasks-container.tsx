"use client"
import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Taskcard from './task-card';
import { ScrollArea } from '../ui/scroll-area';

function TasksContainer() {
     const tasks = [
        {
            task: "Write blog post on AI agents",
            category: "Content",
            duration: "2h",
            startTime: "09:00",
            completion: 80,
            subtasks: true,
            priority: 2
        },
        {
            task: "Fix navbar bug on landing page",
            category: "Development",
            duration: "1.5h",
            startTime: "11:00",
            completion: 60,
            subtasks: false,
            priority: 1
        },
        {
            task: "Plan next week’s meal prep",
            category: "Personal",
            duration: "30m",
            startTime: "13:00",
            completion: 100,
            subtasks: true,
            priority: 3
        },
        {
            task: "Call with client for onboarding",
            category: "Meetings",
            duration: "1h",
            startTime: "14:30",
            completion: 0,
            subtasks: false,
            priority: 2
        },
        {
            task: "Push new features to staging",
            category: "Development",
            duration: "45m",
            startTime: "16:00",
            completion: 100,
            subtasks: true,
            priority: 1
        },
        {
            task: "Reply to investor emails",
            category: "Admin",
            duration: "30m",
            startTime: "17:15",
            completion: 20,
            subtasks: false,
            priority: 2
        },
        {
            task: "Design v2 of dashboard UI",
            category: "Design",
            duration: "2h",
            startTime: "18:00",
            completion: 40,
            subtasks: true,
            priority: 1
        },
        {
            task: "Prepare IG reel script for launch",
            category: "Marketing",
            duration: "1h",
            startTime: "20:00",
            completion: 90,
            subtasks: true,
            priority: 3
        },
        {
            task: "Clean up project board on Linear",
            category: "Planning",
            duration: "20m",
            startTime: "21:30",
            completion: 100,
            subtasks: false,
            priority: 2
        },
        {
            task: "Evening walk + podcast",
            category: "Wellness",
            duration: "1h",
            startTime: "22:00",
            completion: 50,
            subtasks: false,
            priority: 3
        }
    ];

    const [range, setrange] = useState("today");

    return (
        <div className="flex flex-col h-full gap-1">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <span className="text-xl">Today's Tasks</span>
                <Link href="/planner" className="flex mt-1 text-sm items-center text-primary">
                    Manage <ChevronRight size={15} />
                </Link>
            </div>

            {/* Scrollable Task List - fills remaining height */}
            <ScrollArea className="flex-1 overflow-y-auto flex flex-col gap-2 pr-2">
                {tasks.map((task, index) => (
                    <Taskcard key={index} {...task} />
                ))}
            </ScrollArea>
        </div>
    );
}

export default TasksContainer;
