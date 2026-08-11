"use client";

import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Badge,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import JoinButton from "./Browse/JoinButton";
import { useSession } from "next-auth/react";

type SessionProfileProps = {
  session: {
    id: number;
    name: string;
    workoutType: string;
    location: string;
    startTime: Date | string;
    description: string | null;
    maxPeople: number;
    hostId: number;
    status?: string;
    host: {
      id: number;
      profile: {
        displayName: string | null;
        profilePicture: string | null;
        experienceLevel?: string | null;
      } | null;
    };
    participants: {
      id: number;
      userId: number;
      user: {
        id: number;
        profile: {
          displayName: string;
          profilePicture: string | null;
        } | null;
      };
    }[];
  };
  isPopup?: boolean;
  onClose?: () => void;
};

export default function SessionProfileDetails({
  session,
  isPopup = false,
  onClose,
}: SessionProfileProps) {
  const { data: currentsession } = useSession();
  const userId = Number(currentsession?.user.id);

  const alreadyParticipating = session.participants.some(
    (participant) => participant.userId === userId
  );

  // Determine if the session is full
  const isFull =
    session.status === 'FULL' ||
    session.participants.length >= session.maxPeople;
  
  return (
    <Container className={isPopup ? "py-2" : "py-5"}>
      <Row className="justify-content-center">
        {/* Widen the column structure if it's in a popup to utilize the XL modal space */}
        <Col md={isPopup ? 12 : 8} lg={isPopup ? 12 : 6}>
          <Card className="shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <Card.Header className="bg-white border-0 pt-4 pb-0">
              <Card.Title className="mb-3 fs-3 fw-bold">
                {session.name}
              </Card.Title>

              <div className="d-flex align-items-center mb-2">
                <Link href={`/profile/${session.host.id}`} className="text-decoration-none">
                  <Image
                    src={session.host.profile?.profilePicture || "/pfp-default.png"}
                    width={65}
                    height={65}
                    roundedCircle
                    className="me-3 border"
                    style={{ objectFit: "cover" }}
                    alt="Host profile picture"
                  />
                </Link>

                <div className="d-flex flex-column justify-content-center">
                  <Card.Subtitle className="text-muted mb-1">
                    Hosted by {session.host.profile?.displayName || "Unknown"}
                  </Card.Subtitle>

                  {session.host.profile?.experienceLevel && (
                    <div>
                      <Badge bg="info" className="text-white text-uppercase" style={{ fontSize: '0.7em' }}>
                        {session.host.profile.experienceLevel}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </Card.Header>

            <Card.Body>
              <Row className="mb-4 g-3">
                <Col xs={6}>
                  <strong>Location:</strong> <br />
                  {session.location}
                </Col>
                <Col xs={6}>
                  <strong>Workout Type:</strong> <br />
                  <Badge bg="primary">{session.workoutType}</Badge>
                </Col>
                <Col xs={6}>
                  <strong>Date & Time:</strong> <br />
                  {new Date(session.startTime).toLocaleString()}
                </Col>
                <Col xs={6}>
                  <strong>Capacity:</strong> <br />
                  {session.participants.length} / {session.maxPeople}{" "}
                  Participants
                </Col>
              </Row>

              <div className="mb-4">
                <h5 className="fw-bold">Description</h5>
                <p>
                  {session.description ||
                    "No description provided for this session."}
                </p>
              </div>

              <h5 className="fw-bold mt-4">Participants</h5>

              <div
                className="d-flex gap-3 mt-3 overflow-auto"
                style={{
                  whiteSpace: "nowrap",
                  paddingBottom: "8px",
                }}
              >
                {session.participants.map((participant) => (
                  <Link
                    key={participant.id}
                    href={`/profile/${participant.user.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div
                      className="text-center"
                      style={{
                        minWidth: "75px",
                      }}
                    >
                      <Image
                        src={
                          participant.user.profile?.profilePicture ||
                          "/pfp-default.png"
                        }
                        roundedCircle
                        width={60}
                        height={60}
                        alt={
                          participant.user.profile?.displayName || "Participant"
                        }
                        className="border"
                        style={{ objectFit: "cover" }}
                      />

                      <div className="mt-2 small fw-semibold text-truncate">
                        {participant.user.profile?.displayName || "Unknown"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Dynamic Button Section */}
              <div className="d-flex gap-3 mt-4">
                {isPopup ? (
                  <>
                    <Button variant="secondary" onClick={onClose} className="flex-grow-1">
                      Close
                    </Button>
                    
                    {isFull ? (
                      <Button variant="danger" disabled className="flex-grow-1 w-100">
                        Session Full
                      </Button>
                    ) : (userId === session.hostId || alreadyParticipating) ? (
                      <Button variant="success" disabled className="flex-grow-1 w-100">
                        Already Joined
                      </Button>
                    ) : (
                      <div className="flex-grow-1 d-flex">
                        <JoinButton sessionId={session.id} />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Link href="/" className="text-decoration-none flex-grow-1">
                      <Button variant="outline-secondary" className="w-100">
                        Back to Browse
                      </Button>
                    </Link>

                    {/* Adds "Back to My Sessions" button and hides the "Join" button if userid matches the session host's id */}
                    {userId === session.hostId || alreadyParticipating ? (
                      <Link href="/sessions" className="text-decoration-none flex-grow-1">
                        <Button variant="outline-secondary" className="w-100">
                          Back to My Sessions
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex-grow-1 d-flex"> 
                        <JoinButton sessionId={session.id} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}