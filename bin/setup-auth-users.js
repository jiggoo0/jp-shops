import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key");
  process.exit(1);
}

const adminAuthClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupUsers() {
  const users = [
    {
      email: "admin@jpvisualdocs.com",
      password: "Aem25217",
      name: "Master Admin",
      role: "admin",
    },
    {
      email: "Partner@jpvisualdocs.com",
      password: "Aem25217",
      name: "Official Partner",
      role: "partner",
    },
  ];

  for (const u of users) {
    console.log(`Setting up ${u.email}...`);

    // Check if user exists
    const { data: existingUsers, error: listError } =
      await adminAuthClient.auth.admin.listUsers();
    if (listError) {
      console.error(listError);
      continue;
    }

    const existing = existingUsers.users.find((user) => user.email === u.email);
    let userId;

    if (existing) {
      console.log(
        `User ${u.email} already exists in auth.users. Updating password...`,
      );
      await adminAuthClient.auth.admin.updateUserById(existing.id, {
        password: u.password,
      });
      userId = existing.id;
    } else {
      const { data, error } = await adminAuthClient.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { full_name: u.name },
      });
      if (error) {
        console.error(`Error creating ${u.email}:`, error.message);
        continue;
      }
      userId = data.user.id;
      console.log(`Created ${u.email} in auth.users with ID: ${userId}`);
    }

    // Now upsert into public.users to ensure the ID matches!
    const { error: dbError } = await adminAuthClient.from("users").upsert(
      {
        id: userId,
        email: u.email,
        name: u.name,
        full_name: u.name,
        role: u.role,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (dbError) {
      console.error(
        `Error inserting into public.users for ${u.email}:`,
        dbError.message,
      );
    } else {
      console.log(`Successfully synced ${u.email} to public.users!`);
    }
  }
}

setupUsers();
