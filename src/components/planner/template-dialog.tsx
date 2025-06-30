'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, momentLocalizer, View, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Template, Goal, Task } from '@/types/planner-types';
import { TaskDialog } from './task-dialog';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const templateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface TemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => void;
  title: string;
  initialData?: Template;
  goals: Goal[];
}

export function TemplateDialog({ open, onOpenChange, onSubmit, title, initialData, goals }: TemplateDialogProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);

  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
      });
      setTasks(initialData.tasks);
    } else {
      form.reset({
        name: '',
        description: '',
      });
      setTasks([]);
    }
  }, [initialData, form]);

  const handleSubmit = (data: TemplateFormData) => {
    onSubmit({
      ...data,
      tasks,
    });
    form.reset();
    setTasks([]);
    onOpenChange(false);
  };

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    // Create proper local dates for the selected slot
    const startDate = new Date(slotInfo.start);
    const endDate = new Date(slotInfo.end);
    
    // Set the selected slot with the clicked time range
    setSelectedSlot({ start: startDate, end: endDate });
    setSelectedTask(null);
    setIsTaskDialogOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: any) => {
    const task = tasks.find(t => t.id === event.id);
    if (task) {
      setSelectedTask(task);
      setSelectedSlot(null);
      setIsTaskDialogOpen(true);
    }
  }, [tasks]);

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
    setSelectedSlot(null);
  };

  const handleEditTask = (taskData: Omit<Task, 'id'>) => {
    if (!selectedTask) return;
    
    const updatedTask: Task = {
      ...selectedTask,
      ...taskData,
    };
    
    setTasks(tasks.map(task => task.id === selectedTask.id ? updatedTask : task));
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    if (!deletingTask) return;
    setTasks(tasks.filter(task => task.id !== deletingTask.id));
    setDeletingTask(null);
  };

  const handleEventResize = ({ event, start, end }: any) => {
    const updatedTask = {
      ...event.resource,
      startTime: new Date(start),
      endTime: new Date(end),
    };
    setTasks(tasks.map(task => task.id === event.id ? updatedTask : task));
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    const updatedTask = {
      ...event.resource,
      startTime: new Date(start),
      endTime: new Date(end),
    };
    setTasks(tasks.map(task => task.id === event.id ? updatedTask : task));
  };

  const calendarEvents = tasks.map(task => ({
    id: task.id,
    title: task.name,
    start: task.startTime,
    end: task.endTime,
    resource: task,
  }));

  // Create a base date for today to ensure consistent timezone handling
  const baseDate = new Date();
  const todayStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 5, 0);
  const todayEnd = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 23, 59);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter template name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter template description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <FormLabel>Timeline (Click to add tasks, drag to move, resize by dragging edges)</FormLabel>
                <div className=" rounded-lg p-4" style={{ height: '400px' }}>
                  <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    onEventResize={handleEventResize}
                    onEventDrop={handleEventDrop}
                    selectable
                    resizable
                    defaultView="day"
                    views={['day']}
                    step={15}
                    timeslots={4}
                    defaultDate={baseDate}
                    min={todayStart}
                    max={todayEnd}
                    style={{ height: '100%' }}
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: event.resource.urgency === 'high' ? '#ef4444' : 
                                       event.resource.urgency === 'medium' ? '#f59e0b' : '#10b981',
                        border: 'none',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '12px',
                        padding: '2px 4px',
                      }
                    })}
                    dayLayoutAlgorithm="no-overlap"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Tasks: {tasks.length} | Click on timeline to add tasks | Drag tasks to move | Drag task edges to resize duration
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {initialData ? 'Update' : 'Create'} Template
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onSubmit={selectedTask ? handleEditTask : handleCreateTask}
        onDelete={selectedTask ? () => setDeletingTask(selectedTask) : undefined}
        title={selectedTask ? 'Edit Task' : 'Create New Task'}
        initialData={selectedTask || undefined}
        selectedSlot={selectedSlot}
        goals={goals}
      />

      <DeleteConfirmDialog
        open={!!deletingTask}
        onOpenChange={(open) => !open && setDeletingTask(null)}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        description={`Are you sure you want to delete "${deletingTask?.name}"? This action cannot be undone.`}
      />
    </>
  );
}