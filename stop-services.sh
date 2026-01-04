#!/bin/bash

# FrameSphere - Services stoppen

echo "🛑 Stoppe FrameSphere Services..."

# Lade PIDs
if [ -f ".backend.pid" ]; then
    BACKEND_PID=$(cat .backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        kill $BACKEND_PID
        echo "✅ Backend gestoppt (PID: $BACKEND_PID)"
    else
        echo "⚠️  Backend läuft nicht mehr"
    fi
    rm .backend.pid
fi

if [ -f ".frontend.pid" ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        kill $FRONTEND_PID
        echo "✅ Frontend gestoppt (PID: $FRONTEND_PID)"
    else
        echo "⚠️  Frontend läuft nicht mehr"
    fi
    rm .frontend.pid
fi

# Zusätzliche Prozesse auf den Ports killen (Fallback)
if lsof -ti:3001 &>/dev/null; then
    kill $(lsof -ti:3001) 2>/dev/null
    echo "✅ Port 3001 freigegeben"
fi

if lsof -ti:3000 &>/dev/null; then
    kill $(lsof -ti:3000) 2>/dev/null
    echo "✅ Port 3000 freigegeben"
fi

echo ""
echo "✅ Alle Services gestoppt"
