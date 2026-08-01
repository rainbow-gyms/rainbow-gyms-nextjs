"use client";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { createProfile } from "@/lib/dbActions";
import { useState } from "react";

type ProfileForm = {
  displayName: string;
  major: string;
  year: "FRESHMAN" | "SOPHOMORE" | "JUNIOR" | "SENIOR" | "GRADUATE";
  experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  bio: string;
  profilePicture?: string;
};

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState<ProfileForm>({
    displayName: "",
    major: "",
    year: "FRESHMAN",
    experienceLevel: "BEGINNER",
    bio: "",
    profilePicture: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createProfile(formData);
  };

  return (
    <main className="d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={8} md={5} lg={4} className="m-5">
            <Card className="shadow border-0">
              <Card.Body className="p-4">
                <h1 className="text-center border-bottom border-5 mb-4">Setup Profile</h1>
                <Form onSubmit={onSubmit} className="text-center">
                  <Form.Group className="form-group py-2">
                    <div>
                      <input
                        className="w-100 text-center rounded"
                        placeholder="Display Name"
                        value={formData.displayName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            displayName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="form-group py-2">
                    <div>
                      <input
                        className="w-100 text-center rounded"
                        placeholder="Major"
                        value={formData.major}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            major: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="form-group py-2">
                    <Form.Label>Year</Form.Label>
                    <div>
                      <select
                        className="w-100 text-center rounded"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            year: e.target.value as ProfileForm["year"],
                          })
                        }
                      >
                        <option value="FRESHMAN">Freshman</option>
                        <option value="SOPHOMORE">Sophomore</option>
                        <option value="JUNIOR">Junior</option>
                        <option value="SENIOR">Senior</option>
                        <option value="GRADUATE">Graduate</option>
                      </select>
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="form-group py-2">
                    <Form.Label>Exercise Experience</Form.Label>
                    <div>
                      <select
                        className="w-100 text-center rounded"
                        value={formData.experienceLevel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            experienceLevel: e.target.value as
                              | "BEGINNER"
                              | "INTERMEDIATE"
                              | "ADVANCED",
                          })
                        }
                      >
                        <option value="BEGINNER">Beginner</option>
                        <option value="INTERMEDIATE">Intermediate</option>
                        <option value="ADVANCED">Advanced</option>
                      </select>
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="form-group py-2">
                    <div>
                      <textarea
                        className="w-100 text-center rounded"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bio: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Form.Group >
                  <hr />
                  <Form.Group className="form-group py-2">
                    <div>
                      <input
                        className="w-100 text-center rounded"
                        placeholder="Profile Picture URL"
                        value={formData.profilePicture}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            profilePicture: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Form.Group>
                  <hr />
                  <Form.Group className="w-100 form-group py-2">
                    <Button type="submit" className="button btn-primary">Create Profile</Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};
