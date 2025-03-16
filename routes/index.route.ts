import express from "express";
import notesRoute from "./note.route";
import categoryRoute from "./category.route";

const router = express.Router();

// Notes routes
router.use("/notes/", notesRoute);

// Categories routes
router.use("/categories", categoryRoute);

export default router;
