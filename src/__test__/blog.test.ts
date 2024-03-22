import request from "supertest";
import app from "../app";
import { tesConnectToDatabase } from "../config/dbConnection";

import Blog, { IBlog } from "../models/blog.model";
import User, { IUser } from "../models/users.model";

// import {
//   getBlogs,
//   createBlog,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
// } from "../controllers/blog.controllers";

jest.setTimeout(50000);

// let token: string;
// let id: string;
// let commentId: string;

describe("test Blog Apis", () => {
  beforeAll(async () => {
    await tesConnectToDatabase();
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

    // test("It will return the list of blogs", async () => {
    //     const {body} = await request(app)
    //     .get("/api/Blogs")
    //     .expect(200)
    //     expect(body.data).toBeDefined()
    //     expect(body.message).toStrictEqual("Data retrieved successfully")
    // })

    // test("It will return single blog", async () => {
    //     const {body} = await request(app)
    //     .post(/api/Blogs/${id})
    //     .expect(200)
    // })

    // test("It will add new user and login and return 201 and message", async () => {
    //     const {body} = await request(app)
    //     .post("/api/Users")
    //     .send(userData)
    //     .expect(201)
    //     expect(body.message).toStrictEqual("User created successfully")

    //     const responeLogin = await request(app)
    // .post("/api/Users/login")
    // .send(loginData)
    // .expect(200)
    // expect(responeLogin.body.token).toBeDefined()

    // token = responeLogin.body.token

    // })

    // test("It will add new blog and return 201", async () => {
    //     const {body} = await request(app)
    //     .post("/api/Blogs")
    //     .expect('Content-Type', /json/)
    //     .set('Authorization',Bearer ${token})
    //     .send(blogData)
    //     .expect(201)
    //     expect(body.message).toStrictEqual("Create Blog Successfully")
    //     expect(body.data._id).toBeDefined()

    //     id = body.data._id;
    // })

    // test( "It will add like and return 201", async() => {
    //     const { body } = await request(app)
    //     .post(/api/Blogs/${id}/Likes)
    //     .set("Authorization", Bearer ${token})
    //     .expect(201)
    // })

    // test("It will add comment and retuen 201", async () => {
    //     const {body} = await request(app)
    //     .post(/api/Blogs/${id}/Comments)
    //     .set("Authorization", Bearer ${token})
    //     .send(commentData)
    //     .expect(201)
    //      expect(body.data).toBeDefined()

    //      commentId = body.data._id

    // })

    // test("It will delete comment and return 204", async() => {
    //     const {body} = await request(app)
    //     .delete(/api/Blogs/${id}/Comments)
    //     .set("Authorization", Bearer ${token})
    //     .expect(404)
    // })

    // test("It will delete Blog and return 200", async () => {
    //     const {body} = await request(app)
    //     .delete("/api/Blogs")
    //     .expect(200)
    // })
  });
});
