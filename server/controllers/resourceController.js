const Resource = require("../models/Resource");

// CREATE RESOURCE
exports.createResource = async (req, res) => {
  try {
    const { title, link, type } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const filePath = req.file ? req.file.path : null;

    const resource = await Resource.create({
      title,
      link: link || null,
      file: filePath,
      type,
      user: req.user.id,
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Failed to create resource" });
  }
};

// GET ALL
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};

// DELETE
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete resource" });
  }
};