import express, { Router } from "express";
const router: Router = express.Router();
import {
  getProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controllers";

router.get("/", getProject);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
