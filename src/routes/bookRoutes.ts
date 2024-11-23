import { Router } from "express";
import { body, param } from "express-validator";
import { getBooks, getBook, createBook } from "../controllers/bookController";
const router = Router();

router.get("/", getBooks);
router.get(
  "/:id",
  [param("id").isInt().withMessage("Book ID must be an integer")],
  getBook,
);
router.post(
  "/",
  [body("name").notEmpty().withMessage("Name is required")],
  createBook,
);

export default router;
