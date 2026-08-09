import { Container, Col, Row, Image } from "react-bootstrap";

const AboutUs = () => (
  <main>
    <Container fluid>
      <h1 className="text-center py-3 mb-4 border-5 border-bottom fw-bold" >About Us</h1>
      <Row className="justify-content-center py-1">
        {/*first row image*/}
        <Col md={5}>
          <Image
            fluid
            src="/strong-man-gym.jpg"
            alt="Strong man working out in the gym"
            className="w-100 shadow-sm rounded-start-5 overflow-hidden"
            style={{
              maxHeight: "350px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Col>
        {/*first row text*/}
        <Col md={5}>
          <div
            className="h-auto d-flex flex-column justify-content-center text-end text-md-start  p-2">
            <h3 className="fw-bold">Our Purpose</h3>
            <p className="mb-0" 
              style = {{
                fontSize: "90%"
              }}
            >
              We created Rainbow Gyms with the purpose of making it convenient for people to
              find the workouts they need, when they need it. We want to give everyone 
              the ability to make lifelong connections from across the island, all while
              staying healthy!
            </p>
          </div>
        </Col>
      </Row>

      {/*second row v1: shows only on md screen and higher*/}
      <Row className="justify-content-center py-3 d-none d-md-flex">
        {/*second row text*/}
        <Col md={5}>
          <div className="h-auto d-flex flex-column justify-content-center text-end p-2">
            <h3 className="fw-bold">Our Motivation</h3>
            <p className="mb-0" 
              style = {{
                fontSize: "90%"
              }}
            >
              We understand that for many beginners, and even some of the more experienced gym-goers
              can feel out of place. We want to lower the bar for entry with our app by giving people that extra push
              through getting them a welcoming group of people, both new and experienced, who will motivate them
              to keep working and make the feel included. For those already more-than-comfortable with the gym, 
              we also know it can be hard to stick to plans, but we aim to make it simple and centralized within 
              our app for your convenience!
            </p>
          </div>
        </Col>
        {/*second row image*/}
        <Col md={5}>
          <Image
            fluid
            src="/strong-man-gym.jpg"
            alt="Strong man working out in the gym"
            className="w-100 shadow-sm rounded-end-5 overflow-hidden"
            style={{
              maxHeight: "350px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Col>
      </Row>

      {/*second row v2: shows only on sm screen or lower*/}
      <Row className="justify-content-center py-3 d-flex d-md-none">
        {/*second row image*/}
        <Col md={5}>
          <Image
            src="/strong-man-gym.jpg"
            alt="Strong man working out in the gym"
            className="w-100 shadow-sm rounded-end-5 overflow-hidden"
            style={{
              maxHeight: "350px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Col>
        {/*second row text*/}
        <Col md={5}>
          <div className="h-auto d-flex flex-column justify-content-center text-start p-2">
            <h3 className="fw-bold">Our Motivation</h3>
            <p className="mb-0" 
              style = {{
                fontSize: "90%"
              }}
            >
              We understand that for many beginners, and even some of the more experienced gym-goers
              can feel out of place. We want to lower the bar for entry with our app by giving people that extra push
              through getting them a welcoming group of people, both new and experienced, who will motivate them
              to keep working and make the feel included. For those already more-than-comfortable with the gym, 
              we also know it can be hard to stick to plans, but we aim to make it simple and centralized within 
              our app for your convenience!
            </p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center py-3">
        {/*third row image*/}
        <Col md={5}>
          <Image
            fluid
            src="/strong-man-gym.jpg"
            alt="Students"
            className="w-100 shadow-sm rounded-start-5 overflow-hidden"
            style={{
              maxHeight: "350px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Col>
        {/*third row text*/}
        <Col md={5}>
          <div className="h-auto d-flex flex-column justify-content-center text-end text-md-start p-2">
            <h3 className="fw-bold">Our Community</h3>
            <p className="mb-0" 
              style = {{
                fontSize: "90%"
              }}
            >
              With over 20,000 students across UH, and campuses over 200 American Footbal fields wide,
              you will probably miss the chance to meet so many wonderful and like-minded students who
              attend the same campus as you. We want to serve the UH community by bringing folks closer through
              providing these healthy opportunities to meet people from all kinds of majors, walks of life, and 
              more, via our app!
            </p>
          </div>
        </Col> 
      </Row>
    </Container>
  </main>

);

export default AboutUs;