import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <footer id="bottomMenu" className="footer mt-auto py-3 bg-dark text-white">
      <Container>
        <Row className="align-items-start">
          {/* Logo */}
          <Col>
            <Image
              src="/Logo-Text.png"
              alt="Logo Placeholder"
              width={175}
              fluid
            />
          </Col>

          <Col className="text-center">
            <p className="mb-2">
              <a href="/contact" className="text-white text-decoration-none">
                CONTACT US
              </a>
            </p>
            <p className="mb-2">
              <a href="/about" className="text-white text-decoration-none">
                ABOUT US
              </a>
            </p>
            <p className="mb-2">
              <a href="#" className="text-white text-decoration-none">
                TESTIMONIES
              </a>
            </p>
          </Col>

          <Col className="fs-6 text-center">
            <h5 className="fw-bold">UH Gyms</h5>
            <p className="mb-2">
              <a href="#" className="text-white text-decoration-none">
                UH Mānoa
              </a>
            </p>
            <p className="mb-2">
              <a href="#" className="text-white text-decoration-none">
                UH Hilo
              </a>
            </p>
            <p>
              <a href="#" className="text-white text-decoration-none">
                UH West O&apos;ahu
              </a>
            </p>
          </Col>

          {/* Newsletter */}
          <Col>
            <h5>
              <a
                href="#"
                className="fs-6 fw-bold text-white text-decoration-none"
              >
                NEWSLETTER
              </a>
            </h5>

            <Form className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter Email"
                className="mb-2"
              />
              <Button variant="primary">
                <a href="#" className="text-white text-decoration-none">
                  SUBMIT
                </a>
              </Button>
            </Form>

            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-white">
                <BsFacebook />
              </a>
              <a href="#" className="text-white">
                <BsTwitter />
              </a>

              <a href="#" className="text-white">
                <BsLinkedin />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
