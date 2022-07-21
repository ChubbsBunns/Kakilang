/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Tests for Events Router
 *
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
const Events = require("../models/events.model");

//MongoDB connect
const uri = "mongodb://localhost:27017/mockEvent";
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

/** Events */
const mockOwnerID = "62d80cf2ee2b8752e24e49f9";
const mockEvent = (ownerID = mockOwnerID) => {
  return {
    name: "Mock Event",
    description: "Hello",
    eventDate: Date.now(),
    ownerID: ownerID,
  };
};

/** Helper */
const removeAll = async () => {
  await Events.deleteMany();
  await User.deleteMany();
  await Session.deleteMany();
};
const setHeaders = (token) => {
  return { "x-access-token": token };
};

test("Initialised Correctly", () => {
  expect(true).toBeTruthy();
});

describe("Event Router Tests", () => {
  describe("Create Event", () => {
    const createEvent = "/events/";

    var dbUser, correctJWT;

    beforeEach(async () => {
      await removeAll();

      const newUser = new User(mockUser);
      newUser.save();
      dbUser = newUser;
      const login = await request(app).post("/auth").send({
        email: mockUser.email,
        password: correctPass,
      });
      correctJWT = login.body.token;
    });

    //Invalid JWT Tests
    test("MissingJWT returns 400", async () => {
      const response = await request(app).post(createEvent).send();
      expect(response.statusCode).toBe(400);
    });
    test("InvalidJWT returns 403", async () => {
      const response = await request(app)
        .post(createEvent)
        .set(setHeaders("BearerLmao"))
        .send();
      expect(response.statusCode).toBe(403);
    });

    //Valid test
    test("ValidJWT and Event Params returns 201", async () => {
      const response = await request(app)
        .post(createEvent)
        .set(setHeaders(correctJWT))
        .send(mockEvent(dbUser._id));
      expect(response.statusCode).toBe(201);
    });
  });

  describe("Retrieve Events", () => {
    const getEvents = "/events";
    var dbEvent;
    beforeEach(async () => {
      await removeAll();

      const newEvent = new Events(mockEvent());
      newEvent.save();
      dbEvent = newEvent;
    });

    test("Retrieve events successful", async () => {
      const response = await request(app).get(getEvents).send();
      expect(response.statusCode).toBe(200);
    });
  });
});

afterAll(() => {
  closeMongo();
});
