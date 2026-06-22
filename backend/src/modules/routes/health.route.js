import express from "express";
import pool from "../../config/db.js";
import { redisClient } from "../../config/redis.js";
const healthRouter = express.Router();

healthRouter.get("/health", async (req, res) => {
  const healthcheck = {
    server: "OK",
    postgres: "DOWN",
    redis: "DOWN",
  };

  // PostgreSQL check
  try {
    await pool.query("SELECT 1");
    healthcheck.postgres = "OK";
  } catch (err) {
    healthcheck.postgres = "DOWN";
  }

  // Redis check
  try {
    await redisClient.ping();
    healthcheck.redis = "OK";
  } catch (err) {
    healthcheck.redis = "DOWN";
  }

  const isHealthy =
    healthcheck.postgres === "OK" &&
    healthcheck.redis === "OK";

  return res.status(isHealthy ? 200 : 500).json(healthcheck);
});

export default healthRouter;