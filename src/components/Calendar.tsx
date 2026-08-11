'use client';

import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

export interface CalendarSession {
  id: number;
  name: string;
  startTime: Date | string; 
  workoutType: string;
}

interface SimpleCalendarProps {
  sessions?: CalendarSession[];
}

const SimpleCalendar = ({ sessions = [] }: SimpleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarCells = [];
  
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="border bg-light"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const daySessions = sessions.filter((session) => {
      const sessionDate = new Date(session.startTime);
      return (
        sessionDate.getFullYear() === year &&
        sessionDate.getMonth() === month &&
        sessionDate.getDate() === day
      );
    });

    calendarCells.push(
      <div key={day} className="border text-start p-2 hover-highlight d-flex flex-column" style={{ minHeight: '100px' }}>
        <span className="fw-semibold mb-1">{day}</span>
        
        <div className="overflow-auto" style={{ flex: 1 }}>
          {daySessions.map((session) => (
            <Badge 
              key={session.id} 
              bg="primary" 
              className="mb-1 d-block text-truncate text-start"
              title={`${session.name} - ${session.workoutType}`}
            >
              {session.name}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="shadow-sm border-0 p-3 d-flex flex-column" style={{ height: 'calc(100vh - 40px)' }}>
      {/* Header Controls */}
      <div className="d-flex justify-content-between align-items-center mb-2 flex-shrink-0">
        <Button variant="outline-dark" size="sm" onClick={prevMonth}>&larr; Prev</Button>
        <h5 className="mb-0 fw-bold">{monthNames[month]} {year}</h5>
        <Button variant="outline-dark" size="sm" onClick={nextMonth}>Next &rarr;</Button>
      </div>

      {/* Weekday Headers */}
      <div className="d-grid flex-shrink-0 mb-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="fw-bold text-center p-2 bg-secondary text-white small">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="d-grid flex-grow-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}>
        {calendarCells}
      </div>
    </Card>
  );
};

export default SimpleCalendar;