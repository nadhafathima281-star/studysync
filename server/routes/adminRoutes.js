const express=require("express");
const router=express.Router();

// middlewares
const protect=require("../middleware/authMiddleware");
const adminOnly=require("../middleware/adminMiddleware");

// controller
const{getAdminStats}=require("../controllers/adminController");

// admin dashboard statistics
router.get("/stats",protect,adminOnly,getAdminStats);

module.exports=router;