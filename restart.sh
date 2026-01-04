#!/bin/bash

# Complete Restart - Fixes all issues

echo "🔄 Complete Restart"
echo "==================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Stop everything
echo "1️⃣  Stopping all processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null
pkill -f "node.*vite" 2>/dev/null
pkill -f "node.*nodemon" 2>/dev/null
sleep 2
echo -e "${GREEN}✅ Stopped${NC}"
echo ""

# 2. Clear caches
echo "2️⃣  Clearing caches..."
cd frontend
rm -rf node_modules/.vite 2>/dev/null
rm -rf dist 2>/dev/null
cd ..

cd backend
rm -rf node_modules/.cache 2>/dev/null
cd ..

rm -f backend.log frontend.log
echo -e "${GREEN}✅ Caches cleared${NC}"
echo ""

# 3. Check PostgreSQL
echo "3️⃣  Checking PostgreSQL..."
if pg_isready -q 2>/dev/null; then
    echo -e "${GREEN}✅ PostgreSQL running${NC}"
else
    echo -e "${YELLOW}⚠️  Starting PostgreSQL...${NC}"
    brew services start postgresql@14 2>/dev/null || brew services start postgresql
    sleep 3
fi
echo ""

# 4. Start Backend
echo "4️⃣  Starting Backend..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..
sleep 3

# Check backend
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend ready (PID: $BACKEND_PID)${NC}"
else
    echo "❌ Backend failed!"
    tail -20 backend.log
    exit 1
fi
echo ""

# 5. Start Frontend
echo "5️⃣  Starting Frontend..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
sleep 3

# Check frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend ready (PID: $FRONTEND_PID)${NC}"
else
    echo "❌ Frontend failed!"
    tail -20 frontend.log
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "✨ FrameSphere is running!"
echo "=========================="
echo ""
echo "🌐 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"
echo ""
echo "🔑 Demo Login:"
echo "  demo@framesphere.dev / demo123456"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Show logs
tail -f backend.log frontend.log 2>/dev/null
