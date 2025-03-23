import { Schema } from "mongoose";
import { INote } from "./note.type";

export interface ICategory {
  name: string;
  description?: string;
  notes?: Schema.Types.ObjectId[] | INote[];
}
