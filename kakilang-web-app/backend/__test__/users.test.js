/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Tests for Users Router
 *
 * @TODO Test Filtered Users (not a concern rn)
 *
 * !!!! WARNING !!!!
 * Test may fail during debug due to time exceeded
 * This is because mongoDB connection is cut when time exceeds
 * And time is counted while program is being slowly debuged
 */

/** Dependencies */
const User = require("../models/user.model");
const Session = require("../models/session.model");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

//MongoDB connect
const uri = "mongodb://localhost:27017/mockUser";
mongoose.connect(uri);
const closeMongo = async () => await mongoose.connection.close();

/** Passwords are mockPassword123 */
const mockUser = {
  name: "Mock User",
  email: "mockUser@email.com",
  password: "$2a$12$1EtZVlvC10oGafCuqHyWeeeKRxw8QhpiXmfs/6hXCvERh3./1PsPO",
};
const diffUser = {
  name: "different Name",
  email: "diffUser@email.com",
  password: "$2a$12$1EtZVlvC10oGafCuqHyWeeeKRxw8QhpiXmfs/6hXCvERh3./1PsPO",
};
const correctPass = "mockPassword123";

test("Initialised Correctly", () => {
  expect(mongoose.connection).toBeTruthy();
});

describe("User Router Tests", () => {
  describe("Create User", () => {
    const createUser = "/users";
    const setHeaders = (token) => {
      return { "x-access-token": token };
    };
    const correctUserform = {
      email: mockUser.email,
      password: correctPass,
      name: mockUser.name,
    };

    beforeEach(async () => {
      await User.deleteMany();
      await Session.deleteMany();
    });

    // Valid user
    test("Valid Userform returns 201", async () => {
      const response = await request(app)
        .post(createUser)
        .send(correctUserform);
      const dbUser = await User.findOne({ email: mockUser.email });
      expect(response.statusCode).toBe(201);
      expect(dbUser.name).toBe(mockUser.name);
    });
  });

  describe("Get All Users", () => {
    const allUsers = "/users";
    const setHeaders = (token) => {
      return { "x-access-token": token };
    };

    var correctJWT;
    beforeEach(async () => {
      await User.deleteMany();
      await Session.deleteMany();

      const newUser = new User(mockUser);
      await newUser.save();

      const response = await request(app).post("/auth").send({
        email: mockUser.email,
        password: correctPass,
      });
      correctJWT = response.body.token;
    });

    //Invalid tests
    test("Missing JWT returns 400", async () => {
      const response = await request(app).get(allUsers).send();
      expect(response.statusCode).toBe(400);
    });
    test("Invalid JWT returns 403", async () => {
      const response = await request(app)
        .get(allUsers)
        .set(setHeaders("Bearerlmao"))
        .send();
      expect(response.statusCode).toBe(403);
    });

    //valid tests
    test("Correct JWT returns 200", async () => {
      const response = await request(app)
        .get(allUsers)
        .set(setHeaders(correctJWT))
        .send();
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Get Specific user", () => {
    const specificUser = (id) => "/users/" + id;
    const setHeaders = (token) => {
      return { "x-access-token": token };
    };

    var correctJWT;
    var otherUserID;
    beforeEach(async () => {
      await User.deleteMany();
      await Session.deleteMany();

      const newUser = new User(mockUser);
      await newUser.save();

      const otherUser = new User(diffUser);
      await otherUser.save();
      otherUserID = otherUser._id;

      const response = await request(app).post("/auth").send({
        email: mockUser.email,
        password: correctPass,
      });
      correctJWT = response.body.token;
    });

    //Invalid tests
    test("Missing JWT returns 400", async () => {
      const response = await request(app).get(specificUser(otherUserID)).send();
      expect(response.statusCode).toBe(400);
    });
    test("Invalid JWT returns 403", async () => {
      const response = await request(app)
        .get(specificUser(otherUserID))
        .set(setHeaders("Bearerlmao"))
        .send();
      expect(response.statusCode).toBe(403);
    });
    test("Invalid ObjectID returns 400", async () => {
      const response = await request(app)
        .get(specificUser("thisisnotreal"))
        .set(setHeaders(correctJWT))
        .send();
      expect(response.statusCode).toBe(400);
    });
    test("Non-User ObjectID returns 404", async () => {
      const response = await request(app)
        .get(specificUser("62d6bdaee3e112774e7a21fe"))
        .set(setHeaders(correctJWT))
        .send();
      expect(response.statusCode).toBe(404);
    });

    //valid tests
    test("Correct JWT returns 200", async () => {
      const response = await request(app)
        .get(specificUser(otherUserID))
        .set(setHeaders(correctJWT))
        .send();
      expect(response.statusCode).toBe(200);
      expect(response.body.user._id).toBe(otherUserID.toString());
    });
  });
});

afterAll(() => {
  closeMongo();
});
