import { model, Schema } from "mongoose";

export interface INote {
  title: string;
  content: string;
  author?: string;
}

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const NoteModel = model<INote>("Note", noteSchema);
