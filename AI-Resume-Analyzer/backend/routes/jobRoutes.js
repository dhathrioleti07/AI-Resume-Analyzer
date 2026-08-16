const router = require("express").Router();
const { getJobs, getRecommendations } = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/recommendations", getRecommendations);

module.exports = router;
