// src/app/browse

"use client";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import styles from "./Browse.module.css";

const BrowseMenu = () => {
  return (
    <Container className={`py-5`}>
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="display-4 fw-bold">Browse Sessions</h1>
          <p className="lead mx-auto">
            Find workout partners, join student-led fitness groups, and filter
            available gym sessions across UH Mānoa to fit your schedule.
          </p>
        </Col>
      </Row>
      <Card className={`${styles["custom-card"]} mb-5 p-4 border-0 shadow-sm`}>
        <Form>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group controlId="filterType">
                <Form.Label className="fw-bold">Session Type</Form.Label>
                <Form.Select>
                  <option value="">All Types (Select...)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="filterExperience">
                <Form.Label className="fw-bold">Experience Level</Form.Label>
                <Form.Select>
                  <option value="">All Levels (Select...)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="filterLocation">
                <Form.Label className="fw-bold">Gym Location</Form.Label>
                <Form.Select>
                  <option value="">All Levels (Select...)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="filterDate">
                <Form.Label className="fw-bold">Session Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col md={1} className="d-flex align-items-end gap-2">
              <Button
                type="button"
                variant="outline-secondary"
                className={`w-100 ${styles["custom-btn"]}`}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        <div>For the displaying the different card sessions</div>
      </Card>
    </Container>
  );
};

export default BrowseMenu;
