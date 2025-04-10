import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Dropdown,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./Book-n-go.png";

function AppNavbar({ onLoginClick, user }) {
  const [location, setLocation] = React.useState("Select City");

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="light" expand="lg" className="py-3 shadow-sm border-bottom">
        <Container fluid className="align-items-center">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={logo} alt="Book-n-Go" height="100" className="me-2" />
          </Navbar.Brand>

          <Form className="d-none d-md-flex flex-grow-1 mx-3">
            <FormControl
              type="search"
              placeholder="Search for movies, events, plays..."
              className="me-2"
              style={{ borderRadius: "20px", border: "1px solid #ccc" }}
            />
          </Form>

          <Dropdown className="me-3">
            <Dropdown.Toggle variant="outline-danger" size="sm" className="rounded-pill px-3">
              {location}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Chandigarh", "Lucknow", "Jaipur"]
                .map((city) => (
                  <Dropdown.Item key={city} onClick={() => setLocation(city)}>
                    {city}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>

          {user ? (
            <span className="text-danger fw-semibold">
              Hi, {typeof user === "string" ? user.split("@")[0] : user?.name || "User"}
            </span>
          ) : (
            <Button variant="danger" size="sm" className="rounded-pill" onClick={onLoginClick}>
              Sign In
            </Button>
          )}
        </Container>
      </Navbar>

      {/* Bottom Navbar */}
      <Navbar bg="white" className="category-bar border-bottom">
        <Container>
          <Nav className="mx-auto text-uppercase small fw-semibold">
            {[
              ["Movies", "/movies"],
              ["Events", "/events"],
              ["Music", "/events/concert"],
              ["Comedy", "/events/comedy"],
              ["Theatre", "/events/theatre"],
              ["Food", "/events/food"],
              ["Art", "/events/art"],
              ["Tech", "/events/tech"],
              ["Fitness", "/events/fitness"],
            ].map(([label, path]) => (
              <Nav.Link as={Link} to={path} key={label} className="px-3 text-danger nav-link-hover">
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
