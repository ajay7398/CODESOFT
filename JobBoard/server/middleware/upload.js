import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
   secure: true,
});

// upload.js
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const cleanName = file.originalname.split(".")[0];
    return {
      folder: "resumes",
      resource_type: "auto",
      public_id: Date.now() + "-" + cleanName,
      format: "pdf",
      type: "upload",        // ← add this — makes it publicly accessible
      access_mode: "public", // ← add this
    };
  },
});

const upload = multer({ storage });

export default upload;
