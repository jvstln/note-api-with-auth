import NoteModel from "../models/note.model";
import { type NoteBody } from "../types/note.type";

class NoteService {
  async getNotes(filter = {}, projection = {}) {
    return NoteModel.find(filter, projection)
      .populate("category", "name description")
      .populate("author");
  }

  async getNote(id: string) {
    return NoteModel.findById(id)
      .populate("category", "name description")
      .populate("author");
  }

  async createNote(data: NoteBody) {
    const createdNote = await NoteModel.create(data);
    return this.getNote(createdNote._id.toString());
  }

  async deleteNote(id: string) {
    return NoteModel.findByIdAndDelete(id)
      .populate("category", "name description")
      .populate("author");
  }

  async updateNote(id: string, data: Partial<NoteBody>) {
    return NoteModel.findByIdAndUpdate(id, data, { new: true })
      .populate("category", "name description")
      .populate("author");
  }

  async exists(id: string) {
    return NoteModel.exists({ _id: id });
  }
}

export default new NoteService();
