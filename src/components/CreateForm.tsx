"use client";

import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { createSession } from "@/lib/dbActions";
import { WorkoutType, GymLocation } from "@prisma/client";

type SessionForm = {
  name: string;
  workoutType: WorkoutType;
  location: GymLocation;
  description: string;
  startTime: string;
  maxPeople: number;
};

export default function CreateForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<SessionForm>({
    name: "",
    workoutType: WorkoutType.CHEST,
    location: GymLocation.WARRIOR,
    description: "",
    startTime: "",
    maxPeople: 2,
  });

  function updateField(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "workoutType"
          ? (value as WorkoutType)
          : name === "location"
            ? (value as GymLocation)
            : name === "maxPeople"
              ? Math.max(2, Number(value))
              : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.location || !form.startTime) {
      alert("Please fill out all required fields.");
      return;
    }

    if (form.maxPeople < 2) {
      alert("Group size must be at least 2 people.");
      return;
    }

    setLoading(true);

    try {
      await createSession({
        ...form,
        startTime: new Date(form.startTime),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="justify-content-center my-4">
      <Row className="justify-content-center">
        <Col xs={11} sm={8} md={5} lg={4} className="m-5">
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <h1 className="text-center border-bottom border-5 mb-4">
                Create Session
              </h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Session Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="Example: Morning Chest Workout"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Workout Type</Form.Label>
                  <Form.Select
                    name="workoutType"
                    value={form.workoutType}
                    onChange={updateField}
                  >
                    <option value={WorkoutType.CHEST}>Chest</option>
                    <option value={WorkoutType.BACK}>Back</option>
                    <option value={WorkoutType.LEGS}>Legs</option>
                    <option value={WorkoutType.SHOULDERS}>Shoulders</option>
                    <option value={WorkoutType.BICEPS}>Biceps</option>
                    <option value={WorkoutType.TRICEPS}>Triceps</option>
                    <option value={WorkoutType.CARDIO}>Cardio</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>

                  <Form.Select
                    name="location"
                    value={form.location}
                    onChange={updateField}
                  >
                    <option value={GymLocation.WARRIOR}>War Rec Center</option>
                    <option value={GymLocation.HILO}>
                      Student Life Center
                    </option>
                    <option value={GymLocation.WEST}>Nāulu Center</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Info</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    placeholder="Anything others should know?"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="startTime"
                    value={form.startTime}
                    onChange={updateField}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Maximum Participants</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPeople"
                    value={form.maxPeople}
                    onChange={updateField}
                    min={2}
                    max={40}
                    required
                  />
                </Form.Group>

                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Session"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
