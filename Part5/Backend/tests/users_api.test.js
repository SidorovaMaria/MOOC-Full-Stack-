const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const { users } = require("../db");
const User = require("../models/user");

const initialNotes = users;
console.log(initialNotes);

beforeEach(async () => {
  await User.deleteMany({});
  const noteObjects = initialNotes.map((user) => new User(user));
  const promiseArray = noteObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

test("all users are returned", async () => {
  const response = await api.get("/api/users");
  assert.strictEqual(response.body.length, initialNotes.length);
});

test("User is created if all field are valid", async () => {
  const newUser = {
    name: "Test User",
    username: "testUser",
    password: "password!!",
  };
  const resultUser = await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const savedUser = resultUser.body;
  const response = await api.get("/api/users");
  const usersAtEnd = response.body;
  assert.strictEqual(usersAtEnd.length, initialNotes.length + 1);
  const usernames = usersAtEnd.map((u) => u.username);
  assert.ok(
    usernames.includes(newUser.username),
    "Username is not in the returned list"
  );
});
test("error if the password is too short", async () => {
  const newUser = {
    name: "Test User",
    username: "testUser",
    password: "pa",
  };
  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  const usersAtEnd = response.body;
  assert.strictEqual(usersAtEnd.length, initialNotes.length);
});
test("error if the username is too short", async () => {
  const newUser = {
    name: "Test User",
    username: "te",
    password: "password",
  };
  await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  const usersAtEnd = response.body;
  assert.strictEqual(usersAtEnd.length, initialNotes.length);
});

after(async () => {
  await mongoose.connection.close();
});
