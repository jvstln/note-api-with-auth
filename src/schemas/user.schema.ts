import Joi from "joi";

const schemaObject = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
};

export const userSchema = Joi.object(schemaObject);
export const optionalUserSchema = userSchema.fork(
  Object.keys(schemaObject),
  (schema) => schema.optional()
);
