import { Container, Row, Col, Card, Form } from "react-bootstrap";
import styles from "./Browse.module.css";

const BrowseMenu = () => {
    return (
        <Container className={`py-5`}>
            <Row className="mb-4 text-center">
                <Col>
                    <h1 className="display-4 fw-bold">Browse Sessions</h1>
                    <p className="lead mx-auto">
                        Find workout partners, join student-led fitness groups, and filter available gym sessions across UH Mānoa to fit your schedule.
                    </p>
                </Col>
            </Row>
            <Card className={`${styles["custom-card"]} mb-5 p-4 border-0 shadow-sm`}>
                <Form>For the filters</Form>
                <div>For the displaying the different card sessions</div>
            </Card>
        </Container>
    );
};

export default BrowseMenu;