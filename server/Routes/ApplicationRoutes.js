const express = require("express")
const router = express.Router();
const application = require("../Model/Application")

router.post("/", async(req,res)=>{
    const applicationData = new application({
        coverLetter : req.body.coverLetter,
        user : req.body.user,
        company : req.body.company,
        category : req.body.category,
        body : req.body.body,
        ApplicationId : req.body.ApplicationId
    })
    await applicationData.save().then((data) => {
        res.send(data)
    }).catch((error) => {
        console.log(error, "not able to post data")
    })
})

// Get user's applications only
router.get("/", async(req,res)=>{
    try {
        // Get the user's email from the auth token
        const userEmail = req.headers['user-email']; // We'll send this from frontend
        if (!userEmail) {
            return res.status(401).json({ message: "User email not provided" });
        }

        // Get applications for the authenticated user only
        const data = await application.find({ "user.email": userEmail });
        res.json(data);
    } catch (error) {
        console.error("Error fetching user applications:", error);
        res.status(500).json({ message: "Failed to fetch applications" });
    }
})

router.get("/:id", async(req,res)=>{
    try {
        const data = await application.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({error:"Internal server error "})
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;

    let status;

    if (action === "accepted") {
        status = "accepted";
    } else if (action === "rejected") {
        status = "rejected";
    } else {
        res.status(400).json({ error: "Invalid action" });
        return; 
    }

    try {
        const updateApplication = await application.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );

        if (!updateApplication) {
            res.status(404).json({ error: "Not able to update the application" });
            return; 
        }

        res.status(200).json({ success: true, data: updateApplication });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router