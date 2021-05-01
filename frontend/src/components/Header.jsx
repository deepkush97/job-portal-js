import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { GlobalContext } from "../context/GlobalState";

export const Header = () => {
  const { user, isLoggedIn, removeUser } = useContext(GlobalContext);
  const logoutHandler = (e) => {
    e.preventDefault();
    removeUser();
    localStorage.setItem("user", "");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Job Portal</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <>
                  {user.role === "user" && (
                    <>
                      <LinkContainer to="/applied-jobs">
                        <Nav.Link>Applied Jobs</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/jobs">
                        <Nav.Link>Jobs</Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                  {user.role === "recruiter" && (
                    <>
                      <LinkContainer to="/created-jobs">
                        <Nav.Link>Created Jobs</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/create-job">
                        <Nav.Link>Create Job</Nav.Link>
                      </LinkContainer>
                    </>
                  )}

                  <NavDropdown title={user.name} id="username">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i class="fas fa-sign-in-alt"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
