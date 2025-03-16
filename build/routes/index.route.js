"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_route_1 = __importDefault(require("./note.route"));
const category_route_1 = __importDefault(require("./category.route"));
const router = express_1.default.Router();
// Notes routes
router.use("/notes/", note_route_1.default);
// Categories routes
router.use("/categories", category_route_1.default);
exports.default = router;
