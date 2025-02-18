const express = require("express")
const router = express.Router();
const ApplicationRoute = require("./ApplicationRoutes")
const internRoute = require("./InternshipRoutes")
const jobRoute = require("./JobRoutes")
const adminRoute = require("./admin")

router.get("/",(req,res)=>{
    res.send("this is backend")
})

router.use("/application",ApplicationRoute)
router.use("/internship",internRoute)
router.use("/job",jobRoute)
router.use("/admin",adminRoute)

module.exports = router;