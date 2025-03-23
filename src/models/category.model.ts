import { model, Schema } from "mongoose";
import { type Category } from "../types/category.type";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Category name already exists"],
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 75,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual("noteCount", {
  ref: "Note",
  localField: "_id",
  foreignField: "category",
  count: true,
});

export default model<Category>("Category", categorySchema);
