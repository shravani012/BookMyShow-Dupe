import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function LoginModal({ show, handleClose, handleLogin, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="loginEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group controlId="loginPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </Form.Group>

          <Button variant="teal" type="submit" className="w-100 mb-2">
            Login
          </Button>
        </Form>
        <div className="text-center">
          Don't have an account?{" "}
          <span
            onClick={switchToSignup}
            style={{ color: "teal", cursor: "pointer" }}
          >
            Sign up here
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;