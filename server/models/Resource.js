const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
    },
    file: {
      type: String, // file path (e.g. uploads/123-file.pdf)
    },
    type: {
      type: String,
      enum: ["video", "article", "pdf", "course", "other"],
      default: "other",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);