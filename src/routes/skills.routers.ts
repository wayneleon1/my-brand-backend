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
import fileUpload from "../helper/multer";

router
  .route("/")
  .get(getSkills)
  .post(validateToken, fileUpload.single("image"), createSkill);
router
  .route("/:id")
  .get(validateToken, getSkillById)
  .put(validateToken, fileUpload.single("image"), updateSkill)
  .delete(validateToken, deleteSkill);
export default router;
