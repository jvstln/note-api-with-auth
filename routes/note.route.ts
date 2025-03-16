import express from "express";
import NoteController from "../controllers/note.controller";

const router = express.Router();

// Param middleware to validate note existence if id exists
router.param("id", NoteController.validateNoteExistence);

router.get("/", NoteController.getNotes);
router.get("/:id", NoteController.getNote);
router.post("/", NoteController.createNote);
router.delete("/:id", NoteController.deleteNote);
router.patch("/:id", NoteController.updateNote);

export default router;
