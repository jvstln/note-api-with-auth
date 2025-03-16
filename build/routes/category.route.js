"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_contoller_1 = __importDefault(require("../controllers/category.contoller"));
const router = express_1.default.Router();
router.param("categoryId", category_contoller_1.default.validateCategoryExistence);
router.get("/", category_contoller_1.default.getCategories);
router.get("/:categoryId", category_contoller_1.default.getCategory);
router.post("/", category_contoller_1.default.createCategory);
exports.default = router;
