"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { WorkoutType } from "@prisma/client";
import SessionCard from "./SessionCard";
import styles from "./Browse.module.css";

// Define the shape of our nested Prisma data
type SessionWithHost = {
  id: number;
  name: string;
  workoutType: string;
  location: string;
  startTime: Date;
  maxPeople: number;
  status: string;
  host: {
    profile: {
      experienceLevel: string;
    } | null;
  };
};

type BrowseMenuProps = {
  sessions: SessionWithHost[];
};

export default function BrowseMenu({ sessions }: BrowseMenuProps) {
  // Filter states
  const [workoutType, setWorkoutType] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const workoutTypes = Object.values(WorkoutType);

  // Filter the sessions based on the selected state(s)
  const filteredSessions = sessions.filter((session) => {
    const matchesType = !workoutType || session.workoutType === workoutType;
    const matchesLocation = !location || session.location === location;

    // Extract the YYYY-MM-DD from the session's DateTime to match the HTML date input
    const matchesDate = !date || new Date(session.startTime).toISOString().startsWith(date);
    const matchesExperience = !experience || session.host.profile?.experienceLevel === experience;

    return matchesType && matchesLocation && matchesDate && matchesExperience;
  });

  // Resets all filters to their default state
  const handleReset = () => {
    setWorkoutType("");
    setExperience("");
    setLocation("");
    setDate("");
  };

  return (
    <main>
      <Container className="py-5">
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="display-4 fw-bold">Browse Sessions</h1>
            <p className="lead mx-auto">
              Find workout partners, join student-led fitness groups, and filter available gym sessions across UH Mānoa to fit your schedule.
            </p>
          </Col>
        </Row>

        {/* Filter Controls */}
        <Card className={`${styles['custom-card']} mb-5 p-4 border-0 shadow-sm`}>
          <Form>
            <Row className="g-3">
              <Col md={3}>
                <Form.Group controlId="filterType">
                  <Form.Label className="fw-bold">Workout Type</Form.Label>
                  <Form.Select 
                    value={workoutType} 
                    onChange={(e) => setWorkoutType(e.target.value)}
                  >
                    <option value="">All Types (Select...)</option>
                    {workoutTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="filterExperience">
                  <Form.Label className="fw-bold">Host Experience</Form.Label>
                  <Form.Select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="">All Levels (Select...)</option>
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="filterLocation">
                  <Form.Label className="fw-bold">Gym Location</Form.Label>
                  <Form.Select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">All Locations (Select...)</option>
                    <option value="Manoa">UH Mānoa</option>
                    <option value="West Oahu">UH West O&apos;ahu</option>
                    <option value="Hilo">UH Hilo</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group controlId="filterDate">
                  <Form.Label className="fw-bold">Session Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={1} className="d-flex align-items-end gap-2">
                <Button 
                  type="button" 
                  variant="outline-secondary" 
                  className={`w-100 ${styles['custom-btn']}`}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* Filtered Results Grid */}
        <Row>
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <Col key={session.id} xs={12} md={6} lg={4} className="mb-4">
                <SessionCard session={session} />
              </Col>
            ))
          ) : (
            <Col className="text-center mt-4">
              <h5 className="text-muted">No sessions found matching your criteria.</h5>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
}