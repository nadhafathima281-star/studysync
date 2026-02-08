const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // user question
    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    // ai response
    response: {
      type: String,
      required: true,
    },

    // optional uploaded file (image/pdf/etc)
    file: {
      type: String, // store file URL or filename
      default: null,
    },

    // ai model used
    model: {
      type: String,
      default: "gemini-2.5-flash",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AiChat", aiChatSchema);