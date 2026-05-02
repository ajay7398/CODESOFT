// controllers/application.controller.js
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/user.model.js"

export const applyToJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    if (req.user.role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can apply for jobs",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.status === "closed") {
      return res.status(400).json({ message: "Job is closed" });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied",
      });
    }

    const resume = req.file?.path;

    if (!resume) {
      return res.status(400).json({
        message: "Resume is required",
      });
    }

    // ✅ create application
    const application = await Application.create({
      job: jobId,
      candidate: userId,
      resume,
    });

    // ✅ push candidate into job
    await Job.findByIdAndUpdate(jobId, {
      $addToSet: { applicants: userId },
    });

// after creating application

const candidate = await User.findById(userId);
const employer = await User.findById(job.createdBy);

// 📧 Email to candidate
await sendEmail(
  candidate.email,
  "Application Submitted",
  `You applied for ${job.title} at ${job.company}`
);

// 📧 Email to employer
await sendEmail(
  employer.email,
  "New Applicant",
  `${candidate.name} applied for ${job.title}`
);

    res.status(201).json({
      message: "Applied successfully",
      application,
    });

  } catch (error) {
    console.log("Apply Error:", error);
    res.status(500).json({
      message: "Server error while applying",
    });
  }
};


// GET /api/application/my

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    })
      .populate("job");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};


export const getApplicants = async (req, res) => {
  try {
    const { id } = req.params; // jobId

    const applications = await Application.find({ job: id })
      .populate("candidate", "name email")
      .populate("job", "title");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// export const getAllApplicants = async (req, res) => {
//   try {
//    // 1. get jobs
//    const {id}=req.user;
// const jobs = await Job.find({ createdBy: id });

// // 2. get jobIds
// const jobIds = jobs.map(j => j._id);

// // 3. count applications
// const totalApplicants = await Application.countDocuments({
//   job: { $in: jobIds }
// });

// console.log(totalApplicants)
//     res.status(200).json({totalApplicants});

//   } catch (error) {
//     res.status(500).json({ message: `Server error ${error}` });
//   }
// };


export const updateApplicantStatus = async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // ✅ 1. Validate status
    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // ✅ 2. Check job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // ✅ 3. Only employer who created job can update
    if (job.createdBy.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // ✅ 4. Find application
  const application = await Application.findOne({
  _id: applicantId,
  job: jobId,
}).populate("candidate", "name email")
  .populate("job", "title");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // ✅ 5. Update status
    application.status = status;
    await application.save();

     // 📧 Notify candidate
  await sendEmail(
    application.candidate.email,
    "Application Update",
    `Your application for ${application.job.title} is ${status}`
  );

    // ✅ 6. Response
    res.status(200).json({
      message: "Status updated successfully",
      application,
    });

  } catch (error) {
    console.log("Update Status Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};