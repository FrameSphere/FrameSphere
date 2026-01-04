#!/bin/bash

# PostgreSQL Setup for FrameSphere
# This script sets up PostgreSQL database

echo "🗄️  PostgreSQL Setup for FrameSphere"
echo "====================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not installed${NC}"
    echo ""
    echo "Install with:"
    echo "  brew install postgresql@14"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL is installed${NC}"

# Check if PostgreSQL is running
if ! pg_isready -q 2>/dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL is not running${NC}"
    echo ""
    echo "Starting PostgreSQL..."
    
    if command -v brew &> /dev/null; then
        brew services start postgresql@14 2>/dev/null || brew services start postgresql
        echo "Waiting for PostgreSQL to start..."
        sleep 3
    else
        echo "Please start PostgreSQL manually"
        exit 1
    fi
fi

if pg_isready -q 2>/dev/null; then
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
else
    echo -e "${RED}❌ PostgreSQL failed to start${NC}"
    exit 1
fi

echo ""

# Database credentials
DB_NAME="framesphere"
DB_USER="framesphere_user"
DB_PASS="framesphere_password"

echo "📝 Database Configuration:"
echo "  Name:     $DB_NAME"
echo "  User:     $DB_USER"
echo "  Password: $DB_PASS"
echo ""

# Try to connect as postgres user (default)
if psql postgres -c '\q' 2>/dev/null; then
    PSQL_USER="postgres"
elif psql -U $(whoami) postgres -c '\q' 2>/dev/null; then
    PSQL_USER=$(whoami)
else
    echo -e "${RED}❌ Cannot connect to PostgreSQL${NC}"
    echo ""
    echo "Try:"
    echo "  psql postgres"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Connected as user: $PSQL_USER${NC}"
echo ""

# Create database
echo "Creating database..."
psql -U $PSQL_USER postgres << EOF
-- Drop existing database if exists
DROP DATABASE IF EXISTS $DB_NAME;

-- Create database
CREATE DATABASE $DB_NAME;

-- Create user if not exists
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = '$DB_USER') THEN
        CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';
    END IF;
END
\$\$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Connect to database and grant schema privileges
\c $DB_NAME
GRANT ALL ON SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database created successfully!${NC}"
else
    echo -e "${RED}❌ Database creation failed${NC}"
    exit 1
fi

echo ""

# Update .env file
ENV_FILE="backend/.env"

if [ -f "$ENV_FILE" ]; then
    echo "Updating .env file..."
    
    # Backup original
    cp $ENV_FILE ${ENV_FILE}.backup
    
    # Update credentials
    sed -i '' "s/DB_USER=.*/DB_USER=$DB_USER/" $ENV_FILE
    sed -i '' "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" $ENV_FILE
    sed -i '' "s/DB_NAME=.*/DB_NAME=$DB_NAME/" $ENV_FILE
    
    # Generate random JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    sed -i '' "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" $ENV_FILE
    
    echo -e "${GREEN}✅ .env file updated${NC}"
    echo ""
    echo "Backup saved to: ${ENV_FILE}.backup"
fi

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. Run migrations:"
echo "   cd backend && npm run db:migrate"
echo ""
echo "2. Seed database (optional):"
echo "   cd backend && npm run db:seed"
echo ""
echo "3. Start the application:"
echo "   ./start.sh"
echo ""
echo -e "${GREEN}✨ PostgreSQL setup complete!${NC}"
