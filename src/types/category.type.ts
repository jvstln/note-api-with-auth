import { Schema } from "mongoose";
import { type NoteBody } from "./note.type";

export interface Category {
  name: string;
  description?: string;
  notes?: Schema.Types.ObjectId[] | NoteBody[];
}
