const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();

usersRouter.get("/api/users", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});
usersRouter.post("/api/users", async (request, response, next) => {
  const { username, name, password } = request.body;

  // Validate username and password
  if (!username || username.length < 3) {
    return response.status(400).json({
      error: "Username must be at least 3 characters long and required",
    });
  }
  if (!password || password.length < 3) {
    return response.status(400).json({
      error: "Password must be at least 3 characters long and required",
    });
  }

  try {
    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    // Handle unique username error
    if (error.name === "MongoServerError" && error.code === 11000) {
      response.status(400).json({ error: "Username must be unique" });
    } else {
      next(error);
    }
  }
});

module.exports = usersRouter;
