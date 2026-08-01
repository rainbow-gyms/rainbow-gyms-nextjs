"use client";

import { useState } from "react";
import SessionCard from "./SessionCard";
import type { AvailableSession } from "@/lib/dbActions";
import { Row, Col } from "react-bootstrap";

type BrowseSessionsProps = {
  sessions: AvailableSession[];
};

export default function BrowseSessions({ sessions }: BrowseSessionsProps) {
  const [workoutType, setWorkoutType] = useState("");
  const [date, setDate] = useState("");

  const filteredSessions = sessions.filter((session) => {
    return (
      (!workoutType || session.workoutType === workoutType) &&
      (!date || session.startTime.toISOString().startsWith(date))
    );
  });

  return (
    <div className="container my-4">
      <h1 className="mb-0 border-bottom border-5">Browse Sessions</h1>
      <Row className="p-4">
        <Col xs={12} md ={2} className="rounded-end-5 rounded-bottom-5 bg-dark text-light mb-4 mb-md-0">
          <h5 className="mt-2">Filter</h5>
        
          <select
            className="mb-2 w-100 rounded border-0"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
          >
            <option value="">All Workouts</option>
            <option value="CHEST">Chest</option>
            <option value="BACK">Back</option>
            <option value="LEGS">Legs</option>
            <option value="SHOULDERS">Shoulders</option>
            <option value="BICEPS">Biceps</option>
            <option value="TRICEPS">Triceps</option>
            <option value="CARDIO">Cardio</option>
          </select>

          <input
            className="mb-4 w-100 rounded border-0"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Col>
      
        <Col xs={12} md={10}>
          <Row>
            {filteredSessions.map((session) => (
              <Col key={session.id} xs={12} md={6} lg={4} className="mb-4">
                <SessionCard session={session} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>    
  );
}
