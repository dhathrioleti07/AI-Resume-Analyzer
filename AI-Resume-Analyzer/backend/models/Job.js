const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    salary: String,
    experience: String,
    category: String,
    skills: [String],
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
