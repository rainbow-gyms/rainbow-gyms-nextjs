'use client';

import { Container, Row, Col, Card, Image, Badge, Button } from 'react-bootstrap';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import JoinButton from './Browse/JoinButton';

type SessionProfileProps = {
  session: {
    id: number;
    name: string;
    workoutType: string;
    location: string;
    startTime: Date;
    description: string | null;
    maxPeople: number;
    hostId: number;
    host: {
      profile: {
        displayName: string | null;
        profilePicture: string | null;
      } | null;
    };
    participants: { id: number, userId: number }[];
  };
};



export default function SessionProfileDetails({ session }: SessionProfileProps) {
  const { data: currentsession } = useSession();
  const userId = Number(currentsession?.user.id);

  const alreadyParticipating = session.participants.some((participant) => participant.userId === userId);
  {/*test*/}
  console.log("hostId: " + session.hostId);
  console.log("userId: " + currentsession?.user.id);
  console.log("sessionId: " + session.id);
  console.log("isParts: " + alreadyParticipating);
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <Card.Header className="bg-white border-0 pt-4 pb-0">
              <div className="d-flex align-items-center mb-3">
                <Image
                  src={session.host.profile?.profilePicture || '/pfp-default.png'}
                  width={65}
                  height={65}
                  roundedCircle
                  alt="Host profile picture"
                  style={{ objectFit: 'cover' }}
                  className="me-3 border"
                />
                <div>
                  <Card.Title className="mb-1 fs-3 fw-bold">{session.name}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    Hosted by {session.host.profile?.displayName || 'Unknown'}
                  </Card.Subtitle>
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
                  {session.participants.length} / {session.maxPeople} Participants
                </Col>
              </Row>

              <div className="mb-4">
                <h5 className="fw-bold">Description</h5>
                <p>
                  {session.description || "No description provided for this session."}
                </p>
              </div>

              <div className="d-flex gap-3 mt-4">
                <Link href="/" className="text-decoration-none flex-grow-1">
                  <Button variant="outline-secondary" className="w-100">
                    Back to Browse
                  </Button>
                </Link>

                {/*adds back to my sessions button if userid macthes the session host's id*/}
                {/*hides join button if userid macthes the session host's id */}
                {userId === session.hostId || alreadyParticipating ? (
                  <Link href="/sessions" className="text-decoration-none flex-grow-1">
                    <Button variant="outline-secondary" className="w-100">
                      Back to My Sessions
                    </Button>
                  </Link>
                ) : (
                  <div className="flex-grow-1"> 
                    <JoinButton sessionId={session.id} />
                  </div>
                )}
                
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}