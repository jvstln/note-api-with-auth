import express from "express";
import notesRoute from "./note.route";

const router = express.Router();

// Notes routes
router.use("/notes/", notesRoute);

export default router;
