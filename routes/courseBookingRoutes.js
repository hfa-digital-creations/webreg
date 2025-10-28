// import express from "express";
// import {
//   createCourseBooking,
//   getAllCourseBookings,
// } from "../controllers/courseBookingController.js";

// const router = express.Router();

// // POST: Create a booking
// router.post("/book-course", createCourseBooking);

// // GET: Fetch all bookings
// router.get("/bookings", getAllCourseBookings);

// export default router;


import express from "express";
import { createCourseBooking, getAllBookings } from "../controllers/courseBookingController.js";

const router = express.Router();

router.post("/book-course", createCourseBooking);
router.get("/bookings", getAllBookings);

export default router;
