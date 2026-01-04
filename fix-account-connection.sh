#!/bin/bash

# FrameSphere Account Connection - Fix Script
# Dieses Script behebt alle bekannten Probleme mit der Account-Verbindung

echo "🔧 FrameSphere Account Connection - Fehlerbehebung"
echo "=================================================="
echo ""

# Farben
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funktion für Success Messages
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Funktion für Error Messages
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Funktion für Info Messages
info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Prüfe ob wir im richtigen Verzeichnis sind
if [ ! -f "backend/.env" ]; then
    error "Dieses Script muss aus dem FrameSphere Root-Verzeichnis ausgeführt werden!"
    exit 1
fi

info "Starte Fehlerbehebung..."
echo ""

# Schritt 1: Backend .env prüfen
echo "📝 Schritt 1: Backend-Konfiguration prüfen..."
if grep -q "PORT=3001" backend/.env; then
    success "Backend Port ist korrekt (3001)"
else
    info "Korrigiere Backend Port..."
    sed -i '' 's/PORT=5001/PORT=3001/g' backend/.env
    success "Backend Port auf 3001 gesetzt"
fi

if grep -q "CORS_ORIGIN=http://localhost:3000" backend/.env; then
    success "CORS Origin ist korrekt"
else
    info "Korrigiere CORS Origin..."
    sed -i '' 's|CORS_ORIGIN=http://localhost:5173|CORS_ORIGIN=http://localhost:3000|g' backend/.env
    sed -i '' 's|FRONTEND_URL=http://localhost:5173|FRONTEND_URL=http://localhost:3000|g' backend/.env
    success "CORS Origin korrigiert"
fi
echo ""

# Schritt 2: Frontend .env prüfen
echo "📝 Schritt 2: Frontend-Konfiguration prüfen..."
if [ -f "frontend/.env" ]; then
    if grep -q "VITE_API_URL=http://localhost:3001/api" frontend/.env; then
        success "Frontend API URL ist korrekt"
    else
        info "Korrigiere Frontend API URL..."
        sed -i '' 's|VITE_API_URL=http://localhost:5001/api|VITE_API_URL=http://localhost:3001/api|g' frontend/.env
        success "Frontend API URL korrigiert"
    fi
else
    error "Frontend .env nicht gefunden!"
    echo "Erstelle frontend/.env..."
    echo "VITE_API_URL=http://localhost:3001/api" > frontend/.env
    success "Frontend .env erstellt"
fi
echo ""

# Schritt 3: Datenbank Schema korrigieren
echo "📝 Schritt 3: Datenbank Schema korrigieren..."
info "Versuche Datenbank zu aktualisieren..."

# Prüfe ob PostgreSQL läuft
if ! pg_isready -h localhost -p 5432 &>/dev/null; then
    error "PostgreSQL läuft nicht oder ist nicht erreichbar!"
    info "Starte PostgreSQL zuerst:"
    echo "  macOS: brew services start postgresql"
    echo "  Linux: sudo systemctl start postgresql"
    exit 1
fi

# Führe Migration aus
export PGPASSWORD='framesphere_password'
if psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/reset-connected-accounts.sql &>/dev/null; then
    success "Datenbank Schema aktualisiert"
else
    error "Fehler beim Aktualisieren der Datenbank"
    info "Führe manuell aus:"
    echo "  psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/reset-connected-accounts.sql"
fi
unset PGPASSWORD
echo ""

# Schritt 4: API Services prüfen
echo "📝 Schritt 4: API Services in Datenbank prüfen..."
export PGPASSWORD='framesphere_password'
SERVICE_COUNT=$(psql -h localhost -p 5432 -U framesphere_user -d framesphere -t -c "SELECT COUNT(*) FROM api_services WHERE name = 'framespell';" 2>/dev/null | tr -d ' ')

if [ "$SERVICE_COUNT" = "0" ]; then
    info "FrameSpell Service wird zur Datenbank hinzugefügt..."
    psql -h localhost -p 5432 -U framesphere_user -d framesphere -c "INSERT INTO api_services (name, display_name, description, type, endpoint_url, status) VALUES ('framespell', 'FrameSpell API', 'KI-gestützte Rechtschreib- und Grammatikprüfung', 'spelling', 'http://localhost:8000', 'active') ON CONFLICT (name) DO NOTHING;" &>/dev/null
    success "FrameSpell Service hinzugefügt"
elif [ "$SERVICE_COUNT" = "1" ]; then
    success "FrameSpell Service existiert bereits"
else
    error "Unerwarteter Zustand: Mehrere FrameSpell Services gefunden"
fi
unset PGPASSWORD
echo ""

# Schritt 5: Services Status prüfen
echo "📝 Schritt 5: Service-Status prüfen..."

# Prüfe FrameSphere Backend
if curl -s http://localhost:3001/health &>/dev/null; then
    success "FrameSphere Backend läuft (Port 3001)"
else
    info "FrameSphere Backend läuft nicht"
    echo "  Starte mit: cd backend && npm start"
fi

# Prüfe FrameSphere Frontend
if curl -s http://localhost:3000 &>/dev/null; then
    success "FrameSphere Frontend läuft (Port 3000)"
else
    info "FrameSphere Frontend läuft nicht"
    echo "  Starte mit: cd frontend && npm run dev"
fi

# Prüfe FrameSpell Backend
if curl -s http://localhost:8000/health &>/dev/null; then
    success "FrameSpell Backend läuft (Port 8000)"
else
    info "FrameSpell Backend läuft nicht"
    echo "  Starte mit: cd ../Rechtschreibe_API/webapp/backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
fi

echo ""
echo "=================================================="
success "Fehlerbehebung abgeschlossen!"
echo ""
echo "📊 Port-Übersicht:"
echo "  - FrameSphere Frontend: http://localhost:3000"
echo "  - FrameSphere Backend:  http://localhost:3001"
echo "  - FrameSpell Backend:   http://localhost:8000"
echo ""
echo "🚀 Nächste Schritte:"
echo "  1. Starte alle Services (falls nicht schon laufend)"
echo "  2. Öffne http://localhost:3000/dashboard/connect-accounts"
echo "  3. Verbinde deinen FrameSpell Account"
echo ""
echo "📖 Weitere Infos: FEHLERBEHEBUNG_ANLEITUNG.md"
