// src/components/Browse/SessionCard.tsx

import { Card, Image, Button, Badge } from "react-bootstrap";
import Link from "next/link";
import type { AvailableSession } from "@/lib/dbActions";
import JoinButton from "./JoinButton";

type SessionCardProps = {
  session: AvailableSession;
};

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <Card
      className="shadow h-100 border-0"
      style={{
        borderRadius: "15px",
      }}
    >
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <Image
            src={session.host.profile?.profilePicture || "/pfp-default.png"}
            width={55}
            height={55}
            roundedCircle
            alt="profile picture"
            style={{
              objectFit: "cover",
            }}
            className="me-3 border"
          />

          <div>
            <Card.Title className="mb-1">{session.name}</Card.Title>

            <Card.Subtitle className="text-muted">
              {session.host.profile?.displayName || "Unknown"}
            </Card.Subtitle>
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-1">
            <strong>Location:</strong> {session.location}
          </p>

          <p className="mb-1">
            <strong>Workout:</strong>{" "}
            <Badge bg="primary">{session.workoutType}</Badge>
          </p>

          <p className="mb-1">
            <strong>Date:</strong>{" "}
            {new Date(session.startTime).toLocaleString()}
          </p>

          <p className="mb-1">
            <strong>Participants:</strong> {session.participants.length}/
            {session.maxPeople}
          </p>
        </div>

        <div className="mt-auto d-flex gap-2">
          <Link href={`/sessionProfile/${session.id}`}>
            <Button variant="outline-primary">More Info</Button>
          </Link>

          <JoinButton sessionId={session.id} />
        </div>
      </Card.Body>
    </Card>
  );
}
