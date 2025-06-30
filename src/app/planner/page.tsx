'use client';
import { useState } from 'react';
import { Goal, Template, Task, CalendarEvent } from '@/types/planner-types';
import { GoalsSection } from '@/components/planner/goal-section';
import { TemplatesSection } from '@/components/planner/template-section';
import { CalendarSection } from '@/components/planner/calendar-section';
import { SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/header';

function Page() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '6',
      name: 'Learn React',
      description: 'Master React fundamentals and advanced concepts',
      category: 'Education',
      deadline: new Date('2025-04-15'),
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '7',
      name: 'Learn React',
      description: 'Master React fundamentals and advanced concepts',
      category: 'Education',
      deadline: new Date('2025-04-15'),
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '8',
      name: 'Learn React',
      description: 'Master React fundamentals and advanced concepts',
      category: 'Education',
      deadline: new Date('2025-04-15'),
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Learn React',
      description: 'Master React fundamentals and advanced concepts',
      category: 'Education',
      deadline: new Date('2025-04-15'),
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      name: 'Learn React',
      description: 'Master React fundamentals and advanced concepts',
      category: 'Education',
      deadline: new Date('2025-04-15'),
      priority: 'high',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Build Portfolio',
      description: 'Create a professional portfolio website',
      category: 'Career',
      deadline: new Date('2025-03-30'),
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [templates, setTemplates] = useState<Template[]>([
  {
    id: '1',
    name: 'Productive Workday',
    description: 'Structured workday template for maximum productivity',
    tasks: [
      {
        id: '1',
        name: 'Morning Exercise',
        description: '45 minutes gym workout',
        startTime: new Date('2025-01-15T06:00:00'),
        endTime: new Date('2025-01-15T06:45:00'),
        goalId: '1',
        urgency: 'high',
      },
      {
        id: '2',
        name: 'Breakfast & Planning',
        description: 'Healthy breakfast and daily planning session',
        startTime: new Date('2025-01-15T07:00:00'),
        endTime: new Date('2025-01-15T07:30:00'),
        goalId: '2',
        urgency: 'medium',
      },
      {
        id: '3',
        name: 'Deep Work Block 1',
        description: 'Focus on high-priority project tasks',
        startTime: new Date('2025-01-15T09:00:00'),
        endTime: new Date('2025-01-15T11:00:00'),
        goalId: '3',
        urgency: 'high',
      },
      {
        id: '4',
        name: 'Team Standup',
        description: 'Daily team synchronization meeting',
        startTime: new Date('2025-01-15T11:00:00'),
        endTime: new Date('2025-01-15T11:30:00'),
        goalId: '4',
        urgency: 'high',
      },
      {
        id: '5',
        name: 'Email & Admin',
        description: 'Process emails and administrative tasks',
        startTime: new Date('2025-01-15T11:30:00'),
        endTime: new Date('2025-01-15T12:30:00'),
        goalId: '5',
        urgency: 'medium',
      },
      {
        id: '6',
        name: 'Lunch Break',
        description: 'Lunch and short walk',
        startTime: new Date('2025-01-15T12:30:00'),
        endTime: new Date('2025-01-15T13:30:00'),
        goalId: '6',
        urgency: 'low',
      },
      {
        id: '7',
        name: 'Deep Work Block 2',
        description: 'Continued focus work on core projects',
        startTime: new Date('2025-01-15T13:30:00'),
        endTime: new Date('2025-01-15T15:30:00'),
        goalId: '3',
        urgency: 'high',
      },
      {
        id: '8',
        name: 'Client Calls',
        description: 'Scheduled client meetings and follow-ups',
        startTime: new Date('2025-01-15T15:30:00'),
        endTime: new Date('2025-01-15T17:00:00'),
        goalId: '7',
        urgency: 'high',
      },
      {
        id: '9',
        name: 'Day Review & Tomorrow Prep',
        description: 'Review accomplishments and prepare for tomorrow',
        startTime: new Date('2025-01-15T17:00:00'),
        endTime: new Date('2025-01-15T17:30:00'),
        goalId: '2',
        urgency: 'medium',
      },
    ],
    createdAt: new Date('2025-01-10T08:00:00'),
    updatedAt: new Date('2025-01-12T14:30:00'),
  },
  {
    id: '2',
    name: 'Weekend Relaxation',
    description: 'Balanced weekend template for rest and personal activities',
    tasks: [
      {
        id: '10',
        name: 'Sleep In',
        description: 'Extended sleep for recovery',
        startTime: new Date('2025-01-18T08:00:00'),
        endTime: new Date('2025-01-18T09:30:00'),
        goalId: '8',
        urgency: 'low',
      },
      {
        id: '11',
        name: 'Leisurely Breakfast',
        description: 'Slow breakfast with coffee and news',
        startTime: new Date('2025-01-18T09:30:00'),
        endTime: new Date('2025-01-18T10:30:00'),
        goalId: '9',
        urgency: 'low',
      },
      {
        id: '12',
        name: 'Household Chores',
        description: 'Weekly cleaning and organization',
        startTime: new Date('2025-01-18T10:30:00'),
        endTime: new Date('2025-01-18T12:00:00'),
        goalId: '10',
        urgency: 'medium',
      },
      {
        id: '13',
        name: 'Hobby Time',
        description: 'Photography or creative projects',
        startTime: new Date('2025-01-18T14:00:00'),
        endTime: new Date('2025-01-18T16:00:00'),
        goalId: '11',
        urgency: 'low',
      },
      {
        id: '14',
        name: 'Social Activity',
        description: 'Meet friends or family time',
        startTime: new Date('2025-01-18T16:30:00'),
        endTime: new Date('2025-01-18T19:00:00'),
        goalId: '12',
        urgency: 'medium',
      },
      {
        id: '15',
        name: 'Movie Night',
        description: 'Relax with entertainment',
        startTime: new Date('2025-01-18T20:00:00'),
        endTime: new Date('2025-01-18T22:00:00'),
        goalId: '13',
        urgency: 'low',
      },
    ],
    createdAt: new Date('2025-01-08T16:20:00'),
    updatedAt: new Date('2025-01-15T11:45:00'),
  },
  {
    id: '3',
    name: 'Study Day',
    description: 'Intensive learning and skill development template',
    tasks: [
      {
        id: '16',
        name: 'Morning Review',
        description: 'Review previous day\'s learning materials',
        startTime: new Date('2025-01-20T07:00:00'),
        endTime: new Date('2025-01-20T07:30:00'),
        goalId: '14',
        urgency: 'medium',
      },
      {
        id: '17',
        name: 'Core Study Session 1',
        description: 'Deep dive into new concepts - JavaScript fundamentals',
        startTime: new Date('2025-01-20T08:00:00'),
        endTime: new Date('2025-01-20T10:00:00'),
        goalId: '15',
        urgency: 'high',
      },
      {
        id: '18',
        name: 'Practice Problems',
        description: 'Coding exercises and problem solving',
        startTime: new Date('2025-01-20T10:30:00'),
        endTime: new Date('2025-01-20T12:00:00'),
        goalId: '16',
        urgency: 'high',
      },
      {
        id: '19',
        name: 'Lunch & Walk',
        description: 'Break with light physical activity',
        startTime: new Date('2025-01-20T12:00:00'),
        endTime: new Date('2025-01-20T13:00:00'),
        goalId: '17',
        urgency: 'medium',
      },
      {
        id: '20',
        name: 'Video Tutorials',
        description: 'Watch educational content and take notes',
        startTime: new Date('2025-01-20T13:00:00'),
        endTime: new Date('2025-01-20T15:00:00'),
        goalId: '18',
        urgency: 'medium',
      },
      {
        id: '21',
        name: 'Project Work',
        description: 'Apply learning to personal project',
        startTime: new Date('2025-01-20T15:30:00'),
        endTime: new Date('2025-01-20T17:30:00'),
        goalId: '19',
        urgency: 'high',
      },
      {
        id: '22',
        name: 'Study Group',
        description: 'Online study session with peers',
        startTime: new Date('2025-01-20T19:00:00'),
        endTime: new Date('2025-01-20T20:30:00'),
        goalId: '20',
        urgency: 'medium',
      },
    ],
    createdAt: new Date('2025-01-05T12:15:00'),
    updatedAt: new Date('2025-01-18T09:20:00'),
  },
  {
    id: '4',
    name: 'Health & Wellness Day',
    description: 'Focus on physical and mental well-being',
    tasks: [
      {
        id: '23',
        name: 'Meditation',
        description: '20-minute mindfulness meditation',
        startTime: new Date('2025-01-22T06:30:00'),
        endTime: new Date('2025-01-22T06:50:00'),
        goalId: '21',
        urgency: 'high',
      },
      {
        id: '24',
        name: 'Yoga Session',
        description: 'Full body yoga flow',
        startTime: new Date('2025-01-22T07:00:00'),
        endTime: new Date('2025-01-22T08:00:00'),
        goalId: '22',
        urgency: 'high',
      },
      {
        id: '25',
        name: 'Nutritious Breakfast',
        description: 'Prepare and enjoy healthy breakfast',
        startTime: new Date('2025-01-22T08:15:00'),
        endTime: new Date('2025-01-22T09:00:00'),
        goalId: '23',
        urgency: 'medium',
      },
      {
        id: '26',
        name: 'Nature Walk',
        description: '2-hour hike in local park',
        startTime: new Date('2025-01-22T10:00:00'),
        endTime: new Date('2025-01-22T12:00:00'),
        goalId: '24',
        urgency: 'medium',
      },
      {
        id: '27',
        name: 'Meal Prep',
        description: 'Prepare healthy meals for the week',
        startTime: new Date('2025-01-22T13:00:00'),
        endTime: new Date('2025-01-22T15:00:00'),
        goalId: '25',
        urgency: 'medium',
      },
      {
        id: '28',
        name: 'Spa Time',
        description: 'Self-care activities and relaxation',
        startTime: new Date('2025-01-22T16:00:00'),
        endTime: new Date('2025-01-22T17:30:00'),
        goalId: '26',
        urgency: 'low',
      },
      {
        id: '29',
        name: 'Journaling',
        description: 'Reflection and gratitude practice',
        startTime: new Date('2025-01-22T21:00:00'),
        endTime: new Date('2025-01-22T21:30:00'),
        goalId: '27',
        urgency: 'medium',
      },
    ],
    createdAt: new Date('2025-01-03T14:45:00'),
    updatedAt: new Date('2025-01-20T16:30:00'),
  },
  {
    id: '5',
    name: 'Creative Focus Day',
    description: 'Dedicated time for creative pursuits and innovation',
    tasks: [
      {
        id: '30',
        name: 'Morning Pages',
        description: 'Stream of consciousness writing',
        startTime: new Date('2025-01-25T07:00:00'),
        endTime: new Date('2025-01-25T07:30:00'),
        goalId: '28',
        urgency: 'medium',
      },
      {
        id: '31',
        name: 'Inspiration Gathering',
        description: 'Browse design portfolios and creative work',
        startTime: new Date('2025-01-25T08:00:00'),
        endTime: new Date('2025-01-25T09:00:00'),
        goalId: '29',
        urgency: 'low',
      },
      {
        id: '32',
        name: 'Creative Session 1',
        description: 'Work on graphic design project',
        startTime: new Date('2025-01-25T09:30:00'),
        endTime: new Date('2025-01-25T12:00:00'),
        goalId: '30',
        urgency: 'high',
      },
      {
        id: '33',
        name: 'Creative Lunch',
        description: 'Visit art gallery or museum',
        startTime: new Date('2025-01-25T12:00:00'),
        endTime: new Date('2025-01-25T14:00:00'),
        goalId: '31',
        urgency: 'low',
      },
      {
        id: '34',
        name: 'Skill Development',
        description: 'Learn new design techniques or tools',
        startTime: new Date('2025-01-25T14:30:00'),
        endTime: new Date('2025-01-25T16:00:00'),
        goalId: '32',
        urgency: 'medium',
      },
      {
        id: '35',
        name: 'Creative Session 2',
        description: 'Continue project work with fresh perspective',
        startTime: new Date('2025-01-25T16:30:00'),
        endTime: new Date('2025-01-25T18:30:00'),
        goalId: '30',
        urgency: 'high',
      },
      {
        id: '36',
        name: 'Portfolio Review',
        description: 'Organize and update creative portfolio',
        startTime: new Date('2025-01-25T19:00:00'),
        endTime: new Date('2025-01-25T20:00:00'),
        goalId: '33',
        urgency: 'medium',
      },
    ],
    createdAt: new Date('2025-01-01T10:30:00'),
    updatedAt: new Date('2025-01-22T13:15:00'),
  },
  {
    id: '6',
    name: 'Meeting-Heavy Day',
    description: 'Template for days with multiple meetings and collaboration',
    tasks: [
      {
        id: '37',
        name: 'Pre-meeting Prep',
        description: 'Review agendas and prepare materials',
        startTime: new Date('2025-01-16T08:00:00'),
        endTime: new Date('2025-01-16T08:30:00'),
        goalId: '34',
        urgency: 'high',
      },
      {
        id: '38',
        name: 'Project Kickoff Meeting',
        description: 'New project initiation with stakeholders',
        startTime: new Date('2025-01-16T09:00:00'),
        endTime: new Date('2025-01-16T10:30:00'),
        goalId: '35',
        urgency: 'high',
      },
      {
        id: '39',
        name: 'One-on-One with Manager',
        description: 'Weekly check-in and feedback session',
        startTime: new Date('2025-01-16T11:00:00'),
        endTime: new Date('2025-01-16T11:30:00'),
        goalId: '36',
        urgency: 'high',
      },
      {
        id: '40',
        name: 'Quick Email Check',
        description: 'Process urgent emails between meetings',
        startTime: new Date('2025-01-16T11:30:00'),
        endTime: new Date('2025-01-16T12:00:00'),
        goalId: '37',
        urgency: 'medium',
      },
      {
        id: '41',
        name: 'Working Lunch',
        description: 'Informal meeting with team lead',
        startTime: new Date('2025-01-16T12:00:00'),
        endTime: new Date('2025-01-16T13:00:00'),
        goalId: '38',
        urgency: 'medium',
      },
      {
        id: '42',
        name: 'Client Presentation',
        description: 'Present quarterly results to key client',
        startTime: new Date('2025-01-16T14:00:00'),
        endTime: new Date('2025-01-16T15:30:00'),
        goalId: '39',
        urgency: 'high',
      },
      {
        id: '43',
        name: 'Team Retrospective',
        description: 'Sprint review and planning session',
        startTime: new Date('2025-01-16T16:00:00'),
        endTime: new Date('2025-01-16T17:00:00'),
        goalId: '40',
        urgency: 'high',
      },
      {
        id: '44',
        name: 'Meeting Notes Compilation',
        description: 'Summarize and distribute meeting action items',
        startTime: new Date('2025-01-16T17:00:00'),
        endTime: new Date('2025-01-16T17:30:00'),
        goalId: '41',
        urgency: 'medium',
      },
    ],
    createdAt: new Date('2025-01-07T11:20:00'),
    updatedAt: new Date('2025-01-14T15:45:00'),
  },
]);

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Morning Routine',
      start: new Date('2025-01-15T06:00:00'),
      end: new Date('2025-01-15T23:59:59'),
      templateId: '1',
      allDay: true,
    },
  ]);

  return (

    <SidebarInset className="h-screen overflow-hidden">
      <Header />
      <div className=" w-full overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:flex h-full p-4 gap-4">
          {/* Goals Column - Fixed width */}
          <div className="w-80 flex-shrink-0">
            <GoalsSection
              goals={goals}
              setGoals={setGoals}
            />
          </div>

          {/* Templates and Calendar - Flexible width */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Templates - Top half */}
            <div className="basis-[40%] overflow-hidden">
              <TemplatesSection
                templates={templates}
                setTemplates={setTemplates}
                goals={goals}
              />
            </div>

            {/* Calendar - Bottom half */}
            <div className="flex-1">
              <CalendarSection
                events={calendarEvents}
                setEvents={setCalendarEvents}
                templates={templates}
              />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden h-full overflow-y-auto p-4 space-y-6">
          <GoalsSection
            goals={goals}
            setGoals={setGoals}
          />
          <TemplatesSection
            templates={templates}
            setTemplates={setTemplates}
            goals={goals}
          />
          <CalendarSection
            events={calendarEvents}
            setEvents={setCalendarEvents}
            templates={templates}
          />
        </div>
      </div>
    </SidebarInset>
  );
}

export default Page;