import {Card, CardBody, CardTitle, CardSubtitle, Image, Button, Badge } from "react-bootstrap"
import Link from "next/link";
import type { AvailableSession } from "@/lib/dbActions";
import DeleteButton from "./DeleteButton";

type MySessionCardProps = {
  mysession: AvailableSession;
  userid: number;
};

export default function MySessionCard({ mysession, userid }: MySessionCardProps) {
  return (
    <Card
      className="shadow h-100 border-0"
      style={{
        borderRadius: "15px",
      }}
    >
      <CardBody className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <Image
            src={mysession.host.profile?.profilePicture || "/pfp-default.png"}
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
            <CardTitle className="mb-1">{mysession.name}</CardTitle>

            {userid === mysession.hostId ? (
              <CardSubtitle className="text-muted">
                Host: <span className="text-dark">{mysession.host.profile?.displayName || "Unknown"} (You)</span>
              </CardSubtitle>
            ) : ( 
              <CardSubtitle className="text-muted">
                Hosted By: {mysession.host.profile?.displayName || "Unknown"}
              </CardSubtitle>
            )} 
          </div>
        </div>

        <div className="mb-3">
          <p className="mb-1">
            <strong>Location:</strong> {mysession.location}
          </p>

          <p className="mb-1">
            <strong>Workout:</strong>{" "}
            <Badge bg="primary">{mysession.workoutType}</Badge>
          </p>

          <p className="mb-1">
            <strong>Date:</strong>{" "}
            {new Date(mysession.startTime).toLocaleString()}
          </p>

          <p className="mb-1">
            <strong>Participants:</strong> {mysession.participants.length}/
            {mysession.maxPeople}
          </p>
        </div>

        <div className="mt-auto d-flex gap-2">
          <Link href={`/sessionProfile/${mysession.id}`}>
            <Button variant="outline-primary">More Info</Button>
          </Link>

          {/*hide delete button if current user is not the same as the session's host*/}
          {userid === mysession.hostId ? (
            <DeleteButton sessionId = {mysession.id} sessionName={mysession.name}/>
          ) : (
            <div></div>
          )}  

        </div>
      </CardBody>
    </Card>
  );
}
