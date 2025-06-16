"use client"
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Taskcard from './task-card';
import { ScrollArea } from '../ui/scroll-area';

function TasksContainer() {
    const tasks = [
        {
            task: "Write blog post on AI agents",
            goal: "Build in public",
            category: "Content",
            duration: { hours: 2, minutes: 0, seconds: 0 },
            selected: true,
            startTime: "09:00",
            completion: 80,
            subtasks: true,
            priority: 2,
        },
        {
            task: "Fix navbar bug on landing page",
            goal: "Build in public",
            category: "Development",
            duration: { hours: 1, minutes: 30, seconds: 0 },
            selected: false,
            startTime: "11:00",
            completion: 60,
            subtasks: false,
            priority: 1,
        },
        {
            task: "Plan next week’s meal prep",
            goal: "Build in public",
            category: "Personal",
            duration: { hours: 0, minutes: 30, seconds: 0 },
            selected: false,
            startTime: "13:00",
            completion: 100,
            subtasks: true,
            priority: 3,
        },
        {
            task: "Call with client for onboarding",
            goal: "Build in public",
            category: "Meetings",
            duration: { hours: 1, minutes: 0, seconds: 0 },
            selected: false,
            startTime: "14:30",
            completion: 0,
            subtasks: false,
            priority: 2,
        },
        {
            task: "Push new features to staging",
            goal: "Build in public",
            category: "Development",
            duration: { hours: 0, minutes: 45, seconds: 0 },
            selected: false,
            startTime: "16:00",
            completion: 100,
            subtasks: true,
            priority: 1,
        },
        {
            task: "Reply to investor emails",
            goal: "Build in public",
            category: "Admin",
            duration: { hours: 0, minutes: 30, seconds: 0 },
            selected: false,
            startTime: "17:15",
            completion: 20,
            subtasks: false,
            priority: 2,
        },
        {
            task: "Design v2 of dashboard UI",
            goal: "Build in public",
            category: "Design",
            duration: { hours: 2, minutes: 0, seconds: 0 },
            selected: false,
            startTime: "18:00",
            completion: 40,
            subtasks: true,
            priority: 1,
        },
        {
            task: "Prepare IG reel script for launch",
            goal: "Build in public",
            category: "Marketing",
            duration: { hours: 1, minutes: 0, seconds: 0 },
            selected: false,
            startTime: "20:00",
            completion: 90,
            subtasks: true,
            priority: 3,
        },
        {
            task: "Clean up project board on Linear",
            goal: "Build in public",
            category: "Planning",
            duration: { hours: 0, minutes: 20, seconds: 0 },
            selected: false,
            startTime: "21:30",
            completion: 100,
            subtasks: false,
            priority: 2,
        },
        {
            task: "Evening walk + podcast",
            goal: "Build in public",
            category: "Wellness",
            duration: { hours: 1, minutes: 0, seconds: 0 },
            selected: false,
            startTime: "22:00",
            completion: 50,
            subtasks: false,
            priority: 3,
        },
    ];


    const [range, setrange] = useState("today");

    return (
        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <span className="text-xl">Today's Tasks</span>
                <Link href="/planner" className="flex mt-1 text-sm items-center text-primary">
                    Manage <ChevronRight size={15} />
                </Link>
            </div>

            {/* Scrollable Task List - fills remaining height */}
            <ScrollArea className="overflow-y-auto pr-2 h-[40vh]">
                {tasks.map((task, index) => (
                    <Taskcard key={index} {...task} />
                ))}
            </ScrollArea>

        </div>
    );
}

export default TasksContainer;
