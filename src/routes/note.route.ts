import express from "express";
import NoteController from "../controllers/note.controller";
import categoryContoller from "../controllers/category.contoller";
import { createValidationMiddleware } from "../middleware/validation.middleware";
import { noteSchema, optionalNoteSchema } from "../schemas/note.schema";

const noteRouter = express.Router();

// Param middleware to validate note existence if id exists
noteRouter.param("noteId", NoteController.validateNoteExistence);

noteRouter.get("/", NoteController.getNotes);
noteRouter.get("/:noteId", NoteController.getNote);
noteRouter.post(
  "/",
  createValidationMiddleware(noteSchema),
  NoteController.validateAndTransformCategory,
  NoteController.createNote
);
noteRouter.delete("/:noteId", NoteController.deleteNote);
noteRouter.patch(
  "/:noteId",

  createValidationMiddleware(optionalNoteSchema),
  NoteController.validateAndTransformCategory,
  NoteController.updateNote
);

// The correct method for updating is patch.. But am leaving it here for task legacy reasons
noteRouter.put(
  "/:noteId",
  createValidationMiddleware(optionalNoteSchema),
  NoteController.validateAndTransformCategory,
  NoteController.updateNote
);

noteRouter.get(
  "/categories/:categoryId",
  categoryContoller.validateCategoryExistence,
  NoteController.getNotesByCategory
);

export default noteRouter;
