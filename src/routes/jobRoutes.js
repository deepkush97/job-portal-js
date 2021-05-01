const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  createJob,
  getMyCreatedJobs,
} = require("../controllers/jobController");
const { protect, recruiter } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getAllJobs).post(protect, recruiter, createJob);
router.route("/my").get(protect, recruiter, getMyCreatedJobs);

module.exports = router;
