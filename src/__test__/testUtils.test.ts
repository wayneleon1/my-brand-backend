// testSetup.js
import request from "supertest";
import app from "../app";
import { testConnectToDatabase } from "../config/dbConnection";
import { loginData, userData } from "../data/static";

import User from "../models/users.model";
import Blog from "../models/blog.model";
import Queries from "../models/queries.model";
import Project from "../models/project.model";
import Skills from "../models/skills.model";
import BlogComment from "../models/blogComment.model";

// Function to register and login user
export async function registerAndLoginUser() {
  // Register user
  const { body: registerResponse } = await request(app)
    .post("/mybrand/user")
    .send(userData)
    .expect(201);
  expect(registerResponse.message).toStrictEqual(
    "User registered successfully"
  );

  // Login user
  const { body: loginResponse } = await request(app)
    .post("/mybrand/user/login")
    .send(loginData)
    .expect(200);
  expect(loginResponse.accessToken).toBeDefined();

  return loginResponse.accessToken;
}

export async function beforeAllHook() {
  await testConnectToDatabase();
}

export async function afterAllHook() {
  await User.deleteMany();
  await Queries.deleteMany();
  await Blog.deleteMany();
  await BlogComment.deleteMany();
  await Project.deleteMany();
  await Skills.deleteMany();
}
