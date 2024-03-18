import express, { Router } from "express";
import validateToken from "../middleware/validateTokenHandler";
const router: Router = express.Router();
import {
  getProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers";

router.route("/").get(getProject).post(validateToken, createProject);
router
  .route("/:id")
  .get(getProjectById)
  .put(validateToken, updateProject)
  .delete(validateToken, deleteProject);

export default router;
