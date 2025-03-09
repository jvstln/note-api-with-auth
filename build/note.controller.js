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
const utils_1 = require("./utils");
class NoteController {
    getNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json([{ title: "Default", content: "OK" }]);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                res.json([{ title: "Default", content: "OK" }]);
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                this.handleError(error, res);
            }
        });
    }
    handleError(error, res) {
        const errorCode = error instanceof utils_1.HTTPError ? error.code : 500;
        const message = error instanceof Error ? error.message : error;
        res.status(errorCode).json({
            message,
            success: false,
        });
    }
}
exports.default = NoteController;
