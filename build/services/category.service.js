"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("../models/category.model");
class CategoryService {
    getCategories() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, projection = {}) {
            return category_model_1.CategoryModel.find(filter, projection).populate("noteCount");
        });
    }
    getCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return category_model_1.CategoryModel.findById(id).populate("noteCount");
        });
    }
    getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return category_model_1.CategoryModel.findOne({ name });
        });
    }
    createCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return category_model_1.CategoryModel.create(data);
        });
    }
    exists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return category_model_1.CategoryModel.exists({ name });
        });
    }
}
exports.default = new CategoryService();
