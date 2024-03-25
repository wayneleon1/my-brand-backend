import request from "supertest";
import app from "../app";
import { skillData } from "../data/static";
import { registerAndLoginUser, beforeAllHook, afterAllHook } from "./testSetup";

beforeAll(beforeAllHook); // Run before all tests
afterAll(afterAllHook); // Run after all tests

jest.setTimeout(50000);

describe("Test Skills Api's", () => {
  let skilltId: string;
  let token: string;

  beforeAll(async () => {
    token = await registerAndLoginUser();
  });
  test("It should return the list of Skills", async () => {
    const { body } = await request(app).get("/mybrand/skill/").expect(200);
    expect(body.data).toBeDefined();
    expect(body.message).toStrictEqual("Data retrieved successfully");
  });
});
