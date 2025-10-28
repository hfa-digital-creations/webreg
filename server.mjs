import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import settingsRoutes from "./routes/settings.routes.js";
import courseBookingRoutes from "./routes/courseBookingRoutes.js";

// Import models
import Settings from "./models/settings.model.js";
import User from "./models/userModel.js";

// Environment setup
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS setup (allow all origins and preflight requests)
app.use(
  cors({
    origin: "*", // or restrict to your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors()); // ✅ Handle all preflight (OPTIONS) requests

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api", courseBookingRoutes);

// ✅ WhatsApp link route
app.get("/api/whatsapp-link", async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json({ link: settings?.whatsappLink || "" });
  } catch (error) {
    console.error("❌ Error fetching WhatsApp link:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ CSV Download route (Filtered by From & To Dates)
app.get("/api/download", async (req, res) => {
  try {
    const { from, to } = req.query;
    let filter = {};

    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const users = await User.find(filter);

    const csvHeader = "Name,Email,WhatsApp,Profession,City,Registered\n";
    const csvData = users
      .map(
        (u) =>
          `${u.firstName},${u.email},${u.whatsapp},${u.profession},${u.city},${new Date(
            u.createdAt
          ).toLocaleString()}`
      )
      .join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");
    res.send(csvHeader + csvData);
  } catch (error) {
    console.error("❌ Error generating CSV:", error);
    res.status(500).send("Error generating CSV");
  }
});

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is healthy 🚀" });
});

// ✅ Serve frontend for both development and production
const frontendPath = path.join(process.cwd(), "../webinar-frontend/dist");
app.use(express.static(frontendPath));

// ✅ Express 5-compatible wildcard route for SPA
app.get("/:path(*)", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
