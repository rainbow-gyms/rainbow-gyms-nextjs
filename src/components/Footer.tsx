import { Col, Container } from "react-bootstrap";

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center">
        University of Hawaii
        <br />
        Honolulu, HI 96822
        <br />
        <a target="_blank" href="https://rainbow-gyms.github.io/">
          Template Home Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
