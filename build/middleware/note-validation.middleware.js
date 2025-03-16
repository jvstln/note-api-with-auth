"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialNote = exports.validateNote = void 0;
const errors_1 = require("../utils/errors");
const validateNote = (req, res, next) => {
    const { title } = req.body;
    try {
        if (!title)
            throw new errors_1.HTTPError(400, "Title is required");
        if (title.length < 3 || title.length > 75) {
            throw new errors_1.HTTPError(400, "Title should be between 2 and 75 characters");
        }
        next();
    }
    catch (error) {
        (0, errors_1.handleError)(res, error, "Error validating note");
    }
};
exports.validateNote = validateNote;
const validatePartialNote = (req, res, next) => {
    const { title } = req.body;
    try {
        if (title !== undefined && (title.length < 3 || title.length > 75)) {
            throw new errors_1.HTTPError(400, "Title should be between 2 and 75 characters");
        }
        next();
    }
    catch (error) {
        (0, errors_1.handleError)(res, error, "Error validating note");
    }
};
exports.validatePartialNote = validatePartialNote;
