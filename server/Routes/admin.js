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

// Get single application details (admin view)
router.get("/application/:id", async (req, res) => {
    try {
        const data = await application.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.json(data);
    } catch (error) {
        console.error("Error fetching application:", error);
        res.status(500).json({ message: "Failed to fetch application details" });
    }
});

// Update application status (admin only)
router.put("/application/:id", async (req, res) => {
    try {
        const { action } = req.body;
        const updatedApplication = await application.findByIdAndUpdate(
            req.params.id,
            { status: action },
            { new: true }
        );
        res.json({ success: true, data: updatedApplication });
    } catch (error) {
        console.error("Error updating application:", error);
        res.status(500).json({ message: "Failed to update application" });
    }
});

module.exports = router;