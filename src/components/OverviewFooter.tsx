import { Col, Container } from "react-bootstrap";

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const OverviewFooter = () => (
  <footer id = "overview" className="mt-5 py-3 bg-none">
    <Container>
      <Col className="text-center">
        <h3>So, what is it?</h3>
        <p>Rainbow Gyms is a gym session scheduling application designed to help University of Hawaiʻi students balance fitness goals with their academic responsibilities. The app allows students to find workout partners, create gym sessions, and build a supportive fitness community within the campus environment.</p>
      </Col>
    </Container>
  </footer>
);

export default OverviewFooter;
