import { Col, Row, Image, Button, Container } from "react-bootstrap";
import { Linkedin, EnvelopeAtFill, PencilSquare } from "react-bootstrap-icons";
const ContactUs = () => (
  <main>
    <Container fluid>
      <Row>
        {/*text*/}
        <Col md={5} className="d-flex justify-content-center bg-dark text-white">
          <div className="d-flex flex-column justify-content-center align-items-start me-md-5 p-4">
            <h3 className="fw-bold fs-1">Contact Us</h3>
            <h5 className="fs-3">We are happy to help, <br /> and hear from you!</h5>
          </div>
        </Col>
        {/*image*/}
        <Col md={6} className="p-0">
          <Image
            fluid
            src="/strong-man-gym.jpg"
            alt="Strong man working out in the gym"
            className="w-100 shadow-sm border-0 overflow-hidden"
            style={{
              objectFit: "cover",
              objectPosition: "start",
              height: "100%", // Ensures the image stretches to match the height of the text block
            }}
          />
          {/*
          <div 
            className="w-100 h-100 d-flex align-items-center justify-content-center text-black"
            style={{
              minHeight: "150px",
            }}
          >
            <EnvelopeAtFill className="text-white me-md-5" size="50%" />
          </div>
          */}
        </Col>
      </Row>

      <Row className="justify-content-center pt-3">
        {/*text*/}
        <Col md={12} className="justify-content-center">
          <Row className="justify-content-center">
            <Col className="justify-content-center ms-md-5 px-5 py-1 py-md-5">
              <h3 className="fw-bold"><EnvelopeAtFill /> Email</h3>
              <hr style={{width: "50%"}} />
              <ul>
                <li>johndoe@hawaii.edu</li>
                <li>janedoe@hawaii.edu</li>
                <li>jeffdoe@hawaii.edu</li>
              </ul>
            </Col>

            <Col className="justify-content-center px-5 py-1 py-md-5 ">
              <h3 className="fw-bold"><Linkedin /> LinkedIn</h3>
              <hr style={{width: "50%"}} />
              <ul>
                <li><a target="_blank" href="https://www.linkedin.com/">John Doe</a></li>
                <li><a target="_blank" href="https://www.linkedin.com/">Jane Doe</a></li>
                <li><a target="_blank" href="https://www.linkedin.com/">Jeff Doe</a></li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="justify-content-center pb-3">
        <Col className="justify-content-center ms-md-5 px-5 py-1 py-md-5">
          <h3 className="fw-bold"><PencilSquare /> Feedback</h3>
          <hr style={{width: "50%"}} />
          <textarea 
            placeholder="Type Here"
            style ={{
              width: "90%",
              height: "45%"
            }} 
          />
          <br />
          <Button 
            className="mb-3 bg-dark"
            style ={{
              border: "none"
            }}
          >
            <a href="#" className="text-white text-decoration-none">
              SUBMIT
            </a>
          </Button>
        </Col>
      </Row>
    </Container>
  </main>
);

export default ContactUs;