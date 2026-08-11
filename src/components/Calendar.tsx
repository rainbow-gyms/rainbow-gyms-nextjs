'use client';

import { useState } from 'react';
import { Card, Button, Badge, Modal, Form, Row, Col } from 'react-bootstrap';
import { WorkoutType, GymLocation, ExperienceLevel } from "@prisma/client";
import SessionProfileDetails from "@/components/SessionProfilePage";

export interface CalendarSession {
  id: number;
  name: string;
  startTime: Date | string; 
  workoutType: string;
  status?: string;
  maxPeople?: number;
  location?: string;
  _count?: {
    participants: number;
  };
  participants?: any[];
  host?: {
    profile?: {
      experienceLevel?: string;
    };
  };
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

  // State to manage filters
  const [workoutType, setWorkoutType] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [minSpots, setMinSpots] = useState<string>("");

  const workoutTypes = Object.values(WorkoutType);

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

  const handleResetFilters = () => {
    setWorkoutType("");
    setExperience("");
    setLocation("");
    setMinSpots("");
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

  // Apply filters to sessions before rendering them on the calendar
  const filteredSessions = sessions.filter((session) => {
    const matchesType = !workoutType || session.workoutType === workoutType;
    const matchesLocation = !location || session.location === location;
    
    const matchesExperience =
      !experience || session.host?.profile?.experienceLevel === experience;

    // Calculate current participants for the spots filter
    let currentParticipants = 0;
    if (session._count?.participants !== undefined) {
      currentParticipants = session._count.participants;
    } else if (session.participants !== undefined) {
      currentParticipants = session.participants.length;
    }

    const spotsAvailable = session.maxPeople !== undefined ? session.maxPeople - currentParticipants : 0;
    const matchesParticipants = !minSpots || spotsAvailable >= Number(minSpots);

    return matchesType && matchesLocation && matchesExperience && matchesParticipants;
  });

  const calendarCells = [];
  
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="border bg-light"></div>);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    // Only search through the sessions that passed the filter criteria
    const daySessions = filteredSessions.filter((session) => {
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
    <div className="d-flex flex-column gap-3">
      {/* Filters Card */}
      <Card className="shadow-sm border-0 p-3">
        <Form>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group controlId="filterType">
                <Form.Label className="fw-bold small mb-1">Workout Type</Form.Label>
                <Form.Select size="sm" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                  <option value="">All Types (Select...)</option>
                  {workoutTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="filterLocation">
                <Form.Label className="fw-bold small mb-1">Gym Location</Form.Label>
                <Form.Select size="sm" value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">All Locations</option>
                  <option value={GymLocation.WARRIOR}>War Rec Center</option>
                  <option value={GymLocation.HILO}>Student Life Center</option>
                  <option value={GymLocation.WEST}>Nāulu Center</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="filterExperience">
                <Form.Label className="fw-bold small mb-1">Host Experience</Form.Label>
                <Form.Select size="sm" value={experience} onChange={(e) => setExperience(e.target.value)}>
                  <option value="">Any Experience</option>
                  <option value={ExperienceLevel.BEGINNER}>Beginner</option>
                  <option value={ExperienceLevel.INTERMEDIATE}>Intermediate</option>
                  <option value={ExperienceLevel.ADVANCED}>Advanced</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="filterParticipants">
                <Form.Label className="fw-bold small mb-1">Min Spots</Form.Label>
                <Form.Select size="sm" value={minSpots} onChange={(e) => setMinSpots(e.target.value)}>
                  <option value="">Any</option>
                  <option value="1">1+ spot</option>
                  <option value="2">2+ spots</option>
                  <option value="3">3+ spots</option>
                  <option value="5">5+ spots</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={1} className="d-flex align-items-end">
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                className="w-100"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Calendar Card */}
      <Card className="shadow-sm border-0 p-3 d-flex flex-column" style={{ height: '75vh' }}>
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
        size="xl" 
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
    </div>
  );
};

export default SimpleCalendar;