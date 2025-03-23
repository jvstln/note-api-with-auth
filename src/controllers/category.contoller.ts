import { Request, Response } from "express";
import CategoryService from "../services/category.service";
import { HTTPError } from "../utils/errors";

class CategoryController {
  async getCategories(req: Request, res: Response) {
    const allCategories = await CategoryService.getCategories();
    res.json({
      success: true,
      message: "Categories retrieved successfully",
      data: allCategories,
    });
  }

  async getCategory(req: Request, res: Response) {
    const category = await CategoryService.getCategory(req.params.categoryId);
    res.json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  }

  async createCategory(req: Request, res: Response) {
    const createdCategory = await CategoryService.createCategory(req.body);
    res.json({
      succes: true,
      message: "Category created successfully",
      data: createdCategory,
    });
  }

  async validateCategoryExistence(req: Request, res: Response, next: Function) {
    if (!req.params.categoryId) {
      throw new HTTPError(400, "Category id is required");
    }
    if (req.params.categoryId.length !== 24) {
      throw new HTTPError(400, "Invalid category id");
    }

    const category = await CategoryService.getCategory(req.params.categoryId);
    if (!category) throw new HTTPError(404, "Category not found");

    next();
  }
}

export default new CategoryController();
