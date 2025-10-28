
import express from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";
const router = express.Router();

router.get("/getSettings", getSettings);
router.post("/updateSettings", updateSettings);

export default router;
