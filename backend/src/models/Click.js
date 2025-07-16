import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  shortcode: String,
  referrer: String,
  ip: String,
  location: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Click", clickSchema);
