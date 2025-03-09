"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
const note_controller_1 = __importDefault(require("./note.controller"));
// Get environmental variables
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL || "";
const app = (0, express_1.default)();
// Middlewares
// app.use(express.json());
// Notes route
const note = new note_controller_1.default();
app.get("/api/notes", note.getNotes);
app.get("/api/notes/:id", note.getNote);
app.post("/api/notes", note.createNote);
app.delete("/api/notes/:id", note.deleteNote);
app.patch("/api/notes/:id", note.updateNote);
// Connect to database and then, start the server
(0, utils_1.connectToDatabase)(DATABASE_URL)
    .then(() => {
    app.listen(PORT, () => console.log(`Listening at ${PORT}`));
})
    .catch((error) => console.log("Error connecting to database", error));
