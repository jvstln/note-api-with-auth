import { model, Schema } from "mongoose";
import { INote } from "./note.model";

export interface ICategory {
  name: string;
  description?: string;
  notes?: Schema.Types.ObjectId[] | INote[];
}

const categorySchema = new Schema(
  {
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

export const CategoryModel = model<ICategory>("Category", categorySchema);
