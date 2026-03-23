import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env",
  );
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdminUser() {
  console.log("🚀 Starting Admin Account Sync...");

  const adminEmail = "admin@jpvisualdocs.com";
  const adminPass = "Aem25217";

  // 1. ลองดึงข้อมูล User ที่มีอยู่แล้ว
  const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
  let existingUser = usersData.users.find((u) => u.email === adminEmail);
  let userId = existingUser?.id;

  if (!userId) {
    console.log("➕ Creating new admin user in Auth...");
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPass,
        email_confirm: true,
      });

    if (authError) {
      console.error("❌ Auth Error:", authError.message);
      return;
    }
    userId = authData.user?.id;
  } else {
    console.log(
      "ℹ️ Admin account already exists in Auth. Synchronizing profile...",
    );
  }

  if (userId) {
    // 2. อัปเดตตาราง Profiles (ใช้วิธี Upsert)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: userId,
        email: adminEmail,
        role: "admin",
        subscription_status: "active",
        subscription_end_date: new Date("2099-12-31").toISOString(),
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error("❌ Profile Sync Error:", profileError.message);
      console.log(
        "💡 Tip: มั่นใจว่าคุณได้รัน SQL Migration ในหน้า Supabase SQL Editor แล้ว",
      );
    } else {
      console.log("✅ Admin System Configured Successfully!");
      console.log(`📧 Email: ${adminEmail}`);
      console.log("🛡️ Role: admin (Level 99 Access)");
    }
  }
}

createAdminUser();
