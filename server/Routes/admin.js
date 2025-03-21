const express = require("express");
const router = express.Router();
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

module.exports = router;