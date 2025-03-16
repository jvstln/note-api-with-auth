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
const errors_1 = require("../utils/errors");
const note_service_1 = __importDefault(require("../services/note.service"));
const category_service_1 = __importDefault(require("../services/category.service"));
class NoteController {
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allNotes = yield note_service_1.default.getNotes();
                res.json({
                    success: true,
                    message: "Notes retrieved successfully",
                    data: allNotes,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error getting all notes");
            }
        });
    }
    getNotesByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allNotes = yield note_service_1.default.getNotes({
                    category: req.params.categoryId,
                });
                res.json({
                    success: true,
                    message: "Categorized notes retrieved successfully",
                    data: allNotes,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error getting all notes");
            }
        });
    }
    getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield note_service_1.default.getNote(req.params.noteId);
                if (!note)
                    throw new errors_1.HTTPError(404, "Note not found");
                res.json({
                    success: true,
                    message: "Note retrieved successfully",
                    data: note,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error getting note details");
            }
        });
    }
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = yield note_service_1.default.createNote(req.body);
                res.status(201).json({
                    success: true,
                    message: "Note created successfully",
                    data: newNote,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error creating note");
            }
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedNote = yield note_service_1.default.deleteNote(req.params.noteId);
                res.json({
                    success: true,
                    message: "Note deleted successfully",
                    data: deletedNote,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error deleting note");
            }
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedNote = yield note_service_1.default.updateNote(req.params.noteId, req.body);
                res.json({
                    success: true,
                    message: "Note updated successfully",
                    data: updatedNote,
                });
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error updating note details");
            }
        });
    }
    validateNoteExistence(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.noteId)
                    throw new errors_1.HTTPError(400, "Note id is required");
                if (req.params.noteId.length !== 24) {
                    throw new errors_1.HTTPError(400, "Invalid note id");
                }
                const note = yield note_service_1.default.exists(req.params.noteId);
                if (!note)
                    throw new errors_1.HTTPError(404, "Note not found");
                next();
            }
            catch (error) {
                (0, errors_1.handleError)(res, error, "Error validating note existence");
            }
        });
    }
    validateAndTransformCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if ("category" in req.body && req.method !== "DELETE") {
                const category = yield category_service_1.default.getCategoryByName(req.body.category);
                if (!category) {
                    res.status(404).json({
                        success: false,
                        message: `Category "${req.body.category}" does not exist. You need to create a category first`,
                    });
                    return;
                }
                req.body.category = category._id;
            }
            next();
        });
    }
}
exports.default = new NoteController();
