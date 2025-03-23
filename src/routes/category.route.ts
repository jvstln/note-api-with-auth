import express from "express";
import CategoryContoller from "../controllers/category.contoller";
import { categorySchema } from "../schemas/category.schema";
import { createValidationMiddleware } from "../middleware/validation.middleware";

const router = express.Router();

router.param("categoryId", CategoryContoller.validateCategoryExistence);

router.get("/", CategoryContoller.getCategories);
router.get("/:categoryId", CategoryContoller.getCategory);
router.post(
  "/",
  createValidationMiddleware(categorySchema),
  CategoryContoller.createCategory
);

export default router;
