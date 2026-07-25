import { Image, Button, Col, Card, Container, Row } from "react-bootstrap";
import { Instagram, Linkedin, Discord } from "react-bootstrap-icons";

/** The Home page. */
const Home = () => (
  <main
    style={{
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
    }}
  >
    <Container fluid className="mt-5">      
      {/* Feature Cards */}
      <Row className="justify-content-start g-4 mb-5 px-3">
        <Col md={5} lg={4}>
          <Card
            className="shadow-sm border-0 overflow-hidden text-white"
            style={{
              backgroundColor: "gray"
            }}
          >
            <div
              className="h-100 d-flex flex-column p-4"
              style={{
                minHeight: "350px",
                background: "rgba(0, 0, 0, 0.45)",
              }}
            >
              <Row>
                <Row>
                <Col>
                  <Row>
                    <Col xs={8} md={6}>
                      <Image src="/Gym-Shark.png" width={100} height={100} className="object-fit-cover border border-dark border-2" roundedCircle alt ="profile picture" />
                    </Col>
                  </Row>

                  <h3 className="fw-bold">John Doe</h3>
                  <h6>john@foo.com</h6>
                  <h6>Student @ UH Manoa</h6>
                  <h6>ICS Major</h6>
                  <Instagram /> <Discord /> <Linkedin />
                </Col>
                </Row>
                
                <Col className="mt-5">
                  <h3>Interests</h3>
                    <ul>
                      <li>Food</li>
                      <li>Cats</li>
                      <li>Push-ups</li>
                    </ul>
                </Col>

                <Col className="mt-5">
                  <h3>Goals</h3>
                    <ul>
                      <li>Building Strength</li>
                      <li>Fat Loss</li>
                    </ul>
                </Col>

                <Col className="mt-5">
                  <h3>Preferred Locations</h3>
                    <ul>
                      <li>WRC</li>
                      <li>Planet Fitness, Honolulu</li>
                    </ul>
                </Col>
              </Row>
            </div>
          </Card>
          </Col>

          <Col>
              <Card
            className="shadow-sm border-0 overflow-hidden text-white"
            style={{
              backgroundColor: "gray"
            }}
          >
            <div
              className="h-100 d-flex flex-column p-4"
              style={{
                minHeight: "350px",
                background: "rgba(0, 0, 0, 0.45)",
              }}
            >
              <Row>
                <h2>About Me</h2>
                <p>Hi, my name is John Doe, and I am here as a test for now!</p>
              </Row>
            </div>
          </Card>
          
          </Col>
        </Row>
      </Container>
  </main>
);

export default Home;
