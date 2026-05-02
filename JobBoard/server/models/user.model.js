import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 🔐 optional but useful
    role: {
      type: String,
      enum: ["candidate", "employer"],
      default: "candidate",
    },

    // 📸 optional profile image
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;