-- Add missing columns to api_keys table

-- Add service_id column
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS service_id UUID REFERENCES api_services(id);

-- Add connected_account_id column  
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS connected_account_id UUID REFERENCES connected_accounts(id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_api_keys_service_id ON api_keys(service_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_connected_account_id ON api_keys(connected_account_id);
