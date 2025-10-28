import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ✅ Create admin manually (for setup only)
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashedPassword });
    res.status(201).json({ message: "Admin created successfully ✅" });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.json({ success: false, message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Server error" });
  }
};
