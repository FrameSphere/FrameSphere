#!/bin/bash

# Fix Frontend Dependencies
echo "🔧 Fixing Frontend Dependencies..."
echo "=================================="
echo ""

cd frontend

echo "1️⃣  Removing old node_modules and package-lock..."
rm -rf node_modules
rm -f package-lock.json
echo "✅ Cleaned"
echo ""

echo "2️⃣  Clearing npm cache..."
npm cache clean --force
echo "✅ Cache cleared"
echo ""

echo "3️⃣  Reinstalling dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

echo "4️⃣  Testing Vite..."
if npm run dev -- --help > /dev/null 2>&1; then
    echo "✅ Vite is working!"
else
    echo "❌ Still issues. Trying alternative fix..."
    npm install --force
fi

cd ..

echo ""
echo "✨ Frontend fixed! Try ./start.sh now"
