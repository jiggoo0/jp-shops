import pkg from "pg";
import dotenv from "dotenv";

const { Client } = pkg;
dotenv.config({ path: ".env.local" });
dotenv.config();

const connectionString = process.env.POSTGRES_URL_NON_POOLING;

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function checkDatabase() {
  try {
    await client.connect();
    console.log("🔍 --- Database Status Report --- 🔍\n");

    // 1. ตรวจสอบตารางทั้งหมด
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log("📋 ตารางทั้งหมดในระบบ:");
    console.table(tables.rows);

    // 2. ตรวจสอบข้อมูลในตาราง users (NextAuth)
    const usersCount = await client.query("SELECT count(*) FROM users;");
    console.log(`👤 จำนวนผู้ใช้งาน (Users): ${usersCount.rows[0].count}`);

    // 3. ตรวจสอบรายการบริการ (Services)
    const services = await client.query(
      "SELECT id, name, price FROM services;",
    );
    console.log("\n🛠️ บริการที่มีในระบบ (Services):");
    console.table(services.rows);

    // 4. ตรวจสอบรายการชำระเงินล่าสุด (Recent Payments)
    const payments = await client.query(`
      SELECT amount, status, payment_type, target_id, created_at 
      FROM payments 
      ORDER BY created_at DESC 
      LIMIT 5;
    `);
    console.log("\n💰 รายการชำระเงินล่าสุด (Last 5 Payments):");
    if (payments.rows.length > 0) {
      console.table(payments.rows);
    } else {
      console.log("   (ยังไม่มีข้อมูลการชำระเงิน)");
    }
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการดึงข้อมูล:", error.message);
  } finally {
    await client.end();
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
checkDatabase();
