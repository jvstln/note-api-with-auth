import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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

const Note = model("Note", noteSchema);
export default Note;
