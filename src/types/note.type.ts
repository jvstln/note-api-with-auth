import { Category } from "./category.type";
import { User } from "./user.type";

export interface NoteBody {
  title: string;
  content: string;
  category?: string;
}

export interface Note extends Omit<NoteBody, "category"> {
  author?: User;
  category?: Category;
}
