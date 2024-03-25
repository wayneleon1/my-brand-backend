import request from "supertest";
import app from "../app";
import { loginData, userData } from "../data/static";
import { beforeAllHook, afterAllHook } from "./testSetup";

beforeAll(beforeAllHook); 
afterAll(afterAllHook); 

jest.setTimeout(50000);

let token: string;
let user_id: string;

describe("Test User Apis", () => {
  test("It should add new user and return 201 and message", async () => {
    const { body } = await request(app)
      .post("/mybrand/user")
      .send(userData)
      .expect(201);
    expect(body.message).toStrictEqual("User registered successfully");
    expect(body.data).toBeDefined();
    user_id = body.data._id;
  });

  test("It should Login and return token", async () => {
    const responeLogin = await request(app)
      .post("/mybrand/user/login")
      .send(loginData)
      .expect(200);
    expect(responeLogin.body.accessToken).toBeDefined();
    token = responeLogin.body.accessToken;
  });

  test("It should return the list of Users", async () => {
    const { body } = await request(app)
      .get("/mybrand/user/")
      .expect(200)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`);
    expect(body.data).toBeDefined();
    expect(body.message).toStrictEqual("Data retrieved successfully");
  });

  test("It should get single user by ID and return 200", async () => {
    const { body } = await request(app)
      .get(`/mybrand/user/${user_id}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.data).toBeDefined();
  });

  test("It should  update a user by ID and return 201", async () => {
    const { body } = await request(app)
      .put(`/mybrand/user/${user_id}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .send(userData)
      .expect(201);
    expect(body.message).toStrictEqual("User updated successfully");
    expect(body.data).toBeDefined();
  });

  test("It will delete User and return 200", async () => {
    const { body } = await request(app)
      .delete(`/mybrand/user/${user_id}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.message).toStrictEqual("User deleted successfully");
  });
});
