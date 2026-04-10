-- OAuth Migration for FrameSphere
-- Run this in Supabase SQL Editor

-- Make password_hash nullable (OAuth users have no password)
ALTER TABLE users
  ALTER COLUMN password_hash DROP NOT NULL;

-- Add OAuth columns
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(50),
  ADD COLUMN IF NOT EXISTS oauth_provider_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);

-- Unique constraint: one provider account per user
CREATE UNIQUE INDEX IF NOT EXISTS users_oauth_unique
  ON users (oauth_provider, oauth_provider_id)
  WHERE oauth_provider IS NOT NULL AND oauth_provider_id IS NOT NULL;
