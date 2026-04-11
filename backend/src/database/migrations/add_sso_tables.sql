-- FrameSphere SSO Migration
-- Run this in Supabase SQL Editor

-- SSO auth codes (short-lived, one-time use)
CREATE TABLE IF NOT EXISTS sso_codes (
  code        TEXT PRIMARY KEY,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id   TEXT NOT NULL,        -- 'frametrain', 'framespell', etc.
  expires_at  TIMESTAMP NOT NULL,
  used        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast cleanup of expired codes
CREATE INDEX IF NOT EXISTS sso_codes_expires_at ON sso_codes (expires_at);

-- Records which FrameSphere user is linked to which product user
CREATE TABLE IF NOT EXISTS connected_products (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  framesphere_user_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product               TEXT NOT NULL,   -- 'frametrain'
  product_user_id       TEXT,            -- cuid from FrameTrain DB
  connected_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (framesphere_user_id, product)
);
