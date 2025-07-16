import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortcode: { type: String, unique: true },
  expiry: Date,
  createdAt: { type: Date, default: Date.now },
  clickCount: { type: Number, default: 0 }
});

export default mongoose.model("Url", urlSchema);