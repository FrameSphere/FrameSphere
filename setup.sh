#!/bin/bash

# FrameSphere Setup Script
# This script sets up the complete FrameSphere development environment

echo "🚀 FrameSphere Setup"
echo "===================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠️  PostgreSQL not detected. Please install PostgreSQL 14+${NC}"
    echo "   macOS: brew install postgresql@14"
    echo "   Ubuntu: sudo apt install postgresql"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL detected${NC}"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit backend/.env with your database credentials${NC}"
fi

echo "Installing backend dependencies..."
npm install

echo ""
echo "🗄️  Database Setup"
echo "=================="
read -p "Do you want to run database migrations now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run db:migrate
    echo ""
    read -p "Do you want to seed the database with demo data? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run db:seed
        echo ""
        echo -e "${GREEN}✅ Database seeded successfully!${NC}"
        echo ""
        echo "📝 Demo Login Credentials:"
        echo "   Email: demo@framesphere.dev"
        echo "   Password: demo123456"
        echo ""
    fi
fi

cd ..

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo "🚀 To start the development servers:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend && npm run dev"
echo ""
echo "📚 Or use Docker:"
echo "  docker-compose up"
echo ""
echo "🌐 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo "  API Docs: http://localhost:5000/api"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
