const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const env = require("./config/env");
const authRoutes = require("./routes/auth.routes");
const onboardingRoutes = require("./routes/onboarding.routes");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");
const workerRoutes = require("./routes/worker.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const reviewRoutes = require("./routes/review.routes");
const { notFound, errorHandler } = require("./middlewares/error.middleware");

const app = express();

// Security headers
app.use(helmet());

// CORS — must allow credentials so the refresh-token cookie can be sent
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (!env.isProd) {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "FreeLanzo API is running" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/onboarding", onboardingRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/workers", workerRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/reviews", reviewRoutes);
// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
