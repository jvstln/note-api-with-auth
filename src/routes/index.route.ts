import express from "express";
import notesRouter from "./note.route";
import categoryRouter from "./category.route";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import { handleAuthentication } from "../middleware/auth.middleware";

const router = express.Router();

const protectedRoutes = ["/notes", "/categories", "/users"];
router.use(protectedRoutes, handleAuthentication);

// Notes routes
router.use("/notes/", notesRouter);

// Categories routes
router.use("/categories", categoryRouter);

// Users routes
router.use("/users", userRouter);

// Auth routes
router.use("/auth", authRouter);

export default router;
