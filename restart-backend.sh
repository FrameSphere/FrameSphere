#!/bin/bash

echo "🔄 Backend neu starten..."

# Backend stoppen
if [ -f ".backend.pid" ]; then
    BACKEND_PID=$(cat .backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        kill $BACKEND_PID
        echo "✅ Backend gestoppt"
    fi
    rm .backend.pid
fi

# Port freigeben
if lsof -ti:3001 &>/dev/null; then
    kill $(lsof -ti:3001) 2>/dev/null
    echo "✅ Port 3001 freigegeben"
fi

# Backend starten
cd backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../.backend.pid
cd ..

echo "✅ Backend gestartet (PID: $BACKEND_PID)"
echo ""
echo "📝 Logs: tail -f backend.log"
