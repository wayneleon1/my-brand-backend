import express, { Router } from "express";
import validateToken from "../middleware/validateTokenHandler";

const router: Router = express.Router();
import {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/users.controllers";
import fileUpload from "../helper/multer";

router.post("/login", loginUser);
router
  .route("/")
  .get(validateToken, getUsers)
  .post(fileUpload.single("image"), registerUser);

router
  .route("/:id")
  .get(validateToken, getUserById)
  .put(validateToken, updateUser)
  .delete(validateToken, deleteUser);
export default router;
