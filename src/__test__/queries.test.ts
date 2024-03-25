import request from "supertest";
import app from "../app";
import { queriesData } from "../data/static";
import {
  registerAndLoginUser,
  beforeAllHook,
  afterAllHook,
} from "./testUtils.test";

jest.setTimeout(50000);

beforeAll(beforeAllHook); // Run before all tests
afterAll(afterAllHook); // Run after all tests

describe.only("Test Queries Api's", async () => {
  const token = await registerAndLoginUser();
  let query_id: string;
  
  test("It will send Message and return 201", async () => {
    const { body } = await request(app)
      .post("/mybrand/queries")
      .send(queriesData)
      .expect(201);
    expect(body.message).toStrictEqual("Message Sent successfully");
    expect(body.data._id).toBeDefined();
    query_id = body.data._id;
  });

  test("It should return the list of queries", async () => {
    const { body } = await request(app)
      .get("/mybrand/queries/")
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.data).toBeDefined();
    expect(body.message).toStrictEqual("Data retrieved successfully");
  });

  test("It should get single query by ID ", async () => {
    const { body } = await request(app)
      .get(`/mybrand/queries/${query_id}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.data).toBeDefined();
  });

  test("It will delete query by ID and return 200", async () => {
    const { body } = await request(app)
      .delete(`/mybrand/queries/${query_id}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.message).toStrictEqual("Message deleted successfully");
  });
});
