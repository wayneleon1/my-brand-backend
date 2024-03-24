import request from "supertest";
import app from "../app";
import { testConnectToDatabase } from "../config/dbConnection";
import { loginData, userData, queriesData } from "../data/static";
import User from "../models/users.model";
import Queries from "../models/queries.model";

jest.setTimeout(50000);

let token: string;
let query_id: string;

describe.only("Test Queries Api's", () => {
  beforeAll(async () => {
    await testConnectToDatabase();
  });

  afterAll(async () => {
    await User.deleteMany();
    await Queries.deleteMany();
  });

  test("It will add new user and login and return 201 and message", async () => {
    const { body } = await request(app)
      .post("/mybrand/user")
      .send(userData)
      .expect(201);
    expect(body.message).toStrictEqual("User registered successfully");

    const responeLogin = await request(app)
      .post("/mybrand/user/login")
      .send(loginData)
      .expect(200);
    expect(responeLogin.body.accessToken).toBeDefined();
    token = responeLogin.body.accessToken;
  });

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
