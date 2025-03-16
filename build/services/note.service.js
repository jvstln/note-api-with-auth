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
const note_model_1 = require("../models/note.model");
class NoteService {
    getNotes() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, projection = {}) {
            return note_model_1.NoteModel.find(filter, projection).populate("category", "name description");
        });
    }
    getNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return note_model_1.NoteModel.findById(id).populate("category", "name description");
        });
    }
    createNote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield note_model_1.NoteModel.create(data)).populate("category", "name description");
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return note_model_1.NoteModel.findByIdAndDelete(id).populate("category", "name description");
        });
    }
    updateNote(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return note_model_1.NoteModel.findByIdAndUpdate(id, data, { new: true }).populate("category", "name description");
        });
    }
    exists(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return note_model_1.NoteModel.exists({ _id: id });
        });
    }
}
exports.default = new NoteService();
