import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './LoginModal.css';

const LoginModal = ({ show, handleClose, handleLogin, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="modal-content custom-login-modal">
        <Modal.Header closeButton className="teal-header text-white text-center">
          <Modal.Title className="w-100">
            <i className="bi bi-lock-fill me-2"></i>Login
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px 40px" }}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label><i className="bi bi-person-fill me-2"></i>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><i className="bi bi-eye-fill me-2"></i>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Check className="mb-3" type="checkbox" label="Remember me" defaultChecked />

            <Button type="submit" className="btn teal-button w-100 mb-3">
              <i className="bi bi-box-arrow-in-right me-2"></i>Login
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer className="bg-light d-flex flex-column align-items-start">
          <Button variant="outline-danger" onClick={handleClose}>
            <i className="bi bi-x-circle me-1"></i>Cancel
          </Button>
          <p className="mt-3 mb-0">
            Not a member?{" "}
            <button
              type="button"
              onClick={switchToSignup}
            >
              Sign Up
            </button>
          </p>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default LoginModal;
