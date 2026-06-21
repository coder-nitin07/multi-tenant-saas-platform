import app from "./app.js";
import pool from "./config/db.js";
import 'dotenv/config';
import { connectRedis } from "./config/redis.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected successfully");

    await connectRedis();
    console.log('Redis connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on PORT ${ PORT }`);
    });

  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
}



startServer();