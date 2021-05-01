const { User } = require("../../models");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcryptjs = require("bcryptjs");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const isMatched = await bcryptjs.compare(password, user.password);
    if (isMatched) {
      return res.json({
        ...user.toJSON(),
        password: undefined,
        token: generateToken(user.uuid),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({
    where: {
      email,
    },
  });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password: bcryptjs.hashSync(password, 10),
    role,
  });

  if (user) {
    res.status(201).json({
      ...user.toJSON(),
      password: undefined,
      token: generateToken(user.uuid),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  authUser,
  registerUser,
};
