const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const jobRoleRoutes = require("./routes/jobRoleRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is working");
});
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/jobroles", jobRoleRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`
  )
);
