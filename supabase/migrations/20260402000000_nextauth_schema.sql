-- NextAuth v5 (Auth.js) Standard Schema for Supabase Adapter
-- Description: ตารางสำหรับจัดการการเข้าสู่ระบบผ่าน NextAuth เชื่อมต่อกับ Supabase

-- 1. Create Users Table (Link with auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE,
  email_verified TIMESTAMPTZ,
  image TEXT,
  role TEXT DEFAULT 'partner', -- 'admin', 'partner'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Accounts Table (For OAuth providers like Google)
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  providerAccountId TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  oauth_token_secret TEXT,
  oauth_token TEXT,
  
  UNIQUE(provider, providerAccountId)
);

-- 3. Create Sessions Table (For database-based sessions)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sessionToken TEXT UNIQUE NOT NULL,
  userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

-- 4. Create Verification Tokens Table
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  
  PRIMARY KEY (identifier, token)
);

-- 5. Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- 6. Access Policies
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Accounts are private" ON accounts FOR ALL USING (auth.uid() = userId);
CREATE POLICY "Sessions are private" ON sessions FOR ALL USING (auth.uid() = userId);

-- 7. Seed Data (Optional Admin Setup)
-- INSERT INTO users (email, role) VALUES ('admin@jp-visual.docs', 'admin') ON CONFLICT (email) DO NOTHING;
