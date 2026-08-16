const router = require("express").Router();
const multer = require("multer");
const { analyzeUploadedResume, history } = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF resumes are supported."));
  }
});

router.post("/analyze", upload.single("resume"), analyzeUploadedResume);
router.get("/history", authMiddleware, history);

module.exports = router;
