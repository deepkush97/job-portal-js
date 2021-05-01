import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { JobCard } from "../components/JobCard";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { PageHeader } from "../components/PageHeader";
import { GlobalContext } from "../context/GlobalState";

export const CreatedJobsScreen = ({ history }) => {
  const { isLoggedIn, isRecruiter, user } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    if (!isLoggedIn || !isRecruiter) {
      history.push("/");
      return;
    }
    const fetchMyCreatedJobs = async () => {
      try {
        setError("");
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get("/api/jobs/my", config);
        setLoading(false);
        setJobs(data);
      } catch (error) {
        setError(error?.response?.data.message || error.message);
        setLoading(false);
      }
    };
    fetchMyCreatedJobs();
  }, [history, isLoggedIn, isRecruiter, user]);

  return (
    <>
      <PageHeader title="Created Jobs" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {jobs && jobs.length === 0 ? (
            <Message variant="info">No jobs created</Message>
          ) : (
            <Form>
              <Accordion>
                {jobs.map((job) => (
                  <JobCard
                    job={job}
                    key={job.uuid}
                    showApply={false}
                    showCreator={false}
                    showCandidates={true}
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
