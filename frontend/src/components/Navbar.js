import React, { useState } from "react";
import { Navbar, Nav, Button, Form, FormControl, Dropdown } from "react-bootstrap";
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
      {/* First Row: Logo, Search Bar, Location Dropdown, Sign In */}
      <Navbar bg="dark" variant="dark" expand="lg" className="top-navbar">
        <div className="container d-flex align-items-center w-100">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="mr-3">
            <img src="/logo.png" alt="BookMyShow" className="navbar-logo" />
          </Navbar.Brand>

          {/* Search Bar */}
          <Form className="d-flex flex-grow-1 mx-3">
            <FormControl type="search" placeholder="Search for movies, events, plays..." className="me-2" />
          </Form>

          {/* Location Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="outline-light">{location}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setLocation("Mumbai")}>Mumbai</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Delhi")}>Delhi</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Bangalore")}>Bangalore</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Hyderabad")}>Hyderabad</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Chennai")}>Chennai</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Pune")}>Pune</Dropdown.Item>    
              <Dropdown.Item onClick={() => setLocation("Kolkata")}>Kolkata</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Ahmedabad")}>Ahmedabad</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Chandigarh")}>Chandigarh</Dropdown.Item>   
              <Dropdown.Item onClick={() => setLocation("Lucknow")}>Lucknow</Dropdown.Item>
              <Dropdown.Item onClick={() => setLocation("Jaipur")}>Jaipur</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Sign In Button */}
          {user ? (
            <span className="text-light mx-3">Welcome, {user}</span>
          ) : (
            <Button variant="outline-light mx-3" onClick={() => setShowLogin(true)}>Sign In</Button>
          )}
        </div>
      </Navbar>

      {/* Second Row: Category Navigation */}
      <Navbar bg="secondary" variant="dark" className="bottom-navbar">
        <div className="container">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link> {/* ✅ Now links to MoviesPage.js */}
            <Nav.Link as={Link} to="/events">Events</Nav.Link> {/* ✅ Events Page remains the same */}
          </Nav>
        </div>
      </Navbar>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
}

export default AppNavbar;