const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // your multer file
const resourceController = require("../controllers/resourceController");

router.post(
  "/",
  auth,
  upload.single("file"),
  resourceController.createResource
);

router.get("/", auth, resourceController.getResources);

router.delete("/:id", auth, resourceController.deleteResource);

module.exports = router;