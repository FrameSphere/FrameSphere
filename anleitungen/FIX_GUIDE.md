# 🔧 FrameSphere - FIX Guide

## ❌ Problem identifiziert:

1. **Port 5000 bereits belegt** → Backend konnte nicht starten
2. **Keine Datenbank Verbindung** → DB nicht eingerichtet
3. **Frontend zeigt nichts** → Backend nicht erreichbar

---

## ✅ Lösung (Copy & Paste):

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere

# Alle Scripts ausführbar machen
chmod +x *.sh

# KOMPLETTE automatische Einrichtung
./complete-setup.sh

# Danach starten
./start.sh
```

**Das ist alles!** 🎉

---

## 📝 Was `complete-setup.sh` macht:

1. ✅ Alle Prozesse killen (Ports 3000 & 5000)
2. ✅ PostgreSQL starten
3. ✅ Datenbank `framesphere` erstellen
4. ✅ User `framesphere_user` erstellen
5. ✅ `.env` Datei korrekt konfigurieren
6. ✅ Dependencies installieren
7. ✅ Datenbank migrieren
8. ✅ Demo-Daten einfügen
9. ✅ Alles testen

---

## 🚀 Nach dem Setup:

```bash
./start.sh
```

Dann öffne: **http://localhost:3000**

Login mit:
- E-Mail: `demo@framesphere.dev`
- Passwort: `demo123456`

---

## 🛑 Wenn du stoppen willst:

```bash
./stop.sh
```

Oder `Ctrl+C` wenn start.sh läuft.

---

## 🐛 Troubleshooting:

### Problem: "Port already in use"

```bash
# Cleanup Script ausführen
./cleanup.sh

# Dann neu starten
./start.sh
```

### Problem: "Cannot connect to database"

```bash
# Komplett neu aufsetzen
./complete-setup.sh
```

### Problem: "PostgreSQL not running"

```bash
# PostgreSQL starten
brew services start postgresql@14

# Status prüfen
brew services list | grep postgresql
pg_isready
```

### Problem: "Frontend zeigt weiße Seite"

1. **Backend läuft?**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Frontend Log prüfen:**
   ```bash
   tail -f frontend.log
   ```

3. **Browser Console öffnen:** F12 → Console → Fehler?

---

## 📊 Neue Scripts:

| Script | Beschreibung |
|--------|--------------|
| `complete-setup.sh` | ✅ Komplette Einrichtung (empfohlen!) |
| `start.sh` | 🚀 Startet Backend + Frontend |
| `stop.sh` | 🛑 Stoppt alles |
| `cleanup.sh` | 🧹 Räumt Prozesse auf |
| `setup-db.sh` | 🗄️ Nur Datenbank Setup |

---

## 🎯 Empfohlener Workflow:

### Erstes Mal:
```bash
./complete-setup.sh    # Einmalig
./start.sh             # Starten
```

### Danach immer:
```bash
./start.sh             # Starten
# Arbeiten...
./stop.sh              # Stoppen
```

### Bei Problemen:
```bash
./cleanup.sh           # Aufräumen
./start.sh             # Neu starten
```

### Datenbank zurücksetzen:
```bash
./complete-setup.sh    # Alles neu
```

---

## ✨ Quick Commands:

```bash
# ALLES neu aufsetzen und starten
chmod +x *.sh && ./complete-setup.sh && ./start.sh

# Nur cleanup und starten
./cleanup.sh && ./start.sh

# Stoppen
./stop.sh

# Logs live anschauen
tail -f backend.log frontend.log
```

---

## 🔍 Status prüfen:

```bash
# PostgreSQL
pg_isready

# Ports
lsof -i :3000,5000

# Prozesse
ps aux | grep node

# Database
psql framesphere -U framesphere_user -c "\dt"
# Passwort: framesphere_password
```

---

## 🌐 URLs:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/health
- API: http://localhost:5000/api

---

## 💾 Credentials:

**Datenbank:**
- Host: localhost
- Port: 5432
- Database: framesphere
- User: framesphere_user
- Password: framesphere_password

**Demo Account:**
- Email: demo@framesphere.dev
- Password: demo123456

---

## 🎓 Was wurde gefixt:

1. ✅ **Port-Konflikt:** Cleanup vor jedem Start
2. ✅ **DB Connection:** Automatische Einrichtung
3. ✅ **Routing:** App.jsx ist korrekt
4. ✅ **Environment:** Korrekte .env Datei
5. ✅ **Warnings:** package.json hat "type": "module"

---

## 📱 Test nach Start:

1. Öffne http://localhost:3000
2. Du solltest die Landing Page sehen
3. Klicke auf "Login"
4. Gib ein: demo@framesphere.dev / demo123456
5. Dashboard sollte laden

**Wenn das funktioniert → ALLES LÄUFT! 🎉**

---

## 🆘 Immer noch Probleme?

```bash
# Zeig mir die Logs
tail -50 backend.log
tail -50 frontend.log

# Zeig mir die Prozesse
lsof -i :3000,5000

# Zeig mir PostgreSQL Status
brew services list | grep postgresql
```

---

**Jetzt probiere:**

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
chmod +x *.sh
./complete-setup.sh
```
