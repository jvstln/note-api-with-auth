"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const category_contoller_1 = __importDefault(require("../controllers/category.contoller"));
const router = express_1.default.Router();
// Param middleware to validate note existence if id exists
router.param("noteId", note_controller_1.default.validateNoteExistence);
router.use(note_controller_1.default.validateAndTransformCategory);
router.get("/", note_controller_1.default.getNotes);
router.get("/:noteId", note_controller_1.default.getNote);
router.post("/", note_controller_1.default.createNote);
router.delete("/:noteId", note_controller_1.default.deleteNote);
router.patch("/:noteId", note_controller_1.default.updateNote);
// The correct method for updating is patch.. But am leaving it here for task legacy reasons
router.put("/:noteId", note_controller_1.default.updateNote);
router.get("/categories/:categoryId", category_contoller_1.default.validateCategoryExistence, note_controller_1.default.getNotesByCategory);
exports.default = router;
