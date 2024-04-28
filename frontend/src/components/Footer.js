import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
function Footer() {
  return (
    <footer className=" py-4 color text-light">
      <Container>
        <Row className="text-center justify-content-center">
          <Col md={4}>
            <Image src={Logo} /> <h2>PizzaHeaven</h2>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#" style={{ color: "#ffffff" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "#ffffff" }}>
                  Pizzas
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "#ffffff" }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" style={{ color: "#ffffff" }}>
                  Contact
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: PizzaHeaven@email.com</p>
            <p>Phone: +1 123-456-7890</p>
            <p>Address: 1101 Lee's Summit,MO. </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} PizzaHeaven</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
