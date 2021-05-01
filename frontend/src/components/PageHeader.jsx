import React from "react";
import { Link } from "react-router-dom";

export const PageHeader = ({ children, title, backUrl }) => {
  return (
    <>
      <div className="d-flex justify-content-start align-content-center my-3 ">
        <Link to={backUrl || "/"} className="btn btn-light">
          Go Back
        </Link>
        <div className="mx-3 align-self-center page-header-separator">
          &nbsp;
        </div>
        <h1 className="flex-grow-1 m-0 page-header-heading">{title}</h1>
        {children}
      </div>
      <hr />
    </>
  );
};
