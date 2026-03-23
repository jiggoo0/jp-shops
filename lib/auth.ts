import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// NextAuth v5 (Auth.js) Configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!, // ใช้ Service Role เพื่อให้เขียนข้อมูล Session ได้
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      // ระบบ Credentials สำหรับเคส Login ปกติ (หรือ Bypass สำหรับการทดสอบ)
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // ตรวจสอบรหัสผ่านที่กำหนดไว้
        if (password !== "Aem25217") return null;

        if (email === "admin@jpvisualdocs.com") {
          return {
            id: "00000000-0000-0000-0000-000000000001",
            email: "admin@jpvisualdocs.com",
            name: "Master Admin",
            role: "admin",
          };
        }

        if (email === "Partner@jpvisualdocs.com") {
          return {
            id: "00000000-0000-0000-0000-000000000002",
            email: "Partner@jpvisualdocs.com",
            name: "Official Partner",
            role: "partner",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // เพิ่มข้อมูล Profile จากตาราง profiles ลงใน session
      if (session.user) {
        session.user.id = user.id;
        // ในระบบจริง จะมีการ Query เพิ่มเพื่อดู Role และ Status
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database", // เก็บ Session ในฐานข้อมูล Supabase ตามมาตรฐานความปลอดภัย
  },
});
