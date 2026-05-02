// routes/application.routes.js

import express from "express";
import { applyToJob, getApplicants, getMyApplications, updateApplicantStatus } from "../controllers/application.controller.js";
import { isAuthenticated } from "../middleware/isAuth.js";
 import upload  from "../middleware/upload.js";

const applicationRouter = express.Router();

applicationRouter.post(
  "/apply/:jobId",
  isAuthenticated,
  upload.single("resume"),
  applyToJob
);

applicationRouter.get("/:id",getApplicants);

applicationRouter.get("/",isAuthenticated,getMyApplications);
applicationRouter.put(
  "/:jobId/applicants/:applicantId",
  isAuthenticated,
  updateApplicantStatus
);

// applicationRouter.get("/all",isAuthenticated,getAllApplicants);

export default applicationRouter;