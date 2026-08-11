'use client';

import { useState } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import SessionProfileDetails from "@/components/SessionProfilePage";

export interface CalendarSession {
  id: number;
  name: string;
  startTime: Date | string; 
  workoutType: string;
  status?: string;
  maxPeople?: number;
  _count?: {
    participants: number;
  };
  participants?: any[];
  [key: string]: any; 
}

interface SimpleCalendarProps {
  sessions?: CalendarSession[];
}

const SimpleCalendar = ({ sessions = [] }: SimpleCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // State to manage the popup modal
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CalendarSession | null>(null);

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

  const handleSessionClick = (session: CalendarSession) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  // Helper function to check if a session is full
  const isSessionFull = (session: CalendarSession) => {
    if (session.status === 'FULL') return true;
    if (session.maxPeople !== undefined) {
      if (session._count?.participants !== undefined && session._count.participants >= session.maxPeople) {
        return true;
      }
      if (session.participants !== undefined && session.participants.length >= session.maxPeople) {
        return true;
      }
    }
    return false;
  };

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
          {daySessions.map((session) => {
            const isFull = isSessionFull(session);

            return (
              <Badge 
                key={session.id} 
                bg={isFull ? 'danger' : 'primary'} 
                className="mb-1 d-block text-truncate text-start"
                title={`${session.name} - ${session.workoutType}${isFull ? ' (FULL)' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSessionClick(session)}
              >
                {session.name} {isFull && '[FULL]'}
              </Badge>
            );
          })}
        </div>
      </div>
    );
  }

  const isSelectedFull = selectedSession ? isSessionFull(selectedSession) : false;

  return (
    <>
      <Card className="shadow-sm border-0 p-3 d-flex flex-column" style={{ height: 'calc(100vh - 40px)' }}>
        <div className="d-flex justify-content-between align-items-center mb-2 flex-shrink-0">
          <Button variant="outline-dark" size="sm" onClick={prevMonth}>&larr; Prev</Button>
          <h5 className="mb-0 fw-bold">{monthNames[month]} {year}</h5>
          <Button variant="outline-dark" size="sm" onClick={nextMonth}>Next &rarr;</Button>
        </div>

        <div className="d-grid flex-shrink-0 mb-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="fw-bold text-center p-2 bg-secondary text-white small">
              {d}
            </div>
          ))}
        </div>

        <div className="d-grid flex-grow-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}>
          {calendarCells}
        </div>
      </Card>

      {/* Session Details Popup Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        size="lg" 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedSession?.name || "Session Details"}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-3">
          {selectedSession && (
            <div className="hide-modal-internal-buttons">
              <style>{`
                .hide-modal-internal-buttons button,
                .hide-modal-internal-buttons a.btn {
                  display: none !important;
                }
              `}</style>
              <SessionProfileDetails session={selectedSession} isPopup={true} />
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="justify-content-center gap-5">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>

          {isSelectedFull ? (
            <Button variant="danger" disabled>
              Session Full
            </Button>
          ) : (
            <Button variant="primary">
              Join Session
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SimpleCalendar;