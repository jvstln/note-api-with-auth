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
const utils_1 = require("./utils");
const note_model_1 = __importDefault(require("./note.model"));
class NoteController {
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allNotes = yield note_model_1.default.find();
                (0, utils_1.handleSuccess)(res, "Notes retrieved successful", allNotes);
            }
            catch (error) {
                (0, utils_1.handleError)(res, error, "Error getting all notes");
            }
        });
    }
    getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id.length !== 24)
                    throw new utils_1.HTTPError(400, "Invalid ID");
                const note = yield note_model_1.default.findById(req.params.id);
                if (!note)
                    throw new utils_1.HTTPError(404, "Note not found");
                (0, utils_1.handleSuccess)(res, "Note details retrieved successfully", note);
            }
            catch (error) {
                (0, utils_1.handleError)(res, error, "Error getting note details");
            }
        });
    }
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = yield note_model_1.default.create(req.body);
                (0, utils_1.handleSuccess)(res, "Note created successfully", newNote);
            }
            catch (error) {
                (0, utils_1.handleError)(res, error, "Error creating note");
            }
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id.length !== 24)
                    throw new utils_1.HTTPError(400, "Invalid ID");
                const deletedNote = yield note_model_1.default.findByIdAndDelete(req.params.id);
                (0, utils_1.handleSuccess)(res, "Note deleted successfully", deletedNote);
            }
            catch (error) {
                (0, utils_1.handleError)(res, error, "Error deleting note");
            }
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id.length !== 24)
                    throw new utils_1.HTTPError(400, "Invalid ID");
                const oldNote = yield note_model_1.default.findByIdAndUpdate(req.params.id, req.body);
                if (!oldNote)
                    throw new utils_1.HTTPError(404, "Note not found");
                const updatedNote = yield note_model_1.default.findById(req.params.id);
                (0, utils_1.handleSuccess)(res, "Note updated successfully", updatedNote);
            }
            catch (error) {
                (0, utils_1.handleError)(res, error, "Error updating note details");
            }
        });
    }
}
exports.default = NoteController;
