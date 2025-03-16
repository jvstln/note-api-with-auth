import express from "express";
import NoteController from "../controllers/note.controller";
import categoryContoller from "../controllers/category.contoller";
import {
  validateNote,
  validatePartialNote,
} from "../middleware/note-validation.middleware";

const router = express.Router();

// Param middleware to validate note existence if id exists
router.param("noteId", NoteController.validateNoteExistence);
// Middleware to validate and transform category from name to _id
router.use(NoteController.validateAndTransformCategory);

router.get("/", NoteController.getNotes);
router.get("/:noteId", NoteController.getNote);
router.post("/", validateNote, NoteController.createNote);
router.delete("/:noteId", NoteController.deleteNote);
router.patch("/:noteId", validatePartialNote, NoteController.updateNote);

// The correct method for updating is patch.. But am leaving it here for task legacy reasons
router.put("/:noteId", validatePartialNote, NoteController.updateNote);

router.get(
  "/categories/:categoryId",
  categoryContoller.validateCategoryExistence,
  NoteController.getNotesByCategory
);

export default router;
