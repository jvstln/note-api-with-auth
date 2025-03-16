import { CategoryModel, type ICategory } from "../models/category.model";

class CategoryService {
  async getCategories(filter = {}, projection = {}) {
    return CategoryModel.find(filter, projection).populate("noteCount");
  }

  async getCategory(id: string) {
    return CategoryModel.findById(id).populate("noteCount");
  }

  async getCategoryByName(name: string) {
    return CategoryModel.findOne({ name });
  }

  async createCategory(data: ICategory) {
    return CategoryModel.create(data);
  }

  async exists(name: string) {
    return CategoryModel.exists({ name });
  }
}

export default new CategoryService();
