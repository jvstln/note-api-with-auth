import { Request, Response } from "express";
import CategoryService from "../services/category.service";
import { handleError, HTTPError } from "../utils";

class CategoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const allCategories = await CategoryService.getCategories();
      res.json({
        success: true,
        message: "Categories retrieved successfully",
        data: allCategories,
      });
    } catch (error) {
      handleError(res, error, "Error getting all categories");
    }
  }

  async getCategory(req: Request, res: Response) {
    try {
      const category = await CategoryService.getCategory(req.params.categoryId);
      res.json({
        success: true,
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      handleError(res, error, "Error getting category");
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const createdCategory = await CategoryService.createCategory(req.body);
      res.json({
        succes: true,
        message: "Category created successfully",
        data: createdCategory,
      });
    } catch (error) {
      handleError(res, error, "Error creating category");
    }
  }

  async validateCategoryExistence(req: Request, res: Response, next: Function) {
    try {
      if (!req.params.categoryId)
        throw new HTTPError(400, "Category id is required");
      if (req.params.categoryId.length !== 24)
        throw new HTTPError(400, "Invalid category id");

      const category = await CategoryService.getCategory(req.params.categoryId);
      if (!category) throw new HTTPError(404, "Category not found");

      next();
    } catch (error) {
      handleError(res, error, "Error validating category existence");
    }
  }
}

export default new CategoryController();
