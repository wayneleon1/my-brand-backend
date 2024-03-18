import express, { Router } from "express";
const router: Router = express.Router();
import validateToken from "../middleware/validateTokenHandler";
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skills.controllers";

router.route("/").get(getSkills).post(validateToken, createSkill);
router
  .route("/:id")
  .get(getSkillById)
  .put(validateToken, updateSkill)
  .delete(validateToken, deleteSkill);
export default router;
