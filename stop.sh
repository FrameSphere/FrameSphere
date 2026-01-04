#!/bin/bash

# Stop all FrameSphere processes

echo "🛑 Stopping FrameSphere..."

# Kill processes on ports (now including 5001 instead of 5000)
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "  Stopping process on port $port (PID: $pid)"
        kill -9 $pid 2>/dev/null
        return 0
    fi
    return 1
}

# Stop backend (port 5001)
if kill_port 5001; then
    echo "✅ Backend stopped"
else
    echo "ℹ️  No backend process found"
fi

# Stop frontend (port 3000)
if kill_port 3000; then
    echo "✅ Frontend stopped"
else
    echo "ℹ️  No frontend process found"
fi

# Clean up log files
if [ -f "backend.log" ]; then
    rm backend.log
    echo "🗑️  Removed backend.log"
fi

if [ -f "frontend.log" ]; then
    rm frontend.log
    echo "🗑️  Removed frontend.log"
fi

echo ""
echo "✨ All processes stopped!"
