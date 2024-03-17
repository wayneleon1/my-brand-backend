import express, { Router } from "express";
const router: Router = express.Router();
import {
  getProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers";

router.route("/").get(getProject).post(createProject);
router
  .route("/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;
