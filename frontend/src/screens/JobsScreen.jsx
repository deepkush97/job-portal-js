import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { JobCard } from "../components/JobCard";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { PageHeader } from "../components/PageHeader";
import { GlobalContext } from "../context/GlobalState";

export const JobsScreen = ({ history }) => {
  const { isLoggedIn, isUser, user } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);

  const [appliedUUIDs, setAppliedUUIDs] = useState([]);
  useEffect(() => {
    if (!isLoggedIn || !isUser) {
      history.push("/");
      return;
    }
    const fetchJobs = async () => {
      try {
        setError("");
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get("/api/jobs", config);
        setLoading(false);
        setJobs(data);
      } catch (error) {
        setError(error.response.data.message || error.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [history, isLoggedIn, isUser, user]);

  const addApplied = (uuid) => setAppliedUUIDs([...appliedUUIDs, uuid]);
  const removeApplied = (uuid) =>
    setAppliedUUIDs(appliedUUIDs.filter((value) => value !== uuid));
  const submitAppliedJobs = async () => {
    try {
      setError("");
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post("/api/jobroles", { jobUUIDs: appliedUUIDs }, config);
      history.go(0);
    } catch (error) {
      setError(error.response.data.message || error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <PageHeader title="Jobs">
        <Button disabled={appliedUUIDs.length <= 0} onClick={submitAppliedJobs}>
          Apply
        </Button>
      </PageHeader>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {jobs && jobs.length === 0 ? (
            <Message variant="info">No jobs available</Message>
          ) : (
            <Form>
              <Accordion>
                {jobs.map((job) => (
                  <JobCard
                    job={job}
                    key={job.uuid}
                    showApply={true}
                    showCreator={true}
                    addToList={addApplied}
                    removeFromList={removeApplied}
                  />
                ))}
              </Accordion>
            </Form>
          )}
        </>
      )}
    </>
  );
};
