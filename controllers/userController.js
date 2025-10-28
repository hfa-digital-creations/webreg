import User from "../models/userModel.js";
import { Parser } from "json2csv";

// ✅ Register User
const registerUser = async (req, res) => {
  try {
    const { firstName, email, whatsapp, profession, city } = req.body;
    if (!firstName || !email || !whatsapp || !profession || !city)
      return res.status(400).json({ error: "All fields are required" });

    await User.create({ firstName, email, whatsapp, profession, city });
    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get Users (with optional filter)
const getAllUsers = async (req, res) => {
  try {
    const { from, to } = req.query;
    let filter = {};

    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(new Date(to).setHours(23, 59, 59, 999)),
      };
    }

    const users = await User.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Download Filtered Users as CSV
const downloadUsers = async (req, res) => {
  try {
    const { from, to } = req.query;
    let filter = {};

    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(new Date(to).setHours(23, 59, 59, 999)),
      };
    }

    const users = await User.find(filter).lean();

    if (!users.length)
      return res.status(404).send("No users found for the selected range.");

    const fields = ["firstName", "email", "whatsapp", "profession", "city", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment("filtered_users.csv");
    return res.send(csv);
  } catch (err) {
    console.error("Error downloading users:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export default {
  registerUser,
  getAllUsers,
  downloadUsers,
};
