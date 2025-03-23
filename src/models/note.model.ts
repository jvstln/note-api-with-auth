import { model, Schema } from "mongoose";
import { INote } from "../types/note.type";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 75,
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

export default model<INote>("Note", noteSchema);
