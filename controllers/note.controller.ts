import { Request, Response } from "express";
import { handleError, HTTPError } from "../utils";
import NoteService from "../services/note.service";
import CategoryService from "../services/category.service";

class NoteController {
  async getNotes(req: Request, res: Response) {
    try {
      const allNotes = await NoteService.getNotes();
      res.json({
        success: true,
        message: "Notes retrieved successfully",
        data: allNotes,
      });
    } catch (error) {
      handleError(res, error, "Error getting all notes");
    }
  }
  async getNotesByCategory(req: Request, res: Response) {
    try {
      const allNotes = await NoteService.getNotes({
        category: req.params.categoryId,
      });
      res.json({
        success: true,
        message: "Categorized notes retrieved successfully",
        data: allNotes,
      });
    } catch (error) {
      handleError(res, error, "Error getting all notes");
    }
  }

  async getNote(req: Request, res: Response) {
    try {
      const note = await NoteService.getNote(req.params.noteId);
      if (!note) throw new HTTPError(404, "Note not found");

      res.json({
        success: true,
        message: "Note retrieved successfully",
        data: note,
      });
    } catch (error) {
      handleError(res, error, "Error getting note details");
    }
  }

  async createNote(req: Request, res: Response) {
    try {
      const newNote = await NoteService.createNote(req.body);

      res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: newNote,
      });
    } catch (error) {
      handleError(res, error, "Error creating note");
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const deletedNote = await NoteService.deleteNote(req.params.noteId);
      res.json({
        success: true,
        message: "Note deleted successfully",
        data: deletedNote,
      });
    } catch (error) {
      handleError(res, error, "Error deleting note");
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const updatedNote = await NoteService.updateNote(
        req.params.noteId,
        req.body
      );
      res.json({
        success: true,
        message: "Note updated successfully",
        data: updatedNote,
      });
    } catch (error) {
      handleError(res, error, "Error updating note details");
    }
  }

  async validateNoteExistence(req: Request, res: Response, next: Function) {
    try {
      if (!req.params.noteId) throw new HTTPError(400, "Note id is required");
      if (req.params.noteId.length !== 24) {
        throw new HTTPError(400, "Invalid note id");
      }

      const note = await NoteService.exists(req.params.noteId);
      if (!note) throw new HTTPError(404, "Note not found");
      next();
    } catch (error) {
      handleError(res, error, "Error validating note existence");
    }
  }

  async validateAndTransformCategory(
    req: Request,
    res: Response,
    next: Function
  ) {
    if ("category" in req.body && req.method !== "DELETE") {
      const category = await CategoryService.getCategoryByName(
        req.body.category
      );

      if (!category) {
        res.status(404).json({
          success: false,
          message: `Category "${req.body.category}" does not exist. You need to create a category first`,
        });
        return;
      }

      req.body.category = category._id;
    }

    next();
  }
}

export default new NoteController();
