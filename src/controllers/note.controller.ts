import { Request, Response } from "express";
import { HTTPError } from "../utils/errors";
import NoteService from "../services/note.service";
import CategoryService from "../services/category.service";

class NoteController {
  async getNotes(req: Request, res: Response) {
    const allNotes = await NoteService.getNotes({ author: req.user?._id });
    res.json({
      success: true,
      message: "Notes retrieved successfully",
      data: allNotes,
    });
  }

  async getNotesByCategory(req: Request, res: Response) {
    const allNotes = await NoteService.getNotes({
      author: req.user?._id,
      category: req.params.categoryId,
    });
    res.json({
      success: true,
      message: "Categorized notes retrieved successfully",
      data: allNotes,
    });
  }

  async getNote(req: Request, res: Response) {
    const note = await NoteService.getNote(req.params.noteId);

    res.json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  }

  async createNote(req: Request, res: Response) {
    if (!req.user) throw new HTTPError(401, "Unauthorized user");

    const notePayload = { ...req.body, author: req.user._id };

    const newNote = await NoteService.createNote(notePayload);
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote,
    });
  }

  async deleteNote(req: Request, res: Response) {
    const deletedNote = await NoteService.deleteNote(req.params.noteId);
    res.json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  }

  async updateNote(req: Request, res: Response) {
    const updatedNote = await NoteService.updateNote(
      req.params.noteId,
      req.body
    );
    res.json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  }

  async validateNoteExistence(req: Request, res: Response, next: Function) {
    if (!req.params.noteId) throw new HTTPError(400, "Note id is required");
    if (req.params.noteId.length !== 24) {
      throw new HTTPError(400, "Invalid note id");
    }

    const note = await NoteService.getNote(req.params.noteId);
    if (!note) throw new HTTPError(404, "Note not found");

    if (
      !note ||
      !note.author ||
      note.author._id.toString() !== req.user?._id.toString()
    ) {
      throw new HTTPError(
        401,
        "Unauthorized! Note does not belong to current user"
      );
    }

    next();
  }

  async validateAndTransformCategory(
    req: Request,
    res: Response,
    next: Function
  ) {
    if (req.body && "category" in req.body) {
      const category = await CategoryService.getCategoryByName(
        req.body.category
      );

      if (!category) {
        throw new HTTPError(
          404,
          `Category "${req.body.category}" does not exist. You need to create a category first`
        );
      }

      req.body.category = category._id;
    }

    next();
  }
}

export default new NoteController();
