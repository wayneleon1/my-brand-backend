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
    const { body } = await request(app).get("/mybrand/skills/").expect(200);
    expect(body.data).toBeDefined();
    expect(body.message).toStrictEqual("Data retrieved successfully");
  });

  test("It will add new Skill and return 201", async () => {
    const { body } = await request(app)
      .post("/mybrand/skills")
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .send(skillData)
      .expect(201);
    expect(body.message).toStrictEqual("Skill added successfully");
    expect(body.data._id).toBeDefined();
    skilltId = body.data._id;
  });

  test("It should get Skill  by ID and return 200", async () => {
    const { body } = await request(app)
      .get(`/mybrand/skills/${skilltId}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.data).toBeDefined();
  });

  test("It should  update a Skill by ID and return 201", async () => {
    const { body } = await request(app)
      .put(`/mybrand/skills/${skilltId}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .send(skillData)
      .expect(201);
    expect(body.message).toStrictEqual("Skill updated successfully");
    expect(body.data).toBeDefined();
  });

  test("It will delete Skill and return 200", async () => {
    const { body } = await request(app)
      .delete(`/mybrand/skills/${skilltId}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.message).toStrictEqual("Skill deleted successfully");
  });
});
