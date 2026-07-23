import { Col, Container, Image, Row } from "react-bootstrap";
import OverviewFooter from "@/components/OverviewFooter";

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3 mb-5">
      <Row className="align-middle ps-5 pt-5">
        <Col className = "text-start" xs={8}>
          <h1>Meet fellow Rainbow Warriors.</h1>
          <h2>Get Fit <strong>Together</strong>.</h2>
          &nbsp;
          <p>Rainbow Gyms is an application that lets you join, schedule, and lets you begin your fitness journey as a UH student</p>
        </Col>
      </Row>
    </Container>
    <OverviewFooter />
  </main>
);

export default Home;
