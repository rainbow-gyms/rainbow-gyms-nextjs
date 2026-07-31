import { Container, Row, Spinner } from "react-bootstrap";

const LoadingSpinner = () => (
  <Container>
    <Row className="justify-content-center align-items-center gap-2">
      <Spinner animation="border" />
      <span>Getting data...</span>
    </Row>
  </Container>
);

export default LoadingSpinner;
