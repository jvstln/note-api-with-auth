import Joi from "joi";
import { INote } from "../types/note.type";

const schemaObject = {
  title: Joi.string().required().trim().min(3).max(75),
  content: Joi.string().required(),
  author: Joi.string(),
  category: Joi.string(),
};

export const noteSchema: Joi.ObjectSchema<INote> = Joi.object(
  schemaObject
).options({ stripUnknown: true });

export const optionalNoteSchema = noteSchema.fork(
  Object.keys(schemaObject),
  (schema) => schema.optional()
);
