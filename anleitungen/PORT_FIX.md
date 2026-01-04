# 🎯 FrameSphere - QUICK FIX (Port 5001)

## ❌ Problem gefunden:

**Port 5000 wird von macOS Control Center belegt!**

```
COMMAND     PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ControlCe 87128 karol   10u  IPv4 ... TCP *:commplex-main (LISTEN)
```

## ✅ Lösung: Backend auf Port 5001

Alle Dateien wurden bereits angepasst auf **Port 5001**!

---

## 🚀 JETZT EINFACH STARTEN:

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere

# 1. Cleanup
./cleanup.sh

# 2. Datenbank Setup (einmalig)
./complete-setup.sh

# 3. Starten
./start.sh
```

---

## 📍 Neue URLs:

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5001 ← **NEU!**
- **Health:** http://localhost:5001/health

---

## ✅ Was wurde geändert:

1. ✅ `backend/.env` → PORT=5001
2. ✅ `frontend/.env` → VITE_API_URL=http://localhost:5001/api
3. ✅ `frontend/src/utils/api.js` → Default URL auf 5001
4. ✅ `start.sh` → Prüft Port 5001
5. ✅ `stop.sh` → Stoppt Port 5001
6. ✅ `cleanup.sh` → Cleaned Port 5001
7. ✅ `complete-setup.sh` → Setzt PORT=5001
8. ✅ `docker-compose.yml` → Port Mapping 5001

---

## 🎯 Schritt für Schritt:

### 1. Cleanup bisherige Prozesse
```bash
./cleanup.sh
```

**Sollte zeigen:**
```
🧹 Cleaning up processes...
  Killing process on port 3000 (PID: 87175)
✅ Cleanup complete!
```

### 2. Datenbank einrichten
```bash
./complete-setup.sh
```

**Antworte mit `y` wenn gefragt:**
```
Seed database with demo data? (y/n) y
```

**Am Ende sollte stehen:**
```
✨ Setup Complete!
==================

📊 Database Info:
  Name:     framesphere
  User:     framesphere_user
  Password: framesphere_password

🔑 Demo Login:
  Email:    demo@framesphere.dev
  Password: demo123456

🚀 Start the application with:
   ./start.sh
```

### 3. Anwendung starten
```bash
./start.sh
```

**Sollte zeigen:**
```
✨ FrameSphere is running!
==========================

🌐 URLs:
  Frontend:  http://localhost:3000
  Backend:   http://localhost:5001
  Health:    http://localhost:5001/health

✅ Everything is ready! Open http://localhost:3000
```

---

## 🌐 Browser Test:

### 1. Health Check (Backend)
Öffne: http://localhost:5001/health

**Sollte zeigen:**
```json
{
  "success": true,
  "message": "FrameSphere API is running",
  "timestamp": "2025-10-03...",
  "version": "1.0.0"
}
```

### 2. Frontend
Öffne: http://localhost:3000

**Du solltest sehen:**
- ✅ FrameSphere Logo oben links
- ✅ Navigation (Home, Produkte, Preise, etc.)
- ✅ "Build with AI. Chain, connect, innovate."
- ✅ 5 Produkt-Karten
- ✅ Footer unten

### 3. Login Test
1. Klicke auf "Login" (oben rechts)
2. Gib ein:
   - `demo@framesphere.dev`
   - `demo123456`
3. Sollte zum Dashboard weiterleiten

---

## 🐛 Troubleshooting:

### Problem: "Backend failed to start"

```bash
# Zeig mir den Fehler
tail -50 backend.log
```

Häufigste Ursache: Datenbank nicht verbunden
**Lösung:**
```bash
./complete-setup.sh
```

### Problem: "Frontend shows blank page"

1. **Backend läuft?**
```bash
curl http://localhost:5001/health
```

2. **Browser Console** (F12 → Console)
   - Siehst du Netzwerk-Fehler?
   - URL korrekt auf 5001?

3. **Frontend Log prüfen:**
```bash
tail -50 frontend.log
```

### Problem: Port immer noch belegt

```bash
# Zeig mir alle Node Prozesse
ps aux | grep node

# Kill alle
pkill node

# Dann cleanup
./cleanup.sh
```

---

## 🔄 Neustart:

```bash
# Ctrl+C im start.sh Terminal
# Oder:
./stop.sh

# Dann:
./start.sh
```

---

## ✅ Finaler Check:

```bash
# Alle Ports prüfen
lsof -i :3000,5001

# Sollte zeigen:
# node ... :3000 (Frontend)
# node ... :5001 (Backend)
```

---

## 🎉 Success Checkliste:

- [ ] `./cleanup.sh` ausgeführt
- [ ] `./complete-setup.sh` erfolgreich
- [ ] `./start.sh` läuft ohne Fehler
- [ ] http://localhost:5001/health zeigt JSON
- [ ] http://localhost:3000 zeigt Landing Page
- [ ] Login funktioniert
- [ ] Dashboard zeigt Statistiken

---

## 📞 Immer noch Probleme?

Schicke mir:

```bash
# Port Status
lsof -i :3000,5001

# PostgreSQL Status
pg_isready

# Logs
tail -50 backend.log
tail -50 frontend.log

# Environment
cat backend/.env | grep PORT
cat frontend/.env | grep API
```

---

**JETZT PROBIERE:**

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
./cleanup.sh
./complete-setup.sh
```

Und sag mir was du siehst! 🚀
