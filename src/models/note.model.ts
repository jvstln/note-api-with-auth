import { model, Schema } from "mongoose";
import { ICategory } from "./category.model";

export interface INote {
  title: string;
  content: string;
  author?: string;
  category?: ICategory | string;
}

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 75,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export const NoteModel = model<INote>("Note", noteSchema);
