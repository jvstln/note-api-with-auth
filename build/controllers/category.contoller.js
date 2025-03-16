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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = __importDefault(require("../services/category.service"));
const errors_1 = require("../utils/errors");
class CategoryController {
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategories = yield category_service_1.default.getCategories();
                res.json({
                    success: true,
                    message: "Categories retrieved successfully",
                    data: allCategories,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error getting all categories");
            }
        });
    }
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_service_1.default.getCategory(req.params.categoryId);
                res.json({
                    success: true,
                    message: "Category retrieved successfully",
                    data: category,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error getting category");
            }
        });
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const categoryExists = yield category_service_1.default.exists((_a = req.body.name) === null || _a === void 0 ? void 0 : _a.toLowerCase());
                if (categoryExists) {
                    throw new errors_1.HTTPError(409, "Category already exists");
                }
                const createdCategory = yield category_service_1.default.createCategory(req.body);
                res.json({
                    succes: true,
                    message: "Category created successfully",
                    data: createdCategory,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error creating category");
            }
        });
    }
    validateCategoryExistence(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.categoryId)
                    throw new errors_1.HTTPError(400, "Category id is required");
                if (req.params.categoryId.length !== 24)
                    throw new errors_1.HTTPError(400, "Invalid category id");
                const category = yield category_service_1.default.getCategory(req.params.categoryId);
                if (!category)
                    throw new errors_1.HTTPError(404, "Category not found");
                next();
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error validating category existence");
            }
        });
    }
}
exports.default = new CategoryController();
