import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function SignupModal({ show, handleClose, handleSignup, switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleSignup(name, email, password);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="signupName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group controlId="signupEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group controlId="signupPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </Form.Group>

          <Button variant="teal" type="submit" className="w-100 mb-2">
            Signup
          </Button>
        </Form>
        <div className="text-center">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            style={{ color: "teal", cursor: "pointer" }}
          >
            Login here
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SignupModal;
