import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  whatsapp: { type: String, required: true },
  profession: { type: String, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
