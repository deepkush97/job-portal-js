export const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        user: action.payload,
        isLoggedIn: true,
        isUser: action.payload.role === "user",
        isRecruiter: action.payload.role === "recruiter",
      };
    case "REMOVE_USER":
      return {
        user: {},
        isLoggedIn: false,
        isUser: false,
        isRecruiter: false,
      };
    default:
      return state;
  }
};
