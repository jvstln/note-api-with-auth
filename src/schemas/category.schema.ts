import Joi from "joi";
import { type Category } from "../types/category.type";

export const categorySchema: Joi.ObjectSchema<Category> = Joi.object({
  name: Joi.string().required().trim().min(3).max(30),
  description: Joi.string().trim().min(3).max(75),
}).options({ stripUnknown: true });
