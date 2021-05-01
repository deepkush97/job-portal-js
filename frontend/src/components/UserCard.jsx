import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

export const UserCard = ({ user: { uuid, name, email } }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col md={6}>{name}</Col>
        <Col md={6}>
          Email : <a href={`mailto:${email}`}>{email}</a>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
