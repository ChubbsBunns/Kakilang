/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();

let isConnected = false;
const mongoose = require("mongoose");
const mongoDB = process.env.TEST_URI;
mongoose
  .connect(mongoDB, { useNewURLParser: true })
  .then((db) => (isConnected = true))
  .catch((err) => {
    console.log(err);
    isConnected = err;
  });
const connection = mongoose.connection;

const request = require("supertest");

const app = require("../app");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const correctEmail = "testing123@email.com";
const correctPassword = "terrible";
const testUser = {
  email: correctEmail,
  password: bcrypt.hashSync(correctPassword, 4),
  name: "Test User",
};

beforeAll(async () => {
  await User.deleteMany({});

  const newUser = new User(testUser);
  await newUser.save();
});

test("No Email return 400", async () => {
  const response = await request(app).post("/login").send({
    email: "",
    password: correctPassword,
  });
  expect(response.statusCode).toBe(400);
});

test("Wrong Email returns 403", async () => {
  const response = await request(app).post("/login").send({
    email: "testing123",
    password: correctPassword,
  });
  expect(response.statusCode).toBe(403);
});

test("Wrong Password returns 403", async () => {
  const response = await request(app).post("/login").send({
    email: correctEmail,
    password: "terri",
  });
  expect(response.statusCode).toBe(403);
});

test("Correct Password returns login", async () => {
  const response = await request(app).post("/login").send({
    email: correctEmail,
    password: correctPassword,
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.login).toBe(true);
  expect(response.body.user.email).toBe(correctEmail);
});

afterAll(() => {
  mongoose.connection.close();
});
