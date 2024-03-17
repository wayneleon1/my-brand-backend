import express, { Router } from "express";
const router: Router = express.Router();
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skills.controllers";

router.route("/").get(getSkills).post(createSkill);
router.route("/:id").get(getSkillById).put(updateSkill).delete(deleteSkill);
export default router;
