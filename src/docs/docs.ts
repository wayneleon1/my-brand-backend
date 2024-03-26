import express from "express";
import { format } from "path";
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
    "/mybrand/blogComment/": {
      get: {
        tags: ["blogComment"],
        summary: "Get All comment",
        description: "Get all commets",
        responses: {
          200: {
            description: "Data retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/mybrand/blogComment/{id}/comment/create": {
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
    "/mybrand/blogComment/{id}/comment/delete": {
      delete: {
        tags: ["blogComment"],
        summary: "Delete comment",
        description: "Delete a comment by ID",
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
            description: "Comment deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Comment not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    // Project side
    "/mybrand/project": {
      get: {
        tags: ["project"],
        summary: "Get All Projects",
        description: "Get all Project",
        responses: {
          200: {
            description: "All Project are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["project"],
        summary: "Create Project",
        description: "Create a new Project",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  projectName: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  githubLink: {
                    type: "string",
                  },
                  hostedLink: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                  description: {
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
            description: "Project created successfully",
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

    "/mybrand/project/{id}": {
      get: {
        tags: ["project"],
        summary: "Read Project By ID",
        description: "Get a Project by ID",
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
            description: "Project retrieved successfully",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["project"],
        summary: "Update Project",
        description: "Update an existing Project",
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
                  projectName: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                  githubLink: {
                    type: "string",
                  },
                  hostedLink: {
                    type: "string",
                  },
                  image: {
                    type: "string",
                    format: "binary",
                  },
                  description: {
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
            description: "Project updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["project"],
        summary: "Delete Project",
        description: "Delete a Project by ID",
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
            description: "Project deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Project not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    // Skills side
    "/mybrand/skills": {
      get: {
        tags: ["skills"],
        summary: "Get All Skillss",
        description: "Get all Skills",
        responses: {
          200: {
            description: "All Skills are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["skills"],
        summary: "Create Skill",
        description: "Create a new Skills",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  type: {
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
            description: "Skill created successfully",
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
    "/mybrand/skills/{id}": {
      get: {
        tags: ["skills"],
        summary: "Read Skill By ID",
        description: "Get a Skill by ID",
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
            description: "Skill retrieved successfully",
          },
          404: {
            description: "Skills not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["skills"],
        summary: "Update Skill",
        description: "Update an existing Skill",
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
                  type: {
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
            description: "Skill updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Skills not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["skills"],
        summary: "Delete Skills",
        description: "Delete a Skills by ID",
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
            description: "Skills deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Skills not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    // queries side
    "/mybrand/queries": {
      get: {
        tags: ["queries"],
        summary: "Get All queriess",
        description: "Get all queries",
        responses: {
          200: {
            description: "All queries are retrieved successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["queries"],
        summary: "Create Skill",
        description: "Create a new queries",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  names: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  subject: {
                    type: "string",
                  },
                  message: {
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
            description: "Message sent successfully",
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
    "/mybrand/queries/{id}": {
      get: {
        tags: ["queries"],
        summary: "Read Query By ID",
        description: "Get a Query by ID",
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
            description: "Query retrieved successfully",
          },
          404: {
            description: "queries not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["queries"],
        summary: "Update Query",
        description: "Update an existing Query",
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
                  names: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  subject: {
                    type: "string",
                  },
                  message: {
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
            description: "Query updated successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "query not found",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["queries"],
        summary: "Delete query",
        description: "Delete a query by ID",
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
            description: "query deleted successfully",
          },
          400: {
            description: "Bad Request",
          },
          404: {
            description: "Query not found",
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
