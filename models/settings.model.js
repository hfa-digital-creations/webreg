import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  whatsappLink: { type: String },
  webinarDate: { type: String },   // e.g. "2025-10-31"
  webinarTime: { type: String },   // e.g. "07:00 PM"
});

export default mongoose.model("Settings", settingsSchema);
