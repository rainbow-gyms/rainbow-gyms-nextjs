// src/app/sessions/page.tsx

import { Row, Col } from "react-bootstrap";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function mySessions() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const userId = Number(session.user.id);

  const profile = await prisma.profile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    redirect("/profile/setup");
  }

  const sessions = await prisma.session.findMany({
    where: {
      OR: [
        {
          hostId: userId,
        },
        {
          participants: {
            some: {
              userId: userId,
            },
          },
        },
      ],
    },

    include: {
      host: {
        include: {
          profile: true,
        },
      },
      participants: true,
    },

    orderBy: {
      startTime: "asc",
    },
  });
  return (
    <div className="container my-4">
      <h1 className="mb-4 border-bottom border-5 display-4 fw-bold">
        My Sessions
      </h1>

      {sessions.length === 0 ? (
        <p>No sessions found. Create a session or join one from Browse.</p>
      ) : (
        <Row>
          {sessions.map((workout) => (
            <Col key={workout.id} md={6} lg={4}>
              <div
                className="card mb-4 shadow border-0 h-100"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fw-bold mb-0">{workout.name}</h5>

                    <span
                      className="badge bg-primary"
                      style={{
                        borderRadius: "20px",
                        padding: "8px 12px",
                      }}
                    >
                      {workout.workoutType}
                    </span>
                  </div>

                  <hr />

                  <p className="mb-2">
                    <strong>👤 Host:</strong>{" "}
                    {workout.host.profile?.displayName || "Unknown"}
                  </p>

                  <p className="mb-2">
                    <strong>📍 Location:</strong> {workout.location}
                  </p>

                  <p className="mb-2">
                    <strong>🕒 Time:</strong>{" "}
                    {new Date(workout.startTime).toLocaleString()}
                  </p>

                  <p className="mb-0">
                    <strong>💪 Participants:</strong>{" "}
                    {workout.participants.length}/{workout.maxPeople}
                  </p>

                  <div className="mt-4">
                    <div
                      className="progress"
                      style={{
                        height: "8px",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: `${
                            (workout.participants.length / workout.maxPeople) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
