const express = require("express")
const router = express.Router();
const Job = require("../Model/Job")
const jobData = require("../Data/JobsDataAvl");

// router.post("/", async(req,res)=>{
//     const InternshipData = new internship({
//         title : req.body.title,
//         company : req.body.company,
//         location : req.body.location,
//         Duration : req.body.Duration,
//         category : req.body.category,
//         aboutCompany : req.body.aboutCompany,
//         aboutInternship : req.body.aboutInternship,
//         Whocanapply : req.body.Whocanapply,
//         perks : req.body.perks,
//         AdditionalInfo : req.body.AdditionalInfo,
//         stipend : req.body.stipend,
//         StartDate :req.body.StartDate,
//     })
//     await InternshipData.save(internData).then((data) => {
//         res.send(data)
//     }).catch((error) => {
//         console.log(error, "not able to post data")
//     })
// })

router.post("/", async (req,res) => {
    try {
        const jobs = jobData;

        const savedJobs = [];

        for (const JData of jobs ) {
            const newJob = new Job(JData);
            const savedJob = await newJob.save();
            savedJobs.push(savedJob);
        }

        res.send(savedJobs)
    }

    catch(error){
        console.log("error while posting data", error);
        res.status(500).send("Internsal Server Error")
    }
})

module.exports = router