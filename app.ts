import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils";
import NoteController from "./note.controller";

// Get environmental variables
dotenv.config();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || "";

const app = express();

// Middlewares
// app.use(express.json());

// Notes route
const note = new NoteController();
app.get("/api/notes", note.getNotes);
app.get("/api/notes/:id", note.getNote);
app.post("/api/notes", note.createNote);
app.delete("/api/notes/:id", note.deleteNote);
app.patch("/api/notes/:id", note.updateNote);

// Connect to database and then, start the server
connectToDatabase(DATABASE_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening at ${PORT}`));
  })
  .catch((error) => console.log("Error connecting to database", error));
