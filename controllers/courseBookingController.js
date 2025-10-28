// import CourseBooking from "../models/courseBookingModel.js";
// import nodemailer from "nodemailer";

// // ✅ Create new booking
// export const createCourseBooking = async (req, res) => {
//   try {
//     const { name, email, mobile, course, learn_mode } = req.body;

//     const newBooking = new CourseBooking({
//       name,
//       email,
//       mobile,
//       course,
//       learn_mode,
//       createdAt: new Date(),
//     });

//     await newBooking.save();

//     // ✅ Send confirmation mail
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "hfadigitalacademy@gmail.com",
//         pass: "YOUR_APP_PASSWORD", // use App Password, not your Gmail password
//       },
//     });

//     const mailOptions = {
//       from: "hfadigitalacademy@gmail.com",
//       to: "hfadigitalacademy@gmail.com",
//       subject: `🎓 New Course Booking - ${course}`,
//       text: `
// New course booking received!

// 👤 Name: ${name}
// 📧 Email: ${email}
// 📞 Mobile: ${mobile}
// 📚 Course: ${course}
// 🧑‍💻 Learn Mode: ${learn_mode}
// ⏰ Date: ${new Date().toLocaleString()}
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(201).json({ message: "Booking saved and mail sent successfully!" });
//   } catch (error) {
//     console.error("Booking Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Get all bookings
// export const getAllCourseBookings = async (req, res) => {
//   try {
//     const bookings = await CourseBooking.find().sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     res.status(500).json({ message: "Error fetching bookings" });
//   }
// };

import CourseBooking from "../models/courseBookingModel.js";

// ✅ Create new booking
export const createCourseBooking = async (req, res) => {
  try {
    const { name, email, mobile, course, learn_mode } = req.body;

    const newBooking = new CourseBooking({
      name,
      email,
      mobile,
      course,
      learn_mode,
      createdAt: new Date(),
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking saved successfully!" });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Fetch all bookings for admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await CourseBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
