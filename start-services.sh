#!/bin/bash

# FrameSphere - Alle Services starten
# Dieses Script startet Backend und Frontend in separaten Terminal-Fenstern

echo "🚀 FrameSphere Services starten..."

# Prüfe ob wir im richtigen Verzeichnis sind
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Dieses Script muss aus dem FrameSphere Root-Verzeichnis ausgeführt werden!"
    exit 1
fi

# Funktion um zu prüfen ob ein Port belegt ist
check_port() {
    lsof -i:$1 &>/dev/null
    return $?
}

# Prüfe ob Ports bereits belegt sind
if check_port 3001; then
    echo "⚠️  Port 3001 (Backend) ist bereits belegt"
    echo "   Möchtest du den laufenden Prozess beenden? (j/n)"
    read -r response
    if [[ "$response" =~ ^[Jj]$ ]]; then
        kill $(lsof -t -i:3001)
        echo "✅ Port 3001 freigegeben"
    fi
fi

if check_port 3000; then
    echo "⚠️  Port 3000 (Frontend) ist bereits belegt"
    echo "   Möchtest du den laufenden Prozess beenden? (j/n)"
    read -r response
    if [[ "$response" =~ ^[Jj]$ ]]; then
        kill $(lsof -t -i:3000)
        echo "✅ Port 3000 freigegeben"
    fi
fi

# Starte Backend
echo ""
echo "📡 Starte FrameSphere Backend (Port 3001)..."
cd backend

# Prüfe ob node_modules existiert
if [ ! -d "node_modules" ]; then
    echo "📦 Installiere Backend Dependencies..."
    npm install
fi

# Starte Backend im Hintergrund
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend gestartet (PID: $BACKEND_PID)"

# Warte kurz damit Backend starten kann
sleep 3

# Prüfe ob Backend läuft
if curl -s http://localhost:3001/health &>/dev/null; then
    echo "✅ Backend erfolgreich gestartet: http://localhost:3001"
else
    echo "⚠️  Backend antwortet nicht, prüfe backend.log"
fi

cd ..

# Starte Frontend
echo ""
echo "🌐 Starte FrameSphere Frontend (Port 3000)..."
cd frontend

# Prüfe ob node_modules existiert
if [ ! -d "node_modules" ]; then
    echo "📦 Installiere Frontend Dependencies..."
    npm install
fi

# Starte Frontend im Hintergrund
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend gestartet (PID: $FRONTEND_PID)"

# Warte kurz damit Frontend starten kann
sleep 5

# Prüfe ob Frontend läuft
if curl -s http://localhost:3000 &>/dev/null; then
    echo "✅ Frontend erfolgreich gestartet: http://localhost:3000"
else
    echo "⚠️  Frontend antwortet nicht, prüfe frontend.log"
fi

cd ..

# Speichere PIDs
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid

echo ""
echo "=================================================="
echo "✅ FrameSphere Services gestartet!"
echo "=================================================="
echo ""
echo "📊 Service-URLs:"
echo "  🌐 Frontend:  http://localhost:3000"
echo "  📡 Backend:   http://localhost:3001"
echo "  💚 Health:    http://localhost:3001/health"
echo ""
echo "📝 Logs:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "🛑 Services stoppen:"
echo "  ./stop.sh"
echo ""
echo "⚠️  FrameSpell muss separat gestartet werden:"
echo "  cd ../Rechtschreibe_API/webapp/backend"
echo "  uvicorn main:app --reload --host 0.0.0.0 --port 8000"
echo ""
