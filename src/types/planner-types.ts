export interface Goal {
  id: string;
  name: string;
  description: string;
  category: string;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  goalId: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface Template {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  templateId: string;
  allDay?: boolean;
}