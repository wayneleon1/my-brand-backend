import express, { Router } from "express";
const router: Router = express.Router();
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skills.controllers";

router.get("/", getSkills);
router.get("/:id", getSkillById);
router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

export default router;
