// models/application.model.js

import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String, // store file URL or path
      required:true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ❗ Prevent duplicate apply
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

const Application= mongoose.model("Application", applicationSchema);

export default Application;