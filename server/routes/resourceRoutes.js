const express = require("express");
const router = express.Router();

// auth middleware
const auth = require("../middleware/authMiddleware");
const resourceController = require("../controllers/resourceController");

// create resource
router.post("/", auth, resourceController.createResource);

// get all resources
router.get("/", auth, resourceController.getResources);

// delete resource
router.delete("/:id", auth, resourceController.deleteResource);

module.exports = router;
