import mongoose from "mongoose";

const courseBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  course: { type: String, required: true },
  learn_mode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CourseBooking", courseBookingSchema);
