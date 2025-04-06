import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./LoginModal.css";

const SignupModal = ({ show, handleClose, handleSignup, switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleSignup(name);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="modal-content custom-login-modal">
        <Modal.Header closeButton className="teal-header text-white text-center">
          <Modal.Title className="w-100">
            <i className="bi bi-person-plus-fill me-2"></i>Create Account
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px 40px" }}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label><i className="bi bi-person-fill me-2"></i>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><i className="bi bi-envelope-fill me-2"></i>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><i className="bi bi-lock-fill me-2"></i>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="btn teal-button w-100 mb-3">
              <i className="bi bi-person-check me-2"></i>Sign Up
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-light d-flex flex-column align-items-start">
          <Button variant="outline-danger" onClick={handleClose}>
            <i className="bi bi-x-circle me-1"></i>Cancel
          </Button>
          <p className="mt-3 mb-1">Already a member? <a href="#" onClick={(e) => { e.preventDefault(); switchToLogin(); }}>Login</a></p>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default SignupModal;

