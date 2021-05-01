const { Job, UserRole, User } = require("../../models");
const asyncHandler = require("express-async-handler");

const getMyAppliedJobs = asyncHandler(async (req, res) => {
  const appliedJobs = await UserRole.findAll({
    where: {
      userId: res.locals.user.id,
    },
    required: true,
    include: [
      {
        model: Job,
        as: "job",
        required: true,
        include: "user",
      },
    ],
  });
  return res.json(appliedJobs);
});

const getJobAppliedUsers = asyncHandler(async (req, res) => {
  const { uuid } = req.params;
  const job = await Job.findOne({
    where: {
      uuid,
    },
  });
  const jobUsers = await UserRole.findAll({
    where: {
      jobId: job.id,
    },
    include: "user",
  });
  return res.json({ job, jobUsers });
});

const applyJob = asyncHandler(async (req, res) => {
  const { jobUUIDs } = req.body;
  const errors = [];

  for (let index = 0; index < jobUUIDs.length; index++) {
    const uuid = jobUUIDs[index];
    const job = await Job.findOne({
      where: {
        uuid,
      },
    });
    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }
    const jobRole = await UserRole.findOne({
      where: {
        userId: res.locals.user.id,
        jobId: job.id,
      },
    });
    if (jobRole) {
      errors.push({ uuid, message: "Already applied" });
    } else {
      await UserRole.create({
        userId: res.locals.user.id,
        jobId: job.id,
      });
    }
  }

  if (errors.length > 0) {
    return res
      .status(200)
      .json({ message: "Job Applied, opt out duplicate job apply" });
  }
  return res.status(201).json({ message: "Job Applied" });
});

module.exports = {
  applyJob,
  getMyAppliedJobs,
  getJobAppliedUsers,
};
