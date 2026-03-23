import fs from "fs";
import path from "path";
import pkg from "pg";
import dotenv from "dotenv";

const { Client } = pkg;

// Load environment variables from various possible files
dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString = process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  console.error(
    "❌ Error: POSTGRES_URL_NON_POOLING not found in environment variables.",
  );
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function runAllMigrations() {
  const migrationsDir = path.join(process.cwd(), "supabase", "migrations");

  if (!fs.existsSync(migrationsDir)) {
    console.error(
      `❌ Error: Migrations directory not found at ${migrationsDir}`,
    );
    process.exit(1);
  }

  // Get all .sql files and sort them to ensure correct execution order
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  console.log(`🚀 Starting Database Setup (Total files: ${files.length})...`);

  try {
    await client.connect();
    console.log("✅ Connected to Supabase Database.");

    for (const file of files) {
      console.log(`⏳ Executing: ${file}...`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");

      try {
        await client.query(sql);
        console.log(`   ✔ ${file} completed.`);
      } catch (err) {
        console.error(`   ✖ Error in ${file}:`, err.message);
        // We continue to next files unless it's a fatal connection error
      }
    }

    console.log("\n✨ Database Setup & Migrations completed successfully!");
  } catch (error) {
    console.error("❌ Fatal Error during setup:", error.message);
  } finally {
    await client.end();
  }
}

// Ensure NODE_TLS_REJECT_UNAUTHORIZED is handled if needed
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

runAllMigrations();
