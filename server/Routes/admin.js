const express = require("express");
const router = express.Router();
const application = require("../Model/Application");
const adminUsername = 'admin';
const adminPassword = 'admin';

// For admin login
router.post("/adminLogin", (req, res) => {
    const { username, password } = req.body;
    
    if (username === adminUsername && password === adminPassword) {
        res.json({
            success: true,
            message: "Admin login successful",
            admin: {
                username: adminUsername,
                isAdmin: true
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid admin credentials"
        });
    }
});

// Get all applications (admin view)
router.get("/applications", async (req, res) => {
    try {
        const data = await application.find();
        res.json(data);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Failed to fetch applications" });
    }
});

module.exports = router;