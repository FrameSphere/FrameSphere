-- Add service_id column to api_keys table
ALTER TABLE api_keys 
ADD COLUMN IF NOT EXISTS service_id UUID REFERENCES api_services(id) ON DELETE CASCADE;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_service_id ON api_keys(service_id);

-- Add connected_account_id to link with connected accounts
ALTER TABLE api_keys
ADD COLUMN IF NOT EXISTS connected_account_id UUID REFERENCES connected_accounts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_api_keys_connected_account_id ON api_keys(connected_account_id);

-- Update existing api_keys to have default service (optional)
-- This is just for migration purposes if you have existing data
