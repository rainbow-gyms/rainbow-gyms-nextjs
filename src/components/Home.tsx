import { Button, Col, Card, Container, Row } from "react-bootstrap";

/** The Home page. */
const Home = () => (
  <main
    style={{
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
    }}
  >
    <Container fluid className="py-5 pt-0">
      {/* Hero Section */}
      <Row className="justify-content-center text-center pt-5 mb-5 px-3">
        <Col xs={12} md={8} lg={6}>
          <h1 className="display-4 display-md-3 fw-bold mb-3">
            Stay Active. Stay Connected.
          </h1>

          <h2 className="h3 h-md-2 fw-semibold mb-4">
            Balance Fitness &amp; Academics.
          </h2>

          <p className="lead fs-5 fs-md-4 mb-4">
            A fitness community built for University of Hawaii Computer Science
            and Computer Engineering students. Find workout partners, create gym
            sessions, and stay consistent while balancing classes, assignments,
            and personal growth.
          </p>
        </Col>
      </Row>

      {/* Feature Cards */}
      <Row className="justify-content-center g-4 mb-5 px-3">
        <Col md={5} lg={4}>
          <Card
            className="h-100 shadow-sm border-0 overflow-hidden text-white"
            style={{
              minHeight: "350px",
              backgroundImage: "url('/strong-man-gym.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="h-100 d-flex flex-column justify-content-center p-4"
              style={{
                minHeight: "350px",
                background: "rgba(0, 0, 0, 0.45)",
              }}
            >
              <h3 className="fw-bold">Find Your Workout Partners</h3>
              <p className="mb-0">
                Join a community of UH Mānoa CS and Computer Engineering
                students. Find workout partners, stay accountable, and build
                connections through fitness.
              </p>
            </div>
          </Card>
        </Col>

        <Col md={5} lg={4}>
          <Card
            className="h-100 shadow-sm border-0 overflow-hidden text-white"
            style={{
              minHeight: "350px",
              backgroundImage: "url('/resistance-band-squats.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="h-100 d-flex flex-column justify-content-center p-4"
              style={{
                minHeight: "350px",
                background: "rgba(0, 0, 0, 0.45)",
              }}
            >
              <h3 className="fw-bold">Plan Your Gym Sessions</h3>
              <p className="mb-0">
                Schedule workouts around classes and assignments while building
                consistency and maintaining a healthy balance.
              </p>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bottom CTA */}
      <Row className="justify-content-center text-center pt-3 border-top">
        <Col lg={8}>
          <h2 className="fw-bold mb-3">Ready to start your fitness journey?</h2>

          <p className="mb-4">
            Join Rainbow-Gyms and connect with students who want to stay active
            while succeeding academically.
          </p>

          <Button href="/auth/signup" variant="success" size="lg">
            Create Your Account
          </Button>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
