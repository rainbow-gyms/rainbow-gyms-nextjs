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
    <div>
      <select
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
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Row>
        {filteredSessions.map((session) => (
          <Col key={session.id} xs={12} md={6} lg={4} className="mb-4">
            <SessionCard session={session} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
