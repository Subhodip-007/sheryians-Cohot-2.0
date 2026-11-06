import { Router } from "express";
import { TokenVerify } from "../middlewares/jwtVerifyToken.js";
import { validateNotes } from "../validator/notesValidator.js";
import { createNotesController, getAllNoteController, noteDeleteController } from "../controllers/notes.controller.js";

export const notesRouter = Router();

notesRouter.post("/create",TokenVerify,validateNotes,createNotesController);
notesRouter.delete("/delete/:id",TokenVerify,noteDeleteController);
notesRouter.get("/getAll",TokenVerify,getAllNoteController)

