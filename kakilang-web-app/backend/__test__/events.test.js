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
const mockEvent = (ownerID) => {
  return {
    name: "Mock Event",
    description: "Hello",
    eventDate: Date.now(),
    ownerID: ownerID,
  };
};

test("Initialised Correctly", () => {
  expect(true).toBeTruthy();
});

describe("Event Router Tests", () => {});

afterAll(() => {
  closeMongo();
});
