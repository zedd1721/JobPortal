const { captureRejectionSymbol } = require("events");
const Job = require("../models/job");

const createJobPost = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const {
      companyName,
      jobTitle,
      description,
      location,
      salary,
      logoUrl,
      duration,
      locationType,
      information,
      jobType,
      skills,
    } = req.body;

    if (
      !companyName ||
      !jobTitle ||
      !description ||
      !location ||
      !salary ||
      !logoUrl ||
      !duration ||
      !locationType ||
      !information ||
      !jobType ||
      !skills
    ) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const jobDetails = new Job({
      companyName,
      jobTitle,
      description,
      location,
      salary,
      logoUrl,
      duration,
      locationType,
      information,
      jobType,
      skills,
      refUserId: currentUserId,
    });

    await jobDetails.save();

    res.status(201).json({ message: "Job Posted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getJobDetailsbyId = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ message: "Bad request" });
    }
    const jobDetails = await Job.findById(jobId);

    if (!jobDetails) return res.status(404).json({ message: " No Job Found " });

    res.json({ jobDetails });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateJobDetailsbyId = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const {
        companyName,
        jobTitle,
        description,
        location,
        salary,
        logoUrl,
        duration,
        locationType,
        information,
        jobType,
        skills,
      } = req.body;
  
      if (
        !companyName ||
        !jobTitle ||
        !description ||
        !location ||
        !salary ||
        !logoUrl ||
        !duration ||
        !locationType ||
        !information ||
        !jobType ||
        !skills
      ) {
        return res.status(400).json({ message: "Bad Request" });
      }

    if (!jobId) return res.status(404).json({ message: "Bad request" });

    const isjobExists = await Job.findOne({ _id: jobId });
    if (!isjobExists)
      return res.status(404).json({ message: "Job does not exist" });

      await Job.updateOne({ _id: jobId }, {
        $set:{
            companyName,
            jobTitle,
            description,
            location,
            salary,
            logoUrl,
            duration,
            locationType,
            information,
            jobType,
            skills,
          },
        }
      )

      res.status(200).json({ message: "Job Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllJobs = async(req, res) => {
    try{
        const jobList = await Job.find({});
        res.status(200).json({ jobList });

    }catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
  createJobPost,
  getJobDetailsbyId,
  updateJobDetailsbyId,
  getAllJobs,
};
