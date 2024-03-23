import request from "supertest";
import app from "../app";
import { testConnectToDatabase } from "../config/dbConnection";
import {
  blogData,
  commentData,
  loginData,
  queryData,
  userData,
} from "../data/static";

import Blog from "../models/blog.model";
import User from "../models/users.model";

jest.setTimeout(50000);

let token: string;
let id: string;
let commentId: string;

describe("Test Blog Apis", () => {
  beforeAll(async () => {
    await testConnectToDatabase();
  });

  afterAll(async () => {
    await User.deleteMany();
    await Blog.deleteMany();
  });

  describe("My brand APIs test", () => {
    test("it should return 200 and welcome message", async () => {
      const { body } = await request(app)
        .get("/")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body.message).toStrictEqual("Welcome to RURANGWA Leo's brand API");
    });
  });

  test("It should return the list of blogs", async () => {
    const { body } = await request(app).get("/mybrand/blog/").expect(200);
    expect(body.data).toBeDefined();
    expect(body.message).toStrictEqual("Data retrieved successfully");
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

  test("It will add new blog and return 201", async () => {
    const { body } = await request(app)
      .post("/mybrand/blog")
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .send(blogData)
      .expect(201);
    expect(body.message).toStrictEqual("Blog created successfully");
    expect(body.data._id).toBeDefined();

    id = body.data._id;
  });

  test("It should return single blog", async () => {
    const { body } = await request(app).get(`/mybrand/blog/${id}`).expect(200);
  });

  test("It should  update a blog by ID and return 200", async () => {
    const { body } = await request(app)
      .put(`/mybrand/blog/${id}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .send(blogData)
      .expect(200);
    expect(body.message).toStrictEqual("Blog updated successfully");
    expect(body.data).toBeDefined();
  });

  test("It will add comment and retuen 201", async () => {
    const { body } = await request(app)
      .post(`/mybrand/blogComment/${id}/comments/create`)
      .send(commentData)
      .expect(201);
    expect(body.message).toStrictEqual("Comment added successfuly");
    expect(body.data).toBeDefined();
    commentId = body.data._id;
  });

  test("It will delete Blog and return 200", async () => {
    const { body } = await request(app)
      .delete(`/mybrand/blog/${id}`)
      .expect("Content-Type", /json/)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
