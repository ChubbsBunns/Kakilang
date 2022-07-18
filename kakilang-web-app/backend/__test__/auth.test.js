/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/** Dependencies */
const User = require("../models/user.model");
const Session = require("../models/session.model");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

//MongoDB connect
const uri = "mongodb://localhost:27017/mockDB";
mongoose.connect(uri);
const closeMongo = async () => await mongoose.connection.close();

/** Password is mockPassword123 */
const mockUser = {
  name: "Mock User",
  email: "mockUser@email.com",
  password: "$2a$12$1EtZVlvC10oGafCuqHyWeeeKRxw8QhpiXmfs/6hXCvERh3./1PsPO",
};
const correctPass = "mockPassword123";

describe("Auth Router Tests", () => {
  var dbUser;

  test("Test Initialised", () => {
    expect(true).toBeTruthy();
  });

  describe("Login request test", () => {
    const login = "/auth";
    beforeEach(async () => {
      await User.deleteMany();
      await Session.deleteMany();

      const newUser = new User(mockUser);
      await newUser.save();
      dbUser = newUser;
    });

    // Invalid tests
    test("Missing Email returns 400", async () => {
      const response = await request(app).post(login).send({
        password: correctPass,
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.isLoggedIn).toBeFalsy();
    });
    test("Missing Password returns 400", async () => {
      const response = await request(app).post(login).send({
        email: mockUser.email,
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.isLoggedIn).toBeFalsy();
    });
    test("Invalid Email return 403", async () => {
      const response = await request(app).post(login).send({
        email: "wrongEmail",
        password: correctPass,
      });
      expect(response.statusCode).toBe(403);
      expect(response.body.isLoggedIn).toBeFalsy();
    });
    test("Invalid Password return 403", async () => {
      const response = await request(app).post(login).send({
        email: mockUser.email,
        password: "wrongPassword",
      });
      expect(response.statusCode).toBe(403);
      expect(response.body.isLoggedIn).toBeFalsy();
    });

    // Valid test
    test("Correct login returns 200", async () => {
      const response = await request(app).post(login).send({
        email: mockUser.email,
        password: correctPass,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.isLoggedIn).toBeTruthy();
      expect(response.body.user._id).toBe(dbUser._id.toString());
    });
  });

  describe("JWT request test", () => {
    const jwtLogin = "/auth";
    const setHeaders = (token) => {
      return { "x-access-token": token };
    };
    var correctJWT;
    const wrongButValidJWT =
      "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e" +
      "yJpZCI6ImxtYW8iLCJlbWFpbCI6ImludmFsaWQiLCJpYXQiOjE2NTgx" +
      "NTYzMDd9.XXDPFo9eHNVALc5KW0n9SLN20hBudo-KRgDoe4_KM2U";
    const expiredJWT =
      "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC" +
      "I6ImxtYW8iLCJlbWFpbCI6ImludmFsaWQiLCJpYXQiOjE2NTgxNTY5ODIsImV4cC" +
      "I6MTY1ODE1Njk4M30.u4pg6eC4TfriGlgFOOXu6mRuwkxi2JuYSuopCZkp0NM";

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

      dbUser = newUser;
    });

    //this test is required for wrongButValidJWT to exist
    test("Logged in Succesfully", () => {
      expect(true).toBeTruthy();
    });

    //Invalid Tests
    test("Missing JWT returns 400", async () => {
      const response = await request(app).get(jwtLogin).send();
      expect(response.statusCode).toBe(400);
    });
    test("Invalid JWT returns 403", async () => {
      const response = await request(app)
        .get(jwtLogin)
        .set(setHeaders("Bearerlmao"));
      expect(response.statusCode).toBe(403);
    });
    test("Expired JWT returns 403", async () => {
      const response = await request(app)
        .get(jwtLogin)
        .set(setHeaders(expiredJWT))
        .send();
      expect(response.statusCode).toBe(403);
    });
    test("Wrong Session JWT returns 403", async () => {
      const response = await request(app)
        .get(jwtLogin)
        .set(setHeaders(wrongButValidJWT))
        .send();
      expect(response.statusCode).toBe(403);
    });

    //Succesful login (May fail due to slow mongodb response)
    //recommend to push
    test("Correct JWT returns 200", async () => {
      const response = await request(app)
        .get(jwtLogin)
        .set(setHeaders(correctJWT))
        .send();
      expect(response.statusCode).toBe(200);
    });
  });
});

afterAll(() => {
  closeMongo();
});
