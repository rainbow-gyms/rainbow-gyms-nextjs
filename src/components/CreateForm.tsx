"use client";

import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createSession } from "@/lib/dbActions";
import { WorkoutType } from "@prisma/client";

type SessionForm = {
  name: string;
  workoutType: WorkoutType;
  location: string;
  description: string;
  startTime: string;
  maxPeople: number;
};

export default function CreateForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<SessionForm>({
    name: "",
    workoutType: WorkoutType.CHEST,
    location: "",
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
          : name === "maxPeople"
            ? Number(value)
            : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.location || !form.startTime) {
      alert("Please fill out all required fields.");
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
        <Form.Control
          name="location"
          value={form.location}
          onChange={updateField}
          placeholder="Gym location"
          required
        />
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
        <Form.Label>Group Size</Form.Label>
        <Form.Select
          name="maxPeople"
          value={form.maxPeople}
          onChange={updateField}
        >
          <option value={2}>2 people</option>
          <option value={3}>3 people</option>
          <option value={5}>5 people</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Session"}
      </Button>
    </Form>
  );
}
