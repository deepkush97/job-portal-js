import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { GlobalContext } from "../context/GlobalState";

export const HomeScreen = () => {
  const { user, isLoggedIn } = useContext(GlobalContext);
  return (
    <div className="text-center d-flex justify-content-center align-items-center flex-column bg-home">
      <h1>Job Portal</h1>
      {isLoggedIn && user.role === "recruiter" ? (
        <h5>See how great candidates have applied at your jobs</h5>
      ) : (
        <h5>Find the best jobs posted by great recruiters across the world</h5>
      )}
      {isLoggedIn ? (
        <>
          {user.role === "recruiter" ? (
            <>
              <h6 className="mb-2">Click below to see your posted jobs</h6>
              <LinkContainer to="/created-jobs">
                <Button className="btn-sm">Created Jobs</Button>
              </LinkContainer>
            </>
          ) : (
            <>
              <h6 className="mb-2">Click below to see your jobs</h6>
              <LinkContainer to="/jobs">
                <Button className="btn-sm">Jobs</Button>
              </LinkContainer>
            </>
          )}
        </>
      ) : (
        <>
          <h6 className="mb-2">Please login in order to see available jobs</h6>

          <div>
            <LinkContainer to="/login">
              <Button className="btn-sm mr-2">Login</Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button className="btn-sm ml-2">Register</Button>
            </LinkContainer>
          </div>
        </>
      )}
    </div>
  );
};
