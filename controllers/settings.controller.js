import Settings from "../models/settings.model.js";

// ✅ Get Settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || {});
  } catch (err) {
    console.error("❌ Error fetching settings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Settings
export const updateSettings = async (req, res) => {
  try {
    const { whatsappLink, webinarDate, webinarTime } = req.body;

    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { $set: { whatsappLink, webinarDate, webinarTime } },
      { upsert: true, new: true }
    );

    res.status(200).json(updatedSettings);
  } catch (error) {
    console.error("❌ Error updating settings:", error);
    res.status(500).json({ message: "Server error while updating settings" });
  }
};
