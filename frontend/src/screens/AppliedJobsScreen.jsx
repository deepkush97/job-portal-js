import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { JobCard } from "../components/JobCard";
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import { PageHeader } from "../components/PageHeader";
import { GlobalContext } from "../context/GlobalState";

export const AppliedJobsScreen = ({ history }) => {
  const { isLoggedIn, isUser, user } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobRoles, setJobRoles] = useState([]);
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
        const { data } = await axios.get("/api/jobroles", config);
        setLoading(false);
        setJobRoles(data);
      } catch (error) {
        setError(error.response?.data.message || error.message);
        setLoading(false);
      }
    };
    fetchJobs();
  }, [history, isLoggedIn, isUser, user]);

  return (
    <>
      <PageHeader title="Applied Jobs" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {jobRoles && jobRoles.length === 0 ? (
            <Message variant="info">No applied jobs</Message>
          ) : (
            <Form>
              <Accordion>
                {jobRoles.map((jobRole) => (
                  <JobCard
                    job={jobRole.job}
                    key={jobRole.uuid}
                    showApply={false}
                    showCreator={true}
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
