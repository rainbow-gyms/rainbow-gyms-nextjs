import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Create() {
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
    <main>
      <Container>
        <Row className="justify-content-center g-4 mt-5 mb-0 px-3">
          <Col xs={11} md={8} lg={8}>
            <h1 className="text-center pb-5">Get Your Gym Session Started</h1>
            <Card
              className="shadow-sm border-0 overflow-hidden text-white"
              style={{
                minHeight: "350px",
                backgroundColor: "gray",
              }}
            >
              <div
                className="w-100 d-flex flex-column justify-content-top p-3"
                style={{
                  minHeight: "350px",
                  background: "rgb(45, 43, 43)",
                }}
              >
                <h3 className="fw-bold text-center">What&apos;s It About?</h3>
                <div>
                  <Form>
                    <Form.Label>Session Name</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Pick a cool name that'll grab peoples' attention"
                    />
                    <br />
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Label className="fw-semibold">
                          Workout Type
                        </Form.Label>
                        <Form.Select>
                          <option></option>
                          <option>Weightlifting</option>
                          <option>Cardio</option>
                          <option>Calisthenics</option>
                          <option>Basketball / Sports</option>
                        </Form.Select>
                      </Col>
                      <Col md={6}>
                        <Form.Label className="fw-semibold">
                          Location
                        </Form.Label>
                        <Form.Control type="text" placeholder="" />
                      </Col>
                    </Row>
                    <Form.Label className="fw-semibold">
                      Additional Info:
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Anything to add?"
                    />
                  </Form>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center g-4 mt-0 mb-5 px-3">
          <Col md={5} lg={4}>
            <Card
              className="h-100 shadow-sm border-0 overflow-hidden text-white"
              style={{
                minHeight: "350px",
                backgroundColor: "darkgray",
              }}
            >
              <div
                className="h-100 d-flex flex-column justify-content-top p-3"
                style={{
                  minHeight: "350px",
                  background: "rgb(45, 43, 43)",
                }}
              >
                <h3 className="fw-bold text-center">When Is It?</h3>
                <Form>
                  <Form.Label className="fw-semibold">Start Time</Form.Label>
                  <Form.Control type="datetime-local" />
                </Form>
              </div>
            </Card>
          </Col>

          <Col md={5} lg={4}>
            <Card
              className="h-100 shadow-sm border-0 overflow-hidden text-white"
              style={{
                minHeight: "350px",
                backgroundColor: "darkgray",
              }}
            >
              <div
                className="h-100 d-flex flex-column justify-content-top p-3"
                style={{
                  minHeight: "350px",
                  background: "rgb(45, 45, 43)",
                }}
              >
                <h3 className="fw-bold text-center">Who&apos;s It For?</h3>
                <Form>
                  <Form.Label>Group Size</Form.Label>
                  <Form.Select>
                    <option value="1">1 Partner</option>
                    <option value="2">2 Partners</option>
                    <option value="3">Small Group (3+)</option>
                  </Form.Select>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
