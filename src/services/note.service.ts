import NoteModel from "../models/note.model";
import { INote } from "../types/note.type";

class NoteService {
  async getNotes(filter = {}, projection = {}) {
    return NoteModel.find(filter, projection).populate(
      "category",
      "name description"
    );
  }

  async getNote(id: string) {
    return NoteModel.findById(id).populate("category", "name description");
  }

  async createNote(data: INote) {
    return (await NoteModel.create(data)).populate(
      "category",
      "name description"
    );
  }

  async deleteNote(id: string) {
    return NoteModel.findByIdAndDelete(id).populate(
      "category",
      "name description"
    );
  }

  async updateNote(id: string, data: Partial<INote>) {
    return NoteModel.findByIdAndUpdate(id, data, { new: true }).populate(
      "category",
      "name description"
    );
  }

  async exists(id: string) {
    return NoteModel.exists({ _id: id });
  }
}

export default new NoteService();
