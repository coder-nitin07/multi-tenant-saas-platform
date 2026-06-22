import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config"; // Ensures your env variables are loaded before client init

// Create the PostgreSQL pool connection string
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Pass the adapter directly into PrismaClient
const prisma = new PrismaClient({ adapter });

export default prisma;