import { model, Schema } from "mongoose";
import { ICategory } from "../types/category.type";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Category name already exists"],
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
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

export default model<ICategory>("Category", categorySchema);
