"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
} from "react-bootstrap";

const SignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const target = e.currentTarget;

    const email = target.email.value;
    const password = target.password.value;

    const result = await signIn("credentials", {
      callbackUrl: "/profile/check",
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    if (result?.ok) {
      window.location.href = "/profile/check";
    }
  };
  return (
    <main
      className="d-flex align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={8} md={5} lg={4} className="m-5">
            <Card className="shadow border-0">
              <Card.Body className="p-4">
                <h1 className="text-center mb-4">Welcome Back</h1>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </Form.Group>

                  <Button type="submit" className="w-100" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </Form>
              </Card.Body>

              <Card.Footer className="text-center bg-white border-0">
                Don&apos;t have an account? <br className="d-md-none" /> <a href="/auth/signup">Sign up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
