import express from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = express.Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "My brand backend API",
    version: "1.0.0",
    description: "Documentation for My portfolio API.",
  },
  basePath: "/",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "user",
      description: "Operations related to Users entities",
    },
    {
      name: "blog",
      description: "Operations related to Blog entities",
    },
    {
      name: "blogComment",
      description: "Operations related to BlogComment entities",
    },
    {
      name: "project",
      description: "Operations related to Project entities",
    },
    {
      name: "skills",
      description: "Operations related to Skills entities",
    },
    {
      name: "queries",
      description: "Operations related to Queries entities",
    },
  ],
  paths: {
    "/mybrand/user": {
      get: {
        tags: ["user"],
        summary: "Get All Users",
        description: "Get all users",
        responses: {
          200: {
            description: "Data retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["user"],
        summary: "Create User",
        description: "Create a new user",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "User already registered",
          },
          500: {
            description: "User data was not valid",
          },
        },
      },
    },
    "/mybrand/user/login": {
      post: {
        tags: ["user"],
        summary: "User Login",
        description: "User login",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User was logged in successfully",
          },
          401: {
            description: "Email or password is not valid",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/mybrand/user/{id}": {
      get: {
        tags: ["user"],
        summary: "Get User By ID",
        description: "Get a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["user"],
        summary: "Update User",
        description: "Update an existing user",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["user"],
        summary: "Delete User",
        description: "Delete a user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    // Blog side
    "/mybrand/blog": {
      get: {
        tags: ["blog"],
        summary: "Get All blog",
        description: "Get all blog",
        responses: {
          200: {
            description: "All blog are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["blog"],
        summary: "Create blog",
        description: "Create a new blog",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  blogTitle: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  blogContent: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Blog created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/mybrand/blog/{id}": {
      get: {
        tags: ["blog"],
        summary: "Read blog By ID",
        description: "Get a blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Blog retrieved successfully",
          },
          404: {
            description: "blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["blog"],
        summary: "Update blog",
        description: "Update an existing blog",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  blogTitle: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  blogContent: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Blog updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["blog"],
        summary: "Delete blog",
        description: "Delete a blog by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Blog deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Blog not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    //BlogComment side
    "/mybrand/blogComment/{id}/comments/create": {
      post: {
        tags: ["blogComment"],
        summary: "Create blogComment",
        description: "Blog ID to create a new Comment",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  content: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "Comment added successfuly",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "Authorization",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
