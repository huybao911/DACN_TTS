const mongoose = require("mongoose");

const JobEvent = new mongoose.Schema(
  {
    nameJob: {
      type: String,
      trim: true,
      required: [true, "NameJob is required"],
    },
    gt: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: "GT",
    },
    city: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: "City",
    },
    poster: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    quantityRemaining: {
      type: Number,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },
    jobDescription: {
      type: String,
      required: true,
      maxLength: [50000, "Must be no more than 50000 characters"],
    },
    jobRequest: {
      type: String,
      required: true,
      maxLength: [50000, "Must be no more than 50000 characters"],
    },
    benefit: {
      type: String,
      required: true,
      maxLength: [50000, "Must be no more than 50000 characters"],
    },
    expirationDate: {
      type: String,
    },
    storagers: [
      {
        storager: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        created: { type: Date, default: Date.now }
      },
    ],
    usersApplyJob: [
      {
        userApply: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        applyStatus: {
          type: String,
          default: "Đã ứng tuyển",
        },
        notiApplyJob: {
          type: String,
          default: "Đã ứng tuyển",
        },
        created: { type: Date, default: Date.now }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobEvent", JobEvent);
