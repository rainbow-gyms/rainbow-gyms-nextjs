"use client";

import { useSession } from "next-auth/react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import {
  PersonFill,
  PersonPlusFill,
  BoxArrowRight,
  Lock,
  InfoCircle,
  Telephone,
} from "react-bootstrap-icons";
import "./navbar.css";

const NavBar: React.FC = () => {
  const { data: session } = useSession();

  const currentUser = session?.user?.email;

  return (
    <Navbar expand="lg" variant="dark" className="darkGradient py-2">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand href="/">
          <Image src="/Gym-Shark.png" alt="Logo" width={90} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link className="text-light px-3" href="/sessions">
              My Sessions
            </Nav.Link>
            <Nav.Link className="text-light px-3" href="/create">
              Create a Session
            </Nav.Link>
            <Nav.Link className="text-light px-3" href="/join">
              Join
            </Nav.Link>
            <Nav.Link className="text-light px-3" href="/calendar">
              Calendar
            </Nav.Link>

            {session ? (
              <NavDropdown
                title={currentUser ?? "Login"}
                id="login-dropdown"
                align="end"
                style={{ color: "white" }}
              >
                <NavDropdown.Item href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="/about">
                  <InfoCircle className="me-2" />
                  About Us
                </NavDropdown.Item>

                <NavDropdown.Item href="/contact">
                  <Telephone className="me-2" />
                  Contact
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login" id="login-dropdown" align="end">
                <NavDropdown.Item href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign In
                </NavDropdown.Item>

                <NavDropdown.Item href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign Up
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="/about">
                  <InfoCircle className="me-2" />
                  About Us
                </NavDropdown.Item>

                <NavDropdown.Item href="/contact">
                  <Telephone className="me-2" />
                  Contact
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
