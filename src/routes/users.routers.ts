import express, { Router } from "express";
const router: Router = express.Router();
import {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/users.controllers";

router.post("/login", loginUser);
router.route("/").get(getUsers).post(registerUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
