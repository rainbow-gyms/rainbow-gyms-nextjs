import { Row, Col, Card } from "react-bootstrap";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import "./sessions.css";

export default async function mySessions() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: Number(session.user.id),
    },
  });

  if (!profile) {
    redirect("/profile/setup");
  }
  return (
    <Row id="test-row" className="justify-content-start mt-5 g-4 mb-5 p-5">
      <Col md={5} lg={4}>
        <Card
          className="h-100 shadow-sm border-0 overflow-hidden text-white"
          style={{
            backgroundImage: "url('/strong-man-gym.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="h-100 d-flex flex-column justify-content-left p-4"
            style={{
              background: "rgba(0, 0, 0, 0.45)",
            }}
          >
            <h3 className="fw-bold">Session 1</h3>
            <h5>Dumbbell Lifting</h5>
            <p className="mb-0">
              Join a community of UH Mānoa CS and Computer Engineering students.
              Find workout partners, stay accountable, and build connections
              through fitness.
            </p>
          </div>
        </Card>
      </Col>

      <Col md={5} lg={4}>
        <Card
          className="h-100 shadow-sm border-0 overflow-hidden text-white"
          style={{
            backgroundImage: "url('/resistance-band-squats.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="h-100 d-flex flex-column justify-content-left p-4"
            style={{
              background: "rgba(0, 0, 0, 0.45)",
            }}
          >
            <h3 className="fw-bold">Session 2</h3>
            <h5>Pilates</h5>
            <p className="mb-0">
              Schedule workouts around classes and assignments while building
              consistency and maintaining a healthy balance.
            </p>
          </div>
        </Card>
      </Col>

      <Col md={5} lg={4}>
        <Card
          className="h-100 shadow-sm border-0 overflow-hidden text-white"
          style={{
            backgroundImage: "url('/resistance-band-squats.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="h-100 d-flex flex-column justify-content-left p-4"
            style={{
              background: "rgba(0, 0, 0, 0.45)",
            }}
          >
            <h3 className="fw-bold">Session 3</h3>
            <h5>Cardio All Day!</h5>
            <p className="mb-0">
              Schedule workouts around classes and assignments while building
              consistency and maintaining a healthy balance.
            </p>
          </div>
        </Card>
      </Col>

      <Col md={5} lg={4}>
        <Card
          className="h-100 shadow-sm border-0 overflow-hidden text-white"
          style={{
            backgroundImage: "url('/resistance-band-squats.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="h-100 d-flex flex-column justify-content-left p-4"
            style={{
              background: "rgba(0, 0, 0, 0.45)",
            }}
          >
            <h3 className="fw-bold">Session 4</h3>
            <h5>Yoga</h5>
            <p className="mb-0">
              Schedule workouts around classes and assignments while building
              consistency and maintaining a healthy balance.
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
