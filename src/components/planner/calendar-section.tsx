'use client';

import { useState, useCallback, useMemo } from 'react';
import { Calendar, momentLocalizer, SlotInfo, View } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarEvent, Template } from '@/types/planner-types';
import { CalendarEventDialog } from './calendar-event-dialog';
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { CircleQuestionMark } from 'lucide-react';

const localizer = momentLocalizer(moment);

interface CalendarSectionProps {
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  templates: Template[];
}

export function CalendarSection({ events, setEvents, templates }: CalendarSectionProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [currentView, setCurrentView] = useState<View>('month')

  // Memoized views array
  const views = useMemo(() => (['week', 'month'] as const), [])

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setSelectedSlot({ start: slotInfo.start, end: slotInfo.end });
    setSelectedEvent(null);
    setIsEventDialogOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: any) => {
    const calendarEvent = events.find(e => e.id === event.id);
    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
      setSelectedSlot(null);
      setIsEventDialogOpen(true);
    }
  }, [events]);

  const handleCreateEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
    };
    setEvents([...events, newEvent]);
    setSelectedSlot(null);
  };

  const handleEditEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    if (!selectedEvent) return;

    const updatedEvent: CalendarEvent = {
      ...selectedEvent,
      ...eventData,
    };

    setEvents(events.map(event => event.id === selectedEvent.id ? updatedEvent : event));
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (!deletingEvent) return;
    setEvents(events.filter(event => event.id !== deletingEvent.id));
    setDeletingEvent(null);
  };

  // Event handlers with useCallback
  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate)
  }, [])

  const handleViewChange = useCallback((newView: View) => {
    setCurrentView(newView)
  }, [])


  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    resource: event,
  }));

  return (
    <>
      <Card className="h-full flex flex-col bg-muted/50 border-none">
        <CardHeader className="flex-shrink-0 pb-3">
          <CardTitle className="flex gap-2 text-lg font-semibold">
            <span>Calendar</span>
            <Tooltip>
              <TooltipTrigger><CircleQuestionMark width={15} /></TooltipTrigger>
              <TooltipContent>
                <p>Click on any date to assign a template. Click on existing events to edit them.</p>
              </TooltipContent>
            </Tooltip>

          </CardTitle>
        
        </CardHeader>
        <CardContent className="flex-1 p-4 min-h-0">
          <div className="h-full rounded-lg  overflow-hidden">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              selectable
              popup
              style={{ height: '100%' }}
              className="p-4"
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: '#3b82f6',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                }
              })}
              // Event handlers
              onNavigate={handleNavigate}
              onView={handleViewChange}

              // Controlled props
              date={currentDate}
              view={currentView}

              views={views}
              defaultView="week"
            />
          </div>
        </CardContent>
      </Card>

      <CalendarEventDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        onSubmit={selectedEvent ? handleEditEvent : handleCreateEvent}
        onDelete={selectedEvent ? () => setDeletingEvent(selectedEvent) : undefined}
        title={selectedEvent ? 'Edit Calendar Event' : 'Assign Template'}
        initialData={selectedEvent || undefined}
        selectedSlot={selectedSlot}
        templates={templates}
      />

      <DeleteConfirmDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        onConfirm={handleDeleteEvent}
        title="Delete Event"
        description={`Are you sure you want to delete "${deletingEvent?.title}"? This action cannot be undone.`}
      />
    </>
  );
}