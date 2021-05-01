import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FormContainer } from "../components/FormContainer";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { GlobalContext } from "../context/GlobalState";

export const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn, addUser } = useContext(GlobalContext);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
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
      <h1>Login</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
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
        <Button type="submit" variant="primary">
          Log In
        </Button>
      </Form>
      <Row className="py-3">
        <Col className="text-center">
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
