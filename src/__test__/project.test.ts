import request from "supertest";
import app from "../app";
import { projectData } from "../data/static";
import { registerAndLoginUser, beforeAllHook, afterAllHook } from "./testSetup";

beforeAll(beforeAllHook); // Run before all tests
afterAll(afterAllHook); // Run after all tests

jest.setTimeout(50000);

describe("Test Project Apis", () => {
  let projectId: string;
  let token: string;

  beforeAll(async () => {
    token = await registerAndLoginUser();
  });

  test("It should return the list of projects", async () => {
    const { body } = await request(app).get("/mybrand/project/").expect(200);
    expect(body.data).toBeDefined();
    expect(body.message).toStrictEqual("Data retrieved successfully");
  });

  test("It will add new project and return 201", async () => {
    const { body } = await request(app)
      .post("/mybrand/project")
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .send(projectData)
      .expect(201);
    expect(body.message).toStrictEqual("Project added successfully");
    expect(body.data._id).toBeDefined();

    projectId = body.data._id;
  });

  test("It should return single project", async () => {
    const { body } = await request(app)
      .get(`/mybrand/project/${projectId}`)
      .expect(200);
  });

  test("It should  update a project by ID and return 201", async () => {
    const { body } = await request(app)
      .put(`/mybrand/project/${projectId}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .send(projectData)
      .expect(201);
    expect(body.message).toStrictEqual("Project updated successfully");
    expect(body.data).toBeDefined();
  });

  test("It will delete project and return 200", async () => {
    const { body } = await request(app)
      .delete(`/mybrand/project/${projectId}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(body.message).toStrictEqual("Project deleted successfully");
  });
});
