const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        where: {
          uuid: decoded.id,
        },
      });
      res.locals.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        uuid: user.uuid,
      };
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
  next();
});
const recruiter = asyncHandler(async (req, res, next) => {
  if (res.locals.user && res.locals.user.role === "recruiter") {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Recruiter");
  }
});

const user = asyncHandler(async (req, res, next) => {
  if (res.locals.user && res.locals.user.role === "user") {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as User");
  }
});
module.exports = { protect, recruiter, user };
