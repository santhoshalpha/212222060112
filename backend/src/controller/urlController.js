import Url from "../models/Url.js";
import Click from "../models/Click.js";
import { generateShortcode } from "../utils/shortcodeGenerator.js";
import { logEvent } from "../middleware/logger.js";

export const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    let code = shortcode || generateShortcode();
    const existing = await Url.findOne({ shortcode: code });
    if (existing) return res.status(400).json({ error: "Shortcode already exists" });

    const expiry = new Date(Date.now() + validity * 60000);
    const short = new Url({ originalUrl: url, shortcode: code, expiry });
    await short.save();

    await logEvent("backend", "info", "controller", "Created new short URL", token);
    res.status(201).json({
      shortLink: `http://localhost:${process.env.PORT}/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    await logEvent("backend", "error", "controller", err.message, token);
    res.status(500).json({ error: "Server Error" });
  }
};
