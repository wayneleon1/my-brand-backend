import express, { Router } from "express";
const router: Router = express.Router();
import validateToken from "../middleware/validateTokenHandler";
import {
  getQueries,
  getQueryById,
  createQuery,
  deleteQuery,
} from "../controllers/queries.controllers";

router.route("/").get(validateToken, getQueries).post(createQuery);
router
  .route("/:id")
  .get(validateToken, getQueryById)
  .delete(validateToken, deleteQuery);
export default router;
