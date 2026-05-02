import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    // 🔹 JOB DETAILS
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Remote"],
      default: "Full-time",
    },

    salary: {
      type: String, // keep flexible (e.g. "5-10 LPA")
    },

    skills: [
      {
        type: String,
      },
    ],

    // 🔹 EMPLOYER INFO
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 APPLICATIONS
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // 🔹 STATUS
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    // 🔹 OPTIONAL
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Job= mongoose.model("Job", jobSchema);

export default Job;