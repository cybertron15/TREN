"use client"
import { useState, useMemo, useCallback, useEffect } from 'react'
import { Calendar, dateFnsLocalizer, Event, View } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'

// Define event interface
interface CalendarEvent extends Event {
  id: number
  title: string
  start: Date
  end: Date
}

function MyCalendar() {
  const DnDCalendar = withDragAndDrop(Calendar)

  // State for current date and view
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [currentView, setCurrentView] = useState<View>('day')

  // Memoized localizer configuration
  const { localizer, locales } = useMemo(() => {
    const locales = { 'en-US': enUS }

    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    })

    return { localizer, locales }
  }, [])

  // Memoized events
  const events: CalendarEvent[] = useMemo(() => {
    const today = new Date()

    return [
      {
        id: 0,
        title: 'Team Standup',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30, 0),
      },
      {
        id: 1,
        title: 'Client Demo',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0, 0),
      },
      {
        id: 2,
        title: 'Deep Work Session',
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0, 0),
      },
    ]
  }, [])

  // Memoized style object
  const calendarStyle = useMemo(() => ({ height: 500 }), [])

  // Memoized views array
  const views = useMemo(() => (['week', 'day'] as const), [])

  // Memoized draggable accessor
  const draggableAccessor = useCallback(() => true, [])

  // Event handlers with useCallback
  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate)
  }, [])

  const handleViewChange = useCallback((newView: View) => {
    setCurrentView(newView)
  }, [])

 

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        draggableAccessor={draggableAccessor}
        style={calendarStyle}
        now={() => new Date()}

        // Controlled props
        date={currentDate}
        view={currentView}

        // Event handlers
        onNavigate={handleNavigate}
        onView={handleViewChange}

        // View configuration
        defaultView="day"
        views={views}

        showNowIndicator
      />
    </div>
  )
}

export default MyCalendar