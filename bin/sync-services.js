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

// Mock service data based on lib/config/plans.ts (Since we can't easily import TS in a raw JS bin script)
const servicesToSync = [
  {
    id: "doc_verification",
    name: "AI Document Verification",
    price: 150,
    description: "ตรวจสอบความถูกต้องของเอกสารด้วยระบบ AI ขั้นสูง",
  },
  {
    id: "ai_assistant",
    name: "AI Strategy Consultant",
    price: 50,
    description: "ปรึกษาวางแผนการจัดเตรียมเอกสารกับ AI",
  },
  {
    id: "loan",
    name: "Credit Profile Analysis",
    price: 2500,
    description: "ที่ปรึกษาสินเชื่อและวิเคราะห์โอกาสกู้ผ่าน",
  },
  {
    id: "travel",
    name: "Global E-Booking Set",
    price: 2900,
    description: "ชุดจองตั๋วเครื่องบินและโรงแรม (Verified Only)",
  },
  {
    id: "visa",
    name: "Full-Scale Visa Protocol",
    price: 4500,
    description: "ชุดเอกสารยื่นวีซ่าแบบครบวงจร (Full Set)",
  },
  {
    id: "specialist",
    name: "Expert Specialist Document",
    price: 2500,
    description: "จัดทำเอกสารเฉพาะทางแบบเร่งด่วน",
  },
  {
    id: "vifily",
    name: "Vifily Digital Trust Cert",
    price: 1900,
    description: "ใบรับรองความน่าเชื่อถือดิจิทัล (Global Trust)",
  },
  {
    id: "premium-card",
    name: "Physical Luxury Card",
    price: 5500,
    description: "ผลิตบัตรจริงเกรดพรีเมียม (Metal/PVC Hard)",
  },
];

async function syncServices() {
  try {
    await client.connect();
    console.log("🔄 Starting Services Synchronization...");

    for (const service of servicesToSync) {
      console.log(`⏳ Upserting service: ${service.id}...`);
      await client.query(
        `
        INSERT INTO services (id, name, price, description)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          price = EXCLUDED.price,
          description = EXCLUDED.description;
      `,
        [service.id, service.name, service.price, service.description],
      );
    }

    console.log(
      "\n✅ All 8 services have been synchronized with the database!",
    );
  } catch (error) {
    console.error("❌ Sync Error:", error.message);
  } finally {
    await client.end();
  }
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
syncServices();
