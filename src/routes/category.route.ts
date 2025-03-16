import express from "express";
import CategoryContoller from "../controllers/category.contoller";

const router = express.Router();

router.param("categoryId", CategoryContoller.validateCategoryExistence);

router.get("/", CategoryContoller.getCategories);
router.get("/:categoryId", CategoryContoller.getCategory);
router.post("/", CategoryContoller.createCategory);

export default router;
