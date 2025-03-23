import express from "express";
import CategoryContoller from "../controllers/category.contoller";
import { categorySchema } from "../schemas/category.schema";
import { createValidationMiddleware } from "../middleware/validation.middleware";

const categoryRouter = express.Router();

categoryRouter.param("categoryId", CategoryContoller.validateCategoryExistence);

categoryRouter.get("/", CategoryContoller.getCategories);
categoryRouter.get("/:categoryId", CategoryContoller.getCategory);
categoryRouter.post(
  "/",
  createValidationMiddleware(categorySchema),
  CategoryContoller.createCategory
);

export default categoryRouter;
