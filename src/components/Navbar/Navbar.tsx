"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
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
import Link from "next/link";

const NavBar: React.FC = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const currentUser = session?.user?.email;

  return (
    <Navbar expand="lg" variant="dark" className="darkGradient py-2">
      <Container>
        {/* Logo on the left */}
        <Navbar.Brand as={Link} href={session ? "/profile/check" : "/"}>
          <Image src="/Gym-Shark.png" alt="Logo" width={90} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {session && (
              <>
                <Link href={session ? "/profile/check" : "/"} 
                      className="nav-link text-light px-3" 
                      style={{
                        textDecoration: pathname === "/" ? "underline" : "none",
                        textDecorationThickness: pathname === "/" ? "2px" : "0px",
                        textUnderlineOffset: pathname === "/" ? "50%" : "0px",
                      }}
                >
                  Browse
                </Link>

                <Link href="/sessions"
                      className="nav-link text-light px-3" 
                      style={{
                        textDecoration: pathname === "/sessions" ? "underline" : "none",
                        textDecorationThickness: pathname === "/sessions" ? "2px" : "0px",
                        textUnderlineOffset: pathname === "/sessions" ? "50%" : "0px",
                      }}
                >
                  My Sessions
                </Link>

                <Link href="/create"
                      className="nav-link text-light px-3" 
                      style={{
                        textDecoration: pathname === "/create" ? "underline" : "none",
                        textDecorationThickness: pathname === "/create" ? "2px" : "0px",
                        textUnderlineOffset: pathname === "/create" ? "50%" : "0px",
                      }}
                >
                  Create
                </Link>

                <Link href="/calendar"
                      className="nav-link text-light px-3" 
                      style={{
                        textDecoration: pathname === "/calendar" ? "underline" : "none",
                        textDecorationThickness: pathname === "/calendar" ? "2px" : "0px",
                        textUnderlineOffset: pathname === "/calendar" ? "50%" : "0px",
                      }}
                >
                  Calendar
                </Link>
              </>
            )}

            {session ? (
              <NavDropdown
                title={currentUser ?? "Login"}
                id="login-dropdown"
                align="end"
                style={{ color: "white" }}
              >
                <NavDropdown.Item as={Link} href="/profile" className="px-3">
                  <PersonFill className="me-2" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={session ? "Account" : "Login"}
                id="login-dropdown"
                align="end"
              >
                {/*put profile here for now, but move to currentUser NavDropdown when auth works */}
                <NavDropdown.Item href="/about">
                  <InfoCircle className="me-2" />
                  About Us
                </NavDropdown.Item>

                <NavDropdown.Item href="/contact">
                  <Telephone className="me-2" />
                  Contact
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign In
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign Up
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
