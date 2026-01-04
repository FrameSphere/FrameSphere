#!/bin/bash

# Quick CSS Fix for FrameSphere

echo "🎨 Fixing CSS issues..."

cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere

# Stop everything first
echo "Stopping servers..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null
sleep 1

# Clear Vite cache
echo "Clearing Vite cache..."
cd frontend
rm -rf node_modules/.vite
rm -rf dist
echo "✅ Cache cleared"

# Start frontend
echo ""
echo "Starting frontend..."
npm run dev

cd ..
