import { Request, Response } from "express";
import { handleError, handleSuccess, HTTPError } from "./utils";
import Note from "./note.model";

export default class NoteController {
  async getNotes(req: Request, res: Response) {
    try {
      const allNotes = await Note.find();
      handleSuccess(res, "Notes retrieved successful", allNotes);
    } catch (error) {
      handleError(res, error, "Error getting all notes");
    }
  }

  async getNote(req: Request, res: Response) {
    try {
      if (req.params.id.length !== 24) throw new HTTPError(400, "Invalid ID");

      const note = await Note.findById(req.params.id);
      if (!note) throw new HTTPError(404, "Note not found");

      handleSuccess(res, "Note details retrieved successfully", note);
    } catch (error) {
      handleError(res, error, "Error getting note details");
    }
  }

  async createNote(req: Request, res: Response) {
    try {
      const newNote = await Note.create(req.body);
      handleSuccess(res, "Note created successfully", newNote);
    } catch (error) {
      handleError(res, error, "Error creating note");
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      if (req.params.id.length !== 24) throw new HTTPError(400, "Invalid ID");

      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      handleSuccess(res, "Note deleted successfully", deletedNote);
    } catch (error) {
      handleError(res, error, "Error deleting note");
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      if (req.params.id.length !== 24) throw new HTTPError(400, "Invalid ID");

      const oldNote = await Note.findByIdAndUpdate(req.params.id, req.body);
      if (!oldNote) throw new HTTPError(404, "Note not found");

      const updatedNote = await Note.findById(req.params.id);
      handleSuccess(res, "Note updated successfully", updatedNote);
    } catch (error) {
      handleError(res, error, "Error updating note details");
    }
  }
}
