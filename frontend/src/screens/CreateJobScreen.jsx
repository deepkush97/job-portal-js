import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { PageHeader } from "../components/PageHeader";
import { GlobalContext } from "../context/GlobalState";

export const CreateJobScreen = ({ location, history }) => {
  const { isLoggedIn, isRecruiter, user } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !isRecruiter) {
      history.push("/");
      return;
    }
  }, [history, isLoggedIn, isRecruiter, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        "/api/jobs",
        {
          title,
          description,
        },
        config
      );
      setLoading(false);
      setMessage("Job created successfully");
      setTimeout(() => {
        history.push("/");
      }, 500);
    } catch (error) {
      setError(error.response.data.message || error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <PageHeader title="Create Job" />
      <FormContainer>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              row="4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
