import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormContainer } from "../components/FormContainer";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { GlobalContext } from "../context/GlobalState";

export const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const { isLoggedIn, addUser } = useContext(GlobalContext);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password and confirm password do not match");
      return;
    }
    setMessage("");
    try {
      setError("");
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users",
        { email, password, name, role },
        config
      );
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      addUser(data);
    } catch (error) {
      setError(error.response.data.message || error.message);
      setLoading(false);
    }
  };
  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <div>
            <Form.Check
              type="radio"
              inline
              label="User"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
            />
            <Form.Check
              type="radio"
              inline
              label="Recruiter"
              name="role"
              value="recruiter"
              checked={role === "recruiter"}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col className="text-center">
          Have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
