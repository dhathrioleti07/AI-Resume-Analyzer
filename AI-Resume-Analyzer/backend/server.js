require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Resume Analyzer API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/jobs", jobRoutes);

app.use((err, req, res, next) => {
  if (err.message?.includes("Only PDF")) {
    return res
      .status(400)
      .json({ message: "Please upload a PDF resume." });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .json({ message: "Resume file must be smaller than 5 MB." });
  }

  console.error(err);

  res.status(500).json({
    message: "Something went wrong on the server.",
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(
    `AI Resume Analyzer API running on http://localhost:${PORT}`
  );
});