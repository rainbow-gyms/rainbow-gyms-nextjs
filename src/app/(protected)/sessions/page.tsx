"use client";
import { Row, Col, Card, Container } from "react-bootstrap";
import { ArrowBarLeft, ArrowBarRight } from "react-bootstrap-icons";
import './sessions.css'

const mySessions = () => (
  <Container fluid>
    <Row id = "test-row" className="justify-content-start mt-5 g-2 mb-md-5 p-md-5">
        <Col sm={12} md={5} lg={4}>
          <Card
            className="shadow-sm border-0 overflow-hidden text-white"
            style={{
              backgroundImage: "url('/strong-man-gym.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100%",
              minWidth: "100%"
            }}
          >
            <div
              className="d-flex flex-column justify-content-left p-4"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                minHeight: "100%",
                minWidth: "100%"
              }}
            >
              <h3 className="fw-bold">Session 1</h3>
              <h5>Dumbbell Lifting</h5>
              <p className="mb-0">
                Join a community of UH Mānoa CS and Computer Engineering
                students. Find workout partners, stay accountable, and build
                connections through fitness.
              </p>
            </div>
          </Card>
        </Col>

        <Col sm={12} md={5} lg={4}>
          <Card
            className="shadow-sm border-0 overflow-hidden text-white"
            style={{
              backgroundImage: "url('/resistance-band-squats.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100%",
              minWidth: "100%"
            }}
          >
            <div
              className="d-flex flex-column justify-content-left p-4"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                minHeight: "100%",
                minWidth: "100%"
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

        <Col sm={12} md={5} lg={4}>
          <Card
            className="shadow-sm border-0 overflow-hidden text-white"
            style={{
              backgroundImage: "url('/resistance-band-squats.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100%",
              minWidth: "100%"
            }}
          >
            <div
              className="d-flex flex-column justify-content-left p-4"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                minHeight: "100%",
                minWidth: "100%"
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

        <Col sm={12} md={5} lg={4}>
          <Card
            className="shadow-sm border-0 overflow-hidden text-white"
            style={{
              backgroundImage: "url('/resistance-band-squats.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "100%",
              minWidth: "100%"
            }}
          >
            <div
              className="d-flex flex-column justify-content-left p-4"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                minHeight: "100%",
                minWidth: "100%"
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
      <div className="d-flex d-md-none justify-content-center align-items-center mt-2 mb-5">
        <ArrowBarLeft />SCROLL<ArrowBarRight />
      </div>
    </Container>
);

export default mySessions;