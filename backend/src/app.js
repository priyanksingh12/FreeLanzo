const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const env = require("./config/env");
const authRoutes = require("./routes/auth.routes");
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

// 404 + error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
