#!/bin/bash

# FrameSphere Start Script - Port 5001 (macOS compatible)
# Starts Backend and Frontend with proper cleanup

echo "🚀 Starting FrameSphere..."
echo "=========================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    
    # Kill background processes
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    
    # Kill any remaining processes on ports
    lsof -ti:3001 | xargs kill -9 2>/dev/null
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    
    echo -e "${GREEN}✅ Servers stopped${NC}"
    exit 0
}

trap cleanup INT TERM

# Kill any existing processes on the ports
echo "🧹 Cleaning up existing processes..."
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 1

# Check if PostgreSQL is running
echo "🔍 Checking PostgreSQL..."
if ! pg_isready -q 2>/dev/null; then
    echo -e "${RED}❌ PostgreSQL is not running!${NC}"
    echo ""
    echo "Starting PostgreSQL..."
    
    if command -v brew &> /dev/null; then
        brew services start postgresql@14 2>/dev/null || brew services start postgresql 2>/dev/null
        echo -e "${YELLOW}⏳ Waiting for PostgreSQL to start...${NC}"
        sleep 3
        
        if pg_isready -q 2>/dev/null; then
            echo -e "${GREEN}✅ PostgreSQL started successfully!${NC}"
        else
            echo -e "${RED}❌ Failed to start PostgreSQL${NC}"
            echo ""
            echo "Please run: ./complete-setup.sh"
            exit 1
        fi
    else
        echo -e "${RED}❌ Cannot start PostgreSQL automatically${NC}"
        echo "Please start PostgreSQL manually and run ./complete-setup.sh"
        exit 1
    fi
else
    echo -e "${GREEN}✅ PostgreSQL is running${NC}"
fi

echo ""

# Check backend .env
cd backend
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from template...${NC}"
    cp .env.example .env
    # Update PORT to 3001
    sed -i '' 's/PORT=5000/PORT=3001/' .env
    echo -e "${RED}❌ Please run ./complete-setup.sh first!${NC}"
    exit 1
fi

# Ensure PORT is 3001 in .env
if ! grep -q "PORT=3001" .env; then
    sed -i '' 's/PORT=.*/PORT=3001/' .env
fi

# Test database connection
echo "🗄️  Testing database connection..."
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

client.connect()
  .then(() => {
    console.log('Connection OK');
    client.end();
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    process.exit(1);
  });
" 2>/dev/null; then
    echo -e "${GREEN}✅ Database connection OK${NC}"
else
    echo -e "${RED}❌ Cannot connect to database${NC}"
    echo ""
    echo "Please run: ./complete-setup.sh"
    echo ""
    cd ..
    exit 1
fi

cd ..
echo ""

# Start Backend
echo "🔧 Starting Backend on port 3001..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo -e "${YELLOW}⏳ Waiting for backend to initialize...${NC}"
sleep 3

# Check if backend is responding
for i in {1..10}; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is ready (PID: $BACKEND_PID)${NC}"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Backend failed to start${NC}"
        echo "Check backend.log for errors:"
        echo ""
        tail -20 backend.log
        cleanup
        exit 1
    fi
    sleep 1
done

echo ""

# Start Frontend
echo "🎨 Starting Frontend on port 3000..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
echo -e "${YELLOW}⏳ Waiting for frontend to initialize...${NC}"
sleep 3

# Check if frontend is responding
for i in {1..10}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend is ready (PID: $FRONTEND_PID)${NC}"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Frontend failed to start${NC}"
        echo "Check frontend.log for errors:"
        echo ""
        tail -20 frontend.log
        cleanup
        exit 1
    fi
    sleep 1
done

echo ""
echo "✨ FrameSphere is running!"
echo "=========================="
echo ""
echo -e "${BLUE}🌐 URLs:${NC}"
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:3001"
echo "  Health:    http://localhost:3001/health"
echo ""
echo -e "${BLUE}🔑 Demo Login:${NC}"
echo "  Email:     demo@framesphere.dev"
echo "  Password:  demo123456"
echo ""
echo -e "${BLUE}📝 Logs:${NC}"
echo "  Backend:   tail -f backend.log"
echo "  Frontend:  tail -f frontend.log"
echo ""
echo -e "${GREEN}✅ Everything is ready! Open http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Keep script running and show combined logs
tail -f backend.log frontend.log 2>/dev/null
