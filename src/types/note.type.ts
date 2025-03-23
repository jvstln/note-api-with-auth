import { ICategory } from "./category.type";

export interface INote {
  title: string;
  content: string;
  author?: string;
  category?: ICategory | string;
}
