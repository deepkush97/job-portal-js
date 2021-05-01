import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { PageHeader } from "../components/PageHeader";
import { UserCard } from "../components/UserCard";
import { GlobalContext } from "../context/GlobalState";

export const ViewCandidatesScreen = ({ match, history }) => {
  const jobId = match.params.uuid;
  const { isLoggedIn, isRecruiter, user } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [job, setJob] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!isLoggedIn || !isRecruiter) {
      history.push("/");
      return;
    }
    const fetchJobAppliedUsers = async () => {
      try {
        setError("");
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {
          data: { job, jobUsers },
        } = await axios.get(`/api/jobroles/${jobId}`, config);
        setLoading(false);
        setJob(job);
        setUsers(jobUsers.map((jobUser) => jobUser.user));
      } catch (error) {
        setError(error.response.data.message || error.message);
        setLoading(false);
      }
    };
    fetchJobAppliedUsers();
  }, [history, isLoggedIn, isRecruiter, user, jobId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <PageHeader
            title={`Applied Candidates : ${job.title}`}
            backUrl="/created-jobs"
          />
          {users && users.length === 0 ? (
            <Message variant="info">No jobs available</Message>
          ) : (
            <Form>
              <ListGroup>
                {users.map((user) => (
                  <UserCard user={user} key={user.uuid} />
                ))}
              </ListGroup>
            </Form>
          )}
        </>
      )}
    </>
  );
};
