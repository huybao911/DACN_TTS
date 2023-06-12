const mongoose = require("mongoose");

const gtSchema = new mongoose.Schema(
  {
    nameGT: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "nameGT is required"],
    },
   
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("GT", gtSchema);
