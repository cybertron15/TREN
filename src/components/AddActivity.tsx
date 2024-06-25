import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CircleHelp, Pen, RotateCcw, Trash } from "lucide-react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "@/components/ui/checkbox"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

function AddActivity() {
    const [taskMode, settaskMode] = useState('select')
    const [category, setCategory] = useState('')
    const [goal, setGoal] = useState('')
    const [selectKey, setSelectKey] = React.useState(+new Date())
    const [selectedTask, setselectedTask] = useState("")
    const tasks = [
        { id: "1", name: "Budget Planning", category: "money" },
        { id: "2", name: "Weightlifting", category: "strength" },
        { id: "3", name: "Memory Training", category: "brain" },
        { id: "4", name: "Investment Analysis", category: "money" },
        { id: "5", name: "Cardio Workout", category: "strength" },
        { id: "6", name: "Puzzle Solving", category: "brain" },
        { id: "7", name: "Expense Tracking", category: "money" },
        { id: "8", name: "Strength Training", category: "strength" },
        { id: "9", name: "Reading Comprehension", category: "brain" },
        { id: "10", name: "Tax Preparation", category: "money" }
    ]
    const handleGoalClear = () => {
        setGoal('')
        setCategory('')
        setSelectKey(+new Date())
    }

    const handleDialogClear = () => {
        setselectedTask("")
        handleGoalClear()
    }

    const handleTaskModeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleDialogClear()
        const target = event.target as HTMLButtonElement;
        settaskMode(target.name);
    }
    return (
        <Dialog onOpenChange={(open) => { handleDialogClear() }}>
            <DialogTrigger type="submit" className="bg-red-600 text-white rounded-md px-2">
                <div className="font-Inter text-sm">Add Activity</div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Activity</DialogTitle>
                    <DialogDescription>
                        Create Activity based on tasks.
                    </DialogDescription>
                </DialogHeader>
                <Label htmlFor="name">Name</Label>
                <Input placeholder="Workout for 2 hours" />
                <div className="flex gap-2 w-full">
                    <div className="basis-1/2">
                        <Label htmlFor="From">From</Label>
                        <Input placeholder="from" type="time" min="12:00" max="18:00" />
                    </div>
                    <div className="basis-1/2">
                        <Label htmlFor="To">To</Label>
                        <Input placeholder="to" type="time" min="12:00" max="18:00" />
                    </div>
                </div>
                <hr />
                <Label htmlFor="name">Choose Task</Label>
                <div className="flex w-full border rounded-md">
                    <button name="select" onClick={handleTaskModeToggle} className={`basis-1/2 ${taskMode === "select" && "ring-1 ring-red-300"}  rounded-l-md`} type="button">Select Task</button>

                    <button name="create" onClick={handleTaskModeToggle} className={`basis-1/2 items-center flex justify-center gap-1 ${taskMode === "create" && "ring-1 ring-red-300"}  rounded-r-md`} type="button">
                        Create Task
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger onClick={(e)=>e.stopPropagation()}><CircleHelp className='text-gray-400' size={"15"} /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Tasks are anything, that you do on daily basis</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        
                    </button>

                </div>
                {
                    taskMode === "select" ?
                        <ScrollArea className="h-[300px] rounded-md border p-3">
                            {
                                tasks.map((task, index) => {
                                    return <div key={task.id} className={`flex justify-between p-2 border rounded-md items-center my-1 ${selectedTask === task.id && " border-red-500"}`}>
                                        <div className="flex items-center gap-2">
                                            <img src={`icons/${task.category}-solid.png`} alt="" className="w-4 h-4" />
                                            <div>
                                                {task.name}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Pen color="grey " cursor={"pointer"} className="hover:text-red-500 w-4 h-4" />
                                            <Trash color="grey" cursor={"pointer"} className="hover:text-red-500 w-4 h-4" />
                                            <Checkbox disabled={selectedTask === "" ? false : selectedTask === task.id ? false : true} className="w-4 h-4" onCheckedChange={(checked) => { checked ? setselectedTask(task.id) : setselectedTask("") }} />
                                        </div>
                                    </div>
                                })
                            }

                        </ScrollArea>
                        :
                        <>
                            <Label htmlFor="name">Name</Label>
                            <Input placeholder="Workout" />
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="name" className="">Related Goal</Label>
                                <RotateCcw className="w-3.5 h-3.5 mt-0.5 cursor-pointer" onClick={handleGoalClear} />
                            </div>
                            <Select key={selectKey} onValueChange={(value) => {
                                const [goal, category] = value.split("_")
                                setGoal(goal)
                                setCategory(category)
                            }}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select goal" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>strength</SelectLabel>
                                        <SelectItem value="123s2_strength">Lean Body</SelectItem>
                                        <SelectItem value="12332_strength">Better Diet</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Brain</SelectLabel>
                                        <SelectItem value="12321_brain">Learn Next JS</SelectItem>
                                        <SelectItem value="12391_brain">Learn AI & ML</SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Money</SelectLabel>
                                        <SelectItem value="12321_money">Get job</SelectItem>
                                        <SelectItem value="1s321_money">Find freelance job</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Label htmlFor="name">Category</Label>
                            <Select value={category} disabled={goal !== ""} onValueChange={(value) => { setCategory(value) }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="strength">strength</SelectItem>
                                    <SelectItem value="brain">brain</SelectItem>
                                    <SelectItem value="money">money</SelectItem>
                                </SelectContent>

                            </Select>
                            <Label htmlFor="name">Priority</Label>
                            <Select>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gmt">Urgent</SelectItem>
                                    <SelectItem value="cet">ok</SelectItem>
                                    <SelectItem value="ceft">ok</SelectItem>
                                </SelectContent>
                            </Select>
                        </>

                }
                <Button>Add</Button>
            </DialogContent>
        </Dialog>
    )
}

export default AddActivity