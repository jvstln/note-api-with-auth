import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Don't return the password by default
  },
  name: {
    type: String,
    required: true,
  },
});

userSchema.virtual("notes", {
  ref: "Note",
  localField: "_id",
  foreignField: "author",
});

export default model("User", userSchema);
