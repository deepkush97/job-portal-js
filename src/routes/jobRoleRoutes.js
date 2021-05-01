const express = require("express");
const router = express.Router();
const {
  applyJob,
  getJobAppliedUsers,
  getMyAppliedJobs,
} = require("../controllers/jobRoleController");
const { protect, recruiter, user } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(protect, user, getMyAppliedJobs)
  .post(protect, user, applyJob);
router.route("/:uuid").get(protect, recruiter, getJobAppliedUsers);

module.exports = router;
