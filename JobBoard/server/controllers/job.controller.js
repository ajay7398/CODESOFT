
import Job from "../models/job.model.js";


// 🔥 CREATE JOB
export const createJob = async (req, res) => {
  try {
    const user = req.user;
    
    // ✅ Only employer can create job
    if (user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }

    const {
      title,
      description,
      company,
      location,
      type,
      salary,
      skills,
      deadline,
    } = req.body;

    // ✅ Basic validation
    if (!title || !description || !company || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const job = await Job.create({
      title,
      description,
      company,
      location,
      type,
      salary,
      skills,
      deadline,
      createdBy: user.id,
    });

    res.status(201).json({ message: "Job created", job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



// 🔥 UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ Only owner can update
    if (job.createdBy.toString() !== user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "Job updated", job: updatedJob });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



// 🔥 DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ Only owner can delete
    if (job.createdBy.toString() !== user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL JOBS

export const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      type,
      page = 1,
      limit = 10,
      sort = "latest",
    } = req.query;

    // 🔍 Build query
    let query = {};

    // 🔎 Search (title + company)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // 📍 Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 💼 Filter by job type
    if (type) {
      query.type = type;
    }

    // 📊 Sorting
    let sortOption = {};
    if (sort === "latest") sortOption.createdAt = -1;
    if (sort === "oldest") sortOption.createdAt = 1;

    // 📄 Pagination
    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

     const totalJobs = await Job.countDocuments(query);
    

    res.status(200).json({
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET JOB DETAILS

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 Find job
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });

  } catch (error) {
    console.log(error);

    // ⚠️ Invalid Mongo ID case
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
};