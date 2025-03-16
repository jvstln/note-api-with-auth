"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
categorySchema.virtual("noteCount", {
    ref: "Note",
    localField: "_id",
    foreignField: "category",
    count: true,
});
exports.CategoryModel = (0, mongoose_1.model)("Category", categorySchema);
