#!/bin/bash

# API Key Management Setup Script
# This script sets up the new API Key Management system with service integration

echo "🚀 FrameSphere API Key Management Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from the FrameSphere/backend directory"
    exit 1
fi

echo -e "${YELLOW}📦 Step 1: Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🗄️  Step 2: Running database migration...${NC}"
echo "This will add service_id and connected_account_id to api_keys table"
echo ""

# Get database credentials from .env
if [ -f ".env" ]; then
    source .env
else
    echo -e "${YELLOW}⚠️  .env file not found, using default values${NC}"
    DB_USER="framesphere_user"
    DB_NAME="framesphere"
fi

# Run migration
psql -U $DB_USER -d $DB_NAME -f src/database/migrations/add_service_to_api_keys.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database migration completed${NC}"
else
    echo -e "${RED}❌ Database migration failed${NC}"
    echo "Please run the migration manually:"
    echo "psql -U $DB_USER -d $DB_NAME -f src/database/migrations/add_service_to_api_keys.sql"
fi

echo ""
echo -e "${GREEN}✨ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo "1. Configure service endpoints in src/services/externalServiceClient.js"
echo "2. Ensure external services (FrameSpell, CoreChain, SphereNet) are running"
echo "3. Implement required API endpoints on external services:"
echo "   - GET /health"
echo "   - POST /api/auth/verify"
echo "   - POST /api/keys"
echo "   - DELETE /api/keys/:id"
echo ""
echo "4. Start the backend server:"
echo "   npm run dev"
echo ""
echo "5. Start the frontend (in another terminal):"
echo "   cd ../frontend && npm run dev"
echo ""
echo -e "${BLUE}📚 For detailed documentation, see: API_KEY_SETUP.md${NC}"
echo ""
