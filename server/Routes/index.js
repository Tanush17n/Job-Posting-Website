const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth");
const ApplicationRoute = require("./ApplicationRoutes")
const internRoute = require("./InternshipRoutes")
const jobRoute = require("./JobRoutes")
const adminRoute = require("./admin")
const authRoute = require("./auth")

router.get("/",(req,res)=>{
    res.send("this is backend")
})

// Auth routes (public)
router.use("/auth", authRoute)

// Public routes
router.use("/internship", internRoute)
router.use("/job", jobRoute)
router.use("/admin", adminRoute)  // Removed auth middleware

// Protected routes
router.use("/application", auth, ApplicationRoute)

module.exports = router;