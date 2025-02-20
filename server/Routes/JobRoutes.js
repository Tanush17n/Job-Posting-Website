const express = require("express")
const router = express.Router();
const Job = require("../Model/Job")
// const jobData = require("../Data/JobsDataAvl");

router.post("/", async(req,res)=>{
    const JobData = new Job({
        title : req.body.title,
        company : req.body.company,
        location : req.body.location,
        Experience : req.body.Experience,
        category : req.body.category,
        aboutCompany : req.body.aboutCompany,
        aboutJob : req.body.aboutJob,
        Whocanapply : req.body.Whocanapply,
        perks : req.body.perks,
        numberOfopning : req.body.numberOfopning,
        AdditionalInfo : req.body.AdditionalInfo,
        CTC : req.body.CTC,
        StartDate :req.body.StartDate,
    })
    await JobData.save().then((data) => {
        res.send(data)
    }).catch((error) => {
        console.log(error, "not able to post data")
    })
})

// router.post("/", async (req,res) => {
//     try {
//         const jobs = jobData;

//         const savedJobs = [];

//         for (const JData of jobs ) {
//             const newJob = new Job(JData);
//             const savedJob = await newJob.save();
//             savedJobs.push(savedJob);
//         }

//         res.send(savedJobs)
//     }

//     catch(error){
//         console.log("error while posting data", error);
//         res.status(500).send("Internsal Server Error")
//     }
// })

router.get("/",async (req,res)=>{
    try {
        const data=await Job.find();
        res.json(data) .status(200)
    } catch (error) {
        console.log(error);
        res.status(404).json({error:"Internal server error "})
    }
})

router.get("/:id", async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await Job.findById(id);
        if (!data) {

             res.status(404).json({error:"Job not found "})
        }
        res.json(data).status(200)
    } catch (error) {
        console.log(error);
        res.status(404).json({error:"Internal server error "})
    }
})


module.exports = router