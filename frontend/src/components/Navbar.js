import React, { useState } from "react";
import { Navbar, Nav, Button, Form, FormControl, Dropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

function AppNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState("Select City");

  const handleLogin = (email) => {
    setUser(email);
    setShowLogin(false);
  };

  return (
    <>
      {/* Top Navbar - Red & White Theme */}
      <Navbar bg="light" expand="lg" className="py-3 shadow-sm border-bottom">
        <Container fluid className="align-items-center">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src="/logo.png" alt="Book-n-Go" height="40" className="me-2" />
          </Navbar.Brand>

          {/* Search */}
          <Form className="d-none d-md-flex flex-grow-1 mx-3">
            <FormControl
              type="search"
              placeholder="Search for movies, events, plays..."
              className="me-2"
              style={{ borderRadius: "20px", border: "1px solid #ccc" }}
            />
          </Form>

          {/* Location Dropdown */}
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

          {/* Login */}
          {user ? (
            <span className="text-danger fw-semibold">Hi, {user.split("@")[0]}</span>
          ) : (
            <Button variant="danger" size="sm" className="rounded-pill" onClick={() => setShowLogin(true)}>
              Sign In
            </Button>
          )}
        </Container>
      </Navbar>

      {/* Bottom Navbar - Categories */}
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

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
}

export default AppNavbar;
