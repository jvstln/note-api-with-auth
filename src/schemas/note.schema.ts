import Joi from "joi";
import { type NoteBody } from "../types/note.type";

const schemaObject = {
  title: Joi.string().required().trim().min(3).max(75),
  content: Joi.string().required(),
  category: Joi.string(),
};

export const noteSchema: Joi.ObjectSchema<NoteBody> = Joi.object(
  schemaObject
).options({ stripUnknown: true });

export const optionalNoteSchema = noteSchema.fork(
  Object.keys(schemaObject),
  (schema) => schema.optional()
);
