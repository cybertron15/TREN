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
import axiosInstance from '@/utils/axiousInstance';
import { Form } from 'react-router-dom';

function AddActivity() {
    const [taskMode, settaskMode] = useState('select')
    const [category, setCategory] = useState('')
    const [goal, setGoal] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [selectKey, setSelectKey] = React.useState(+new Date())
    const [selectedTask, setselectedTask] = useState("")
    const [userGoals, setuserGoals] = useState<GroupedGoals | null>(null)
    const [userTasks, setuserTasks] = useState<Tasks[] | null>(null)
    const [inputs, setinputs] = useState({
        activityName: "",
        from: "",
        to: "",
        taskMode: "select",
        taskId: "",
        taskName: "",
        taskRelatedGoal: "",
        taskCategory: "",
        taskPriority: ""
    })
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

    // const formValidation = () =>{
    //     let validated = false

    // }
    const handleGoalClear = () => {
        setGoal('')
        setCategory('')
        setSelectKey(+new Date())
        setinputs({ ...inputs, taskRelatedGoal: "" })
    }

    const handleTaskChecked = (taskid: string) => {
        setinputs({ ...inputs, taskId: taskid })
        setselectedTask(taskid)

    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setinputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleGoalValueChange = (value: string) => {
        const [goal, category] = value.split("_")
        setGoal(goal)
        setCategory(category)
        setinputs({ ...inputs, taskRelatedGoal: goal, taskCategory: category })
    }
    const handleCategoryValueChange = (category: string) => {
        setCategory(category)
        setinputs({ ...inputs, taskCategory: category })
    }
    const handleDialogClear = () => {
        setselectedTask("")
        handleGoalClear()
    }

    const handleTaskModeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleDialogClear()
        const target = event.target as HTMLButtonElement;
        settaskMode(target.value);
        setinputs({ ...inputs, [target.name]: target.value })
    }

    const handleCreateTask = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleTaskModeToggle(event)
        getGoals()
    }
    interface Goal {
        id: string;
        name: string;
        owner: string;
        deadline: string;
        category: 'strength' | 'money' | 'brain';
        worked_for: string;
        completion: number;
        priority: number;
    }
    interface GroupedGoals {
        strength: Goal[];
        money: Goal[];
        brain: Goal[];
    }
    interface Tasks {
        id: string;
        owner: string;
        related_goal: string | null;
        name: string;
        category: 'strength' | 'money' | 'brain';
        priority: number;
        parent: string | null;
    }

    const getGoals = async () => {
        // # TODO add API request throtelling 
        try {
            setisLoading(true)
            const response = await axiosInstance.get('/goals')
            const goals: Goal[] = response.data

            // Initialize the reduce function
            const groupedGoals = goals.reduce((acc: GroupedGoals, goal: Goal) => {
                acc[goal.category].push(goal);
                return acc;
            }, { strength: [], money: [], brain: [] } as GroupedGoals);

            setisLoading(false)
            setuserGoals(groupedGoals)
        } catch (error) {
            console.log('Failed to fetch goals', error);
            toast('Something went wrong, Failed to fetch goals')
            setisLoading(false)

        }
    }

    const getTasks = async () => {
        try {
            setisLoading(true)
            const response = await axiosInstance('/tasks')
            setuserTasks(response.data)
            setisLoading(false)
        } catch (error) {
            console.log('Failed to fetch tasks', error);
            toast('Something went wrong, Failed to fetch tasks')
            setisLoading(false)
        }
    }
    

    return (
        <Dialog onOpenChange={(open) => { handleDialogClear() }}>
            <DialogTrigger onClick={getTasks} className="bg-red-600 text-white rounded-md px-2">
                <div className="font-Inter text-sm">Add Activity</div>
            </DialogTrigger>

            <DialogContent className='max-h-[100%] overflow-y-auto overflow-x-clip'>
                <DialogHeader>
                    <DialogTitle>Add Activity</DialogTitle>
                    <DialogDescription>
                        Create Activity based on tasks.
                    </DialogDescription>
                </DialogHeader>
                <Form method='POST' className='flex flex-col gap-3'>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input maxLength={30} className='mt-1' onChange={handleInputChange} name='activityName' placeholder="Workout for 2 hours" required/>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="basis-1/2">
                            <Label htmlFor="From" className="">From</Label>
                            <Input name='from'  className='mt-1' onChange={handleInputChange} placeholder="from" type="time" min="12:00" max="18:00" required/>
                        </div>
                        <div className="basis-1/2">
                            <Label htmlFor="To" className="">To</Label>
                            <Input name='to'  className='mt-1' onChange={handleInputChange} placeholder="to" type="time" min="12:00" max="18:00" required/>
                        </div>
                    </div>
                    <hr />
                    <div>


                        <Label htmlFor="name" className="">Choose Task</Label>
                        <div className="flex w-full border rounded-md mt-1">
                            <button value="select" name='taskMode' onClick={handleTaskModeToggle} className={`basis-1/2 ${taskMode === "select" && "ring-1 ring-red-300"}  rounded-l-md`} type="button">Select Task</button>
                            <button value="create" name='taskMode' onClick={handleCreateTask} className={`basis-1/2 items-center flex justify-center gap-1 ${taskMode === "create" && "ring-1 ring-red-300"}  rounded-r-md`} type="button">
                                Create Task
                                <div className='mt-0.5' title='Tasks are anything that you do daily.'>
                                    <CircleHelp className='text-gray-400' size={"15"} />
                                </div>
                            </button>
                        </div>
                    </div>
                    {
                        taskMode === "select" ?
                            <ScrollArea className="h-[290px] rounded-md border p-3">
                                {
                                    (!isLoading && userTasks) &&
                                    userTasks.map((task: Tasks) => {
                                        return <div key={task.id} className={`flex justify-between p-2 border rounded-md items-center my-1 ${selectedTask === task.id && " border-red-500"}`}>
                                            <div className="flex items-center gap-2">
                                                <img src={`icons/${task.category}-solid.png`} alt="" className="w-4 h-4" />
                                                <div>
                                                    {task.name}
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {/* <Pen color="grey " cursor={"pointer"} className="hover:text-red-500 w-4 h-4" /> */}
                                                <Trash color="grey" cursor={"pointer"} className="hover:text-red-500 w-4 h-4" />
                                                <Checkbox disabled={selectedTask === "" ? false : selectedTask === task.id ? false : true} className="w-4 h-4" onCheckedChange={(checked) => { checked ? handleTaskChecked(task.id) : handleTaskChecked("") }} />
                                            </div>
                                        </div>
                                    })
                                }

                            </ScrollArea>
                            :
                            <>
                                <div>
                                    <Label htmlFor="taskname" className="">Task Name</Label>
                                    <Input maxLength={30} placeholder="Workout"  className='mt-1' name='taskName' onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <div className="flex gap-2 items-center">
                                        <Label htmlFor="relatedGoal" className="">Related Goal</Label>
                                        <RotateCcw className="w-3.5 h-3.5 mt-0.5 cursor-pointer" onClick={handleGoalClear} />
                                    </div>
                                    <Select disabled={isLoading} key={selectKey} onValueChange={handleGoalValueChange}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {userGoals &&
                                                Object.entries(userGoals).map(([category, goals]) => {
                                                    return goals.length > 0 && (<SelectGroup key={category}>
                                                        <SelectLabel>{category}</SelectLabel>
                                                        {goals?.map((goal: Goal) => {
                                                            return <SelectItem key={goal.id} value={`${goal.id}_${goal.category}`}>{goal.name}</SelectItem>
                                                        })}
                                                    </SelectGroup>)
                                                })

                                            }
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="category" className="">Category</Label>
                                    <Select value={category===""?undefined:category} disabled={goal !== ""} onValueChange={handleCategoryValueChange} required>
                                        <SelectTrigger className='mt-1'>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="strength">Strength</SelectItem>
                                            <SelectItem value="brain">Brain</SelectItem>
                                            <SelectItem value="money">Money</SelectItem>
                                        </SelectContent>

                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="priority" className="">Priority</Label>
                                    <Select onValueChange={(value) => { setinputs({ ...inputs, taskPriority: value }) }} required>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                            </>

                    }
                    <Button type='submit' onClick={() => {
                        console.log('button');
                    }}>Add</Button>
                </Form>
            </DialogContent>

        </Dialog>
    )
}

export default AddActivity