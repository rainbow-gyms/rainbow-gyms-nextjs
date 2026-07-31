import { Row, Col, Card, Button } from "react-bootstrap";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import "./sessions.css";

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

  // ADD THIS HERE
  const sessions = await prisma.session.findMany({
    where: {
      hostId: userId,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <div className="container mt-4">
      <h1>My Sessions</h1>

      {sessions.length === 0 ? (
        <p>You haven&apos;t created any sessions yet.</p>
      ) : (
        <Row>
          {sessions.map((workout) => (
            <Col key={workout.id} md={6} lg={4}>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>

                  <p>Workout: {workout.workoutType}</p>

                  <p>Location: {workout.location}</p>

                  <p>Time: {new Date(workout.startTime).toLocaleString()}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
