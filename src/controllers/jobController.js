const { Job, UserRole } = require("../../models");
const asyncHandler = require("express-async-handler");

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.findAll({
    attributes: ["uuid", "title", "description"],
    include: "user",
    order: [["createdAt", "DESC"]],
    raw: true,
  });
  const appliedJobs = await UserRole.findAll({
    where: {
      userId: res.locals.user.id,
    },
    include: "job",
    raw: true,
  });
  const listOfAppliedIds = appliedJobs.map(
    (appliedJob) => appliedJob["job.uuid"]
  );
  const remainingJobs = jobs.reduce((acc, job) => {
    if (!listOfAppliedIds.includes(job.uuid)) {
      acc.push({
        uuid: job.uuid,
        title: job.title,
        description: job.description,
        user: {
          name: job["user.name"],
        },
      });
    }
    return acc;
  }, []);
  return res.json(remainingJobs);
});

const createJob = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const job = await Job.create({
    title,
    description,
    createdBy: res.locals.user.id,
  });
  return res.json(job);
});

const getMyCreatedJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.findAll({
    where: {
      createdBy: res.locals.user.id,
    },
    order: [["createdAt", "DESC"]],
  });
  res.json(jobs);
});

module.exports = {
  getAllJobs,
  createJob,
  getMyCreatedJobs,
};
