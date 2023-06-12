const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
    },
    avatar: {
      type: String,
    },
    cv: {
      type: String,
    },
    role:
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Role",
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    confirmPass: {
      type: String,
    },
    resetPass: {
      type: String,
    },
    university: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    nameCompany: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    webAddress: {
      type: String,
      trim: true,
    },
    companyIntro: {
      type: String,
      trim: true,
    },
    quantityEmployees: {
      type: String,
      trim: true,
    },
    job: {
      type: Array,
      required: [true, "Job is required"],
      default: [],
    },
    city: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: "City",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


module.exports = mongoose.model("User", userSchema);
