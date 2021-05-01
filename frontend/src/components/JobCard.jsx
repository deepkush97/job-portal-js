import React, { useState } from "react";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const JobCard = ({
  job: { uuid, title, description, user },
  showApply,
  showCreator,
  showCandidates,
  addToList,
  removeFromList,
}) => {
  const [isApply, setIsApply] = useState(false);
  const handleApplyCheck = (e) => {
    setIsApply(e.target.checked);
    if (e.target.checked) {
      addToList(uuid);
    } else {
      removeFromList(uuid);
    }
  };
  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center">
          <Accordion.Toggle
            as={"span"}
            className="flex-grow-1"
            role="button"
            eventKey={uuid}
          >
            {title}
          </Accordion.Toggle>
          {showApply && (
            <Form.Group controlId="applyCheckbox" className="m-0">
              <Form.Check
                onChange={handleApplyCheck}
                type="checkbox"
                checked={isApply}
                label="Apply"
              />
            </Form.Group>
          )}
          {showCandidates && (
            <LinkContainer to={`/view-candidates/${uuid}`}>
              <Button className="btn-sm">Applied Candidates</Button>
            </LinkContainer>
          )}
        </div>
      </Card.Header>
      <Accordion.Collapse eventKey={uuid}>
        <Card.Body className="job-card-body">
          <>
            {showCreator && (
              <Card.Text className="font-weight-bold">
                Created By : {user?.name}
              </Card.Text>
            )}
            <Card.Text className="job-description">{description}</Card.Text>
          </>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
