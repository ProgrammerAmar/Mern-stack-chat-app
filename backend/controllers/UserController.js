const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const generateToken = require("../config/generateToken");
const res = require("express/lib/response");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, profile } = req.body;

  if (!name || !email || !password) {
    res.status(422);
    throw new Error("Please enter all the fields");
  }

  //check unique email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(4);
    throw new Error("This email has already been taken");
  }

  const user = await User.create({
    name,
    email,
    password,
    profile,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registeration failed something went wrong");
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      token: generateToken(user._id),
    });
  } else {
    res.status(422);
    throw new Error("invalid email or password");
  }
});
module.exports = { registerUser, loginUser };
