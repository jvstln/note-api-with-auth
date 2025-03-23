import express from "express";
import notesRouter from "./note.route";
import categoryRouter from "./category.route";
import userRouter from "./user.route";

const router = express.Router();

// Notes routes
router.use("/notes/", notesRouter);

// Categories routes
router.use("/categories", categoryRouter);

// Users routes
router.use("/users", userRouter);

export default router;
