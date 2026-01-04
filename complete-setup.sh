#!/bin/bash

# Complete Reset and Setup Script for FrameSphere

echo "🔧 FrameSphere Complete Setup & Fix"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Cleanup
echo "1️⃣  Cleaning up processes and ports..."
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null
lsof -ti:5001 2>/dev/null | xargs kill -9 2>/dev/null
rm -f backend.log frontend.log
echo -e "${GREEN}✅ Cleanup complete${NC}"
echo ""

# Step 2: Check PostgreSQL
echo "2️⃣  Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL not installed${NC}"
    echo "Install with: brew install postgresql@14"
    exit 1
fi

if ! pg_isready -q 2>/dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL not running. Starting...${NC}"
    brew services start postgresql@14 2>/dev/null || brew services start postgresql
    sleep 3
fi

if pg_isready -q 2>/dev/null; then
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
else
    echo -e "${RED}❌ Cannot start PostgreSQL${NC}"
    exit 1
fi
echo ""

# Step 3: Setup Database
echo "3️⃣  Setting up database..."

# Get current user for psql
PSQL_USER=$(psql -l 2>/dev/null | head -1 | awk '{print $1}')
if [ -z "$PSQL_USER" ]; then
    PSQL_USER="postgres"
fi

# Database credentials
DB_NAME="framesphere"
DB_USER="framesphere_user"
DB_PASS="framesphere_password"

# Create database and user
psql postgres << EOF 2>/dev/null
DROP DATABASE IF EXISTS $DB_NAME;
CREATE DATABASE $DB_NAME;

DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$DB_USER') THEN
        CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';
    END IF;
END
\$\$;

GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
\c $DB_NAME
GRANT ALL ON SCHEMA public TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database created${NC}"
else
    echo -e "${RED}❌ Database creation failed${NC}"
    echo "Trying alternative method..."
    
    psql -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null
    psql -d postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null
    psql -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null
fi
echo ""

# Step 4: Update .env file
echo "4️⃣  Updating configuration..."
cd backend

if [ -f ".env" ]; then
    cp .env .env.backup 2>/dev/null
fi

# Generate random JWT secret
JWT_SECRET=$(openssl rand -base64 32 2>/dev/null || cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

cat > .env << EOF
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASS
DB_NAME=$DB_NAME

# JWT Secret
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# API Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOF

echo -e "${GREEN}✅ Configuration updated${NC}"
cd ..
echo ""

# Step 5: Install dependencies (if needed)
echo "5️⃣  Checking dependencies..."

cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install --silent
fi
cd ..

cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install --silent
fi
cd ..

echo -e "${GREEN}✅ Dependencies OK${NC}"
echo ""

# Step 6: Run migrations
echo "6️⃣  Running database migrations..."
cd backend
npm run db:migrate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations complete${NC}"
else
    echo -e "${RED}❌ Migrations failed${NC}"
    cd ..
    exit 1
fi
cd ..
echo ""

# Step 7: Seed database
echo "7️⃣  Seeding database..."
read -p "Seed database with demo data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cd backend
    npm run db:seed
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database seeded${NC}"
    fi
    cd ..
fi
echo ""

# Step 8: Final check
echo "8️⃣  Running final checks..."

# Test backend
cd backend
if node -e "
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
client.connect().then(() => { client.end(); process.exit(0); }).catch(() => process.exit(1));
" 2>/dev/null; then
    echo -e "${GREEN}✅ Database connection works${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    cd ..
    exit 1
fi
cd ..

echo ""
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo -e "${BLUE}📊 Database Info:${NC}"
echo "  Name:     $DB_NAME"
echo "  User:     $DB_USER"
echo "  Password: $DB_PASS"
echo ""
echo -e "${BLUE}🔑 Demo Login:${NC}"
echo "  Email:    demo@framesphere.dev"
echo "  Password: demo123456"
echo ""
echo -e "${GREEN}🚀 Start the application with:${NC}"
echo "   ./start.sh"
echo ""
