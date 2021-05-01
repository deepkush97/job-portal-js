import React, { createContext, useReducer } from "react";
import { appReducer } from "./AppReducer";

const userFromLocalStorage = JSON.parse(localStorage.getItem("user") || "{}");
const isLoggedIn =
  userFromLocalStorage && Object.keys(userFromLocalStorage).length !== 0;
const isUser = isLoggedIn && userFromLocalStorage.role === "user";
const isRecruiter = isLoggedIn && userFromLocalStorage.role === "recruiter";

const initialState = {
  user: userFromLocalStorage,
  isLoggedIn,
  isUser,
  isRecruiter,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addUser(data) {
    dispatch({
      type: "ADD_USER",
      payload: data,
    });
  }

  function removeUser() {
    dispatch({
      type: "REMOVE_USER",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isRecruiter: state.isRecruiter,
        isUser: state.isUser,
        addUser,
        removeUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
