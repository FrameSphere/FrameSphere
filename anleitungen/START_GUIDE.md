# 🚀 FrameSphere - Start Guide

## ⚡ Schnellstart (Copy & Paste)

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere

# 1. Scripts ausführbar machen
chmod +x setup-db.sh start.sh stop.sh

# 2. Datenbank einrichten
./setup-db.sh

# 3. Anwendung starten
./start.sh
```

Das war's! Frontend läuft auf **http://localhost:3000**

---

## 📋 Schritt-für-Schritt Anleitung

### 1️⃣ PostgreSQL Check

**Prüfen ob PostgreSQL läuft:**
```bash
pg_isready
```

**Falls nicht installiert:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Falls installiert aber nicht läuft:**
```bash
brew services start postgresql@14
# oder
brew services start postgresql
```

---

### 2️⃣ Datenbank Setup

```bash
# Automatisch (empfohlen):
./setup-db.sh

# Oder manuell:
psql postgres << EOF
CREATE DATABASE framesphere;
CREATE USER framesphere_user WITH PASSWORD 'framesphere_password';
GRANT ALL PRIVILEGES ON DATABASE framesphere TO framesphere_user;
EOF
```

---

### 3️⃣ Backend Setup

```bash
cd backend

# Dependencies installieren (falls noch nicht geschehen)
npm install

# Datenbank migrieren
npm run db:migrate

# Demo-Daten einfügen
npm run db:seed
```

---

### 4️⃣ Anwendung starten

**Option A: Mit Start-Script (empfohlen)**
```bash
# Im Hauptverzeichnis
./start.sh
```

**Option B: Manuell in 2 Terminals**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Option C: Mit Docker**
```bash
docker-compose up
```

---

## 🔧 Scripts Übersicht

| Script | Beschreibung |
|--------|--------------|
| `./setup-db.sh` | Richtet PostgreSQL Datenbank ein |
| `./start.sh` | Startet Backend + Frontend |
| `./stop.sh` | Stoppt alle Prozesse |
| `./setup.sh` | Erstes Setup (nur einmal) |

---

## 🌐 URLs nach dem Start

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

---

## 🔑 Demo Login

```
E-Mail:    demo@framesphere.dev
Passwort:  demo123456
```

---

## 🐛 Troubleshooting

### Problem: "ECONNREFUSED"

**Lösung:** PostgreSQL läuft nicht
```bash
brew services start postgresql@14
# Warte 3 Sekunden
pg_isready
```

---

### Problem: "Port 5000 already in use"

**Lösung:** Port freigeben
```bash
lsof -ti:5000 | xargs kill -9
```

Oder Stop-Script nutzen:
```bash
./stop.sh
```

---

### Problem: "Cannot connect to database"

**Lösung 1:** PostgreSQL neu starten
```bash
brew services restart postgresql@14
```

**Lösung 2:** Credentials in `.env` prüfen
```bash
cd backend
cat .env
```

Sollte sein:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=framesphere_user
DB_PASSWORD=framesphere_password
DB_NAME=framesphere
```

**Lösung 3:** Datenbank neu erstellen
```bash
./setup-db.sh
```

---

### Problem: "relation users does not exist"

**Lösung:** Migrationen ausführen
```bash
cd backend
npm run db:migrate
npm run db:seed
```

---

### Problem: Frontend zeigt "Cannot connect to server"

**Prüfen:**
1. Läuft Backend? → http://localhost:5000/health
2. CORS richtig konfiguriert?

**Lösung:**
```bash
cd backend
cat .env | grep CORS
# Sollte sein: CORS_ORIGIN=http://localhost:3000
```

---

## 📝 Logs anschauen

**Live Logs:**
```bash
# Beide Logs gleichzeitig
tail -f backend.log frontend.log

# Nur Backend
tail -f backend.log

# Nur Frontend
tail -f frontend.log
```

---

## 🛑 Anwendung stoppen

**Mit Script:**
```bash
./stop.sh
```

**Manuell:**
```bash
# Beide Ports killen
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

**Mit Ctrl+C** (wenn start.sh läuft)

---

## 🔄 Neustart

```bash
./stop.sh
./start.sh
```

---

## 🗄️ Datenbank zurücksetzen

```bash
cd backend

# Datenbank löschen und neu erstellen
psql postgres -c "DROP DATABASE framesphere;"
psql postgres -c "CREATE DATABASE framesphere;"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE framesphere TO framesphere_user;"

# Neu migrieren
npm run db:migrate
npm run db:seed
```

Oder einfach:
```bash
./setup-db.sh
cd backend
npm run db:migrate
npm run db:seed
```

---

## 📦 Pakete aktualisieren

**Backend:**
```bash
cd backend
npm update
```

**Frontend:**
```bash
cd frontend  
npm update
```

---

## 🎯 Was tun nach erfolgreichem Start?

1. ✅ Öffne http://localhost:3000
2. ✅ Klicke auf "Login"
3. ✅ Nutze Demo-Login:
   - E-Mail: `demo@framesphere.dev`
   - Passwort: `demo123456`
4. ✅ Erkunde das Dashboard
5. ✅ Erstelle einen API Key
6. ✅ Teste die API:
   ```bash
   curl http://localhost:5000/health
   ```

---

## 🔗 Nächste Schritte

### Eigene APIs integrieren:

1. **FrameSpell API integrieren:**
   ```bash
   cd backend/src/controllers
   # Erstelle framespellController.js
   ```

2. **Service in DB eintragen:**
   ```sql
   -- Der Service ist schon drin via seed.js!
   SELECT * FROM api_services WHERE name = 'framespell';
   ```

3. **Route hinzufügen:**
   ```javascript
   // backend/src/routes/framespell.js
   import express from 'express';
   const router = express.Router();
   // Deine Routen hier
   export default router;
   ```

---

## 💡 Pro-Tipps

**1. Terminal Tabs nutzen:**
```bash
# Tab 1: Backend
cd backend && npm run dev

# Tab 2: Frontend  
cd frontend && npm run dev

# Tab 3: Logs
tail -f backend.log frontend.log
```

**2. Automatischer Restart:**
Das passiert bereits durch `nodemon` (Backend) und Vite (Frontend)!

**3. API testen mit cURL:**
```bash
# Health Check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@framesphere.dev","password":"demo123456"}'
```

**4. Database Console:**
```bash
psql framesphere -U framesphere_user
# Passwort: framesphere_password
```

---

## 📞 Hilfe benötigt?

- **Logs prüfen:** `tail -f backend.log frontend.log`
- **PostgreSQL Status:** `brew services list | grep postgresql`
- **Prozesse prüfen:** `lsof -i :3000,5000`
- **Datenbank prüfen:** `psql -l | grep framesphere`

---

## ✨ Zusammenfassung

```bash
# Setup (einmalig)
chmod +x *.sh
./setup-db.sh

# Starten
./start.sh

# Stoppen  
./stop.sh

# Oder Ctrl+C wenn start.sh läuft
```

**Das war's! Viel Erfolg! 🚀**
