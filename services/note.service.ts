import { NoteModel, type INote } from "../models/note.model";

class NoteService {
  async getNotes(filter = {}, projector = {}) {
    return NoteModel.find(filter, projector);
  }

  async getNote(id: string) {
    return NoteModel.findById(id);
  }

  async createNote(data: INote) {
    return NoteModel.create(data);
  }

  async deleteNote(id: string) {
    return NoteModel.findByIdAndDelete(id);
  }

  async updateNote(id: string, data: Partial<INote>) {
    return NoteModel.findByIdAndUpdate(id, data, { new: true });
  }

  async exists(id: string) {
    return NoteModel.exists({ _id: id });
  }
}

export default new NoteService();
