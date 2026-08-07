// /src/components/BrowseMenu.tsx

"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { WorkoutType, GymLocation } from "@prisma/client";
import SessionCard from "./SessionCard";
import styles from "./Browse.module.css";
import { AvailableSession } from "@/lib/dbActions";

// Define the shape of our nested Prisma data
type BrowseSessionsProps = {
  sessions: AvailableSession[];
};

export default function BrowseMenu({ sessions }: BrowseSessionsProps) {
  // Filter states
  const [workoutType, setWorkoutType] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [minSpots, setMinSpots] = useState("");

  const workoutTypes = Object.values(WorkoutType);

  // Filter the sessions based on the selected state(s)
  const filteredSessions = sessions.filter((session) => {
    const matchesType = !workoutType || session.workoutType === workoutType;
    const matchesLocation = !location || session.location === location;

    const matchesDate =
      !date || new Date(session.startTime).toISOString().startsWith(date);

    const matchesExperience =
      !experience || session.host.profile?.experienceLevel === experience;

    const hasSpace = session.participants.length < session.maxPeople;

    const matchesParticipants =
      !minSpots ||
      session.maxPeople - session.participants.length >= Number(minSpots);

    return (
      matchesType &&
      matchesLocation &&
      matchesDate &&
      matchesExperience &&
      hasSpace &&
      matchesParticipants
    );
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
              Find workout partners, join student-led fitness groups, and filter
              available gym sessions across UH Campuses to fit your schedule.
            </p>
          </Col>
        </Row>

        {/* Filter Controls */}
        <Card
          className={`${styles["custom-card"]} mb-5 p-4 border-0 shadow-sm`}
        >
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
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
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
                    <option value="">All Locations</option>
                    <option value={GymLocation.WARRIOR}>War Rec Center</option>
                    <option value={GymLocation.HILO}>
                      Student Life Center
                    </option>
                    <option value={GymLocation.WEST}>Nāulu Center</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="filterParticipants">
                  <Form.Label className="fw-bold">
                    Minimum Open Spots
                  </Form.Label>

                  <Form.Select
                    value={minSpots}
                    onChange={(e) => setMinSpots(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="1">1+ spot</option>
                    <option value="2">2+ spots</option>
                    <option value="3">3+ spots</option>
                    <option value="5">5+ spots</option>
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
                  className={`w-100 ${styles["custom-btn"]}`}
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
              <h5 className="text-muted">
                No sessions found matching your criteria.
              </h5>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
}
