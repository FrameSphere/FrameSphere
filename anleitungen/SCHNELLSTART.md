# FrameSphere - Schnellstart Guide

## 🚀 Services starten

### Automatisch (empfohlen)

```bash
# Alle Änderungen anwenden und Services starten
chmod +x fix-account-connection.sh start-services.sh stop-services.sh
./fix-account-connection.sh
./start-services.sh
```

### Manuell

```bash
# Backend starten (Port 3001)
cd backend
npm install
npm start

# Frontend starten (Port 3000) - in neuem Terminal
cd frontend
npm install
npm run dev

# FrameSpell starten (Port 8000) - in neuem Terminal
cd ../Rechtschreibe_API/webapp/backend
source venv/bin/activate  # Falls venv existiert
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🛑 Services stoppen

```bash
./stop-services.sh
```

## 📊 Port-Übersicht

| Service | Port | URL |
|---------|------|-----|
| FrameSphere Frontend | 3000 | http://localhost:3000 |
| FrameSphere Backend | 3001 | http://localhost:3001 |
| FrameSpell Backend | 8000 | http://localhost:8000 |
| PostgreSQL | 5432 | localhost:5432 |

## 🔧 Fehlerbehebung

### Problem: "Request failed with status code 500"

```bash
# Datenbank Schema zurücksetzen
psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/reset-connected-accounts.sql
# Passwort: framesphere_password
```

### Problem: "Port already in use"

```bash
# Ports freigeben
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:3001 | xargs kill -9  # Backend
```

### Problem: "Cannot connect to database"

```bash
# PostgreSQL starten
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux

# Datenbank erstellen (falls nicht vorhanden)
psql -U postgres
CREATE DATABASE framesphere;
CREATE USER framesphere_user WITH PASSWORD 'framesphere_password';
GRANT ALL PRIVILEGES ON DATABASE framesphere TO framesphere_user;
\q

# Schema initialisieren
cd backend
npm run migrate
```

## 📝 Logs anzeigen

```bash
# Backend Logs
tail -f backend.log

# Frontend Logs
tail -f frontend.log

# Beide gleichzeitig
tail -f backend.log frontend.log
```

## 🧪 Testen

### 1. Health Checks

```bash
# FrameSphere Backend
curl http://localhost:3001/health

# FrameSpell Backend
curl http://localhost:8000/health
```

### 2. Account Verbindung testen

1. Öffne http://localhost:3000
2. Melde dich an oder registriere dich
3. Gehe zu Dashboard → Account verbinden
4. Wähle "FrameSpell API"
5. Gib deinen FrameSpell API Key ein
6. Klicke auf "Account verbinden"

### 3. Dashboard überprüfen

Nach erfolgreicher Verbindung:
- Gehe zurück zum Dashboard
- Du solltest die verbundenen Accounts sehen
- Statistiken werden von FrameSpell abgerufen

## 🔐 FrameSpell API Key erhalten

### Methode 1: Über FrameSpell Frontend
1. Öffne http://localhost:8080
2. Melde dich an
3. Gehe zu Account Settings
4. Kopiere deinen API Key

### Methode 2: Über FrameSpell API
```bash
# Registrieren
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Mit Token User-Info abrufen (enthält API Key)
curl http://localhost:8000/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📚 Weitere Dokumentation

- [Fehlerbehebung Anleitung](FEHLERBEHEBUNG_ANLEITUNG.md) - Detaillierte Problemlösung
- [API Dokumentation](docs/API.md) - API Endpoints
- [Entwickler Guide](docs/DEVELOPER.md) - Entwicklung & Deployment

## 🆘 Support

Bei Problemen:
1. Prüfe die Logs: `tail -f backend.log frontend.log`
2. Führe Fix-Script aus: `./fix-account-connection.sh`
3. Konsultiere: `FEHLERBEHEBUNG_ANLEITUNG.md`
