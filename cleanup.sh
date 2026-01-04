#!/bin/bash

# Kill all FrameSphere processes and free ports

echo "🧹 Cleaning up processes..."

# Kill processes on specific ports (now 3000 and 5001)
for port in 3000 5001; do
    pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo "  Killing process on port $port (PID: $pid)"
        kill -9 $pid 2>/dev/null
    fi
done

# Kill any node processes related to framesphere
pkill -f "framesphere" 2>/dev/null

# Clean up log files
rm -f backend.log frontend.log

echo "✅ Cleanup complete!"
echo ""
echo "Now run: ./start.sh"
