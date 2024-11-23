import { Router } from "express";
import { body, param } from "express-validator";
import {
  getUsers,
  getUser,
  createUser,
  borrowBook,
  returnBook,
} from "../controllers/userController";
const router = Router();

router.get("/", getUsers);
router.get(
  "/:id",
  [param("id").isInt().withMessage("User ID must be an integer")],
  getUser,
);
router.post(
  "/",
  [body("name").notEmpty().withMessage("Name is required")],
  createUser,
);
router.post(
  "/:id/borrow/:bookId",
  [
    param("id").isInt().withMessage("User ID must be an integer"),
    param("bookId").isInt().withMessage("Book ID must be an integer"),
  ],
  borrowBook,
);
router.post(
  "/:id/return/:bookId",
  [
    param("id").isInt().withMessage("User ID must be an integer"),
    param("bookId").isInt().withMessage("Book ID must be an integer"),
    body("score")
      .isInt({ min: 1, max: 10 })
      .withMessage("Score must be an integer between 1 and 10"),
  ],
  returnBook,
);

export default router;
