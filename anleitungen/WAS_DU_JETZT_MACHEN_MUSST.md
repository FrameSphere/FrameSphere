# ✅ ZUSAMMENFASSUNG - Was du jetzt machen musst

## 🎯 Schnellstart (5 Minuten)

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere

# 1. Scripts ausführbar machen
chmod +x fix-account-connection.sh start-services.sh stop-services.sh

# 2. Fehler beheben
./fix-account-connection.sh

# 3. Services starten
./start-services.sh
```

**Das war's!** Öffne jetzt: http://localhost:3000

---

## 📋 Was wurde geändert?

### 1. **Backend Port**: 5001 → 3001
- **Datei**: `backend/.env`
- **Änderung**: `PORT=3001`
- **Grund**: Frontend soll auf Port 3000 laufen

### 2. **Frontend API URL**: 5001 → 3001
- **Datei**: `frontend/.env`
- **Änderung**: `VITE_API_URL=http://localhost:3001/api`
- **Grund**: Muss mit Backend Port übereinstimmen

### 3. **CORS Konfiguration**
- **Datei**: `backend/.env`
- **Änderungen**:
  - `CORS_ORIGIN=http://localhost:3000`
  - `FRONTEND_URL=http://localhost:3000`
- **Grund**: Frontend läuft auf Port 3000

### 4. **Datenbank Schema**
- **Datei**: `backend/src/database/migrations/add_connected_accounts.sql`
- **Änderungen**:
  - `product_id` → `service_id` (UUID Foreign Key)
  - `api_key_encrypted` → `access_token`
  - `stats` → `metadata` (JSONB)
- **Grund**: Schema passte nicht zum Controller

### 5. **Route Parameter**
- **Datei**: `backend/src/routes/connectedAccounts.js`
- **Änderung**: `:accountId` → `:id`
- **Grund**: Controller verwendet `:id`

---

## 🔍 Die 3 Hauptfehler und ihre Lösung

### Fehler 1: "Request failed with status code 500" beim Dashboard
**Ursache**: Datenbank-Tabelle `connected_accounts` hatte falsche Spalten

**Lösung**:
```bash
psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/reset-connected-accounts.sql
# Passwort: framesphere_password
```

### Fehler 2: "Request failed with status code 500" bei Connected Accounts
**Ursache**: 
1. Datenbank Schema passte nicht
2. Backend konnte Service nicht finden

**Lösung**: Siehe Fehler 1 + Services müssen in DB vorhanden sein

### Fehler 3: "Request failed with status code 404" beim Verbinden
**Ursache**: Route Parameter Mismatch (`:accountId` vs `:id`)

**Lösung**: Route Parameter korrigiert

---

## 📊 Neue Port-Struktur

```
┌─────────────────────────────────────────┐
│         Port-Übersicht                  │
├─────────────────────────────────────────┤
│ FrameSphere Frontend    → Port 3000    │
│ FrameSphere Backend     → Port 3001    │
│ FrameSpell Backend      → Port 8000    │
│ FrameSpell Frontend     → Port 8080    │
│ PostgreSQL              → Port 5432    │
└─────────────────────────────────────────┘
```

---

## 🚀 Schritt-für-Schritt Anleitung

### Schritt 1: Fehler beheben
```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
chmod +x fix-account-connection.sh
./fix-account-connection.sh
```

**Was passiert**:
- ✅ Backend .env wird auf Port 3001 gesetzt
- ✅ Frontend .env wird auf Backend Port 3001 verwiesen
- ✅ CORS wird auf localhost:3000 gesetzt
- ✅ Datenbank Schema wird korrigiert
- ✅ FrameSpell Service wird in DB eingefügt

### Schritt 2: Services starten
```bash
./start-services.sh
```

**Was passiert**:
- ✅ Backend startet auf Port 3001
- ✅ Frontend startet auf Port 3000
- ✅ Logs werden in `backend.log` und `frontend.log` geschrieben

### Schritt 3: FrameSpell starten (separat)
```bash
cd /Users/karol/Desktop/Laufende_Projekte/Rechtschreibe_API/webapp/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Schritt 4: Testen
1. Öffne: http://localhost:3000
2. Melde dich an
3. Gehe zu: Dashboard → Account verbinden
4. Wähle: FrameSpell API
5. Gib deinen FrameSpell API Key ein
6. Klicke: Account verbinden
7. ✅ Erfolg! Du siehst den verbundenen Account im Dashboard

---

## 🔐 FrameSpell API Key bekommen

### Option 1: Neuen User anlegen
```bash
# In neuem Terminal
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Antwort enthält Token**, damit dann:
```bash
curl http://localhost:8000/me \
  -H "Authorization: Bearer DEIN_TOKEN"
```

**Antwort enthält** `api_key` - das ist dein FrameSpell API Key!

### Option 2: Über FrameSpell Frontend
1. Öffne: http://localhost:8080
2. Registriere dich
3. Gehe zu Settings
4. Kopiere API Key

---

## 🧪 Testen ob alles funktioniert

### Test 1: Health Checks
```bash
# FrameSphere Backend
curl http://localhost:3001/health
# Erwartete Antwort: {"success":true,"message":"FrameSphere API is running",...}

# FrameSpell Backend
curl http://localhost:8000/health
# Erwartete Antwort: {"status":"healthy",...}
```

### Test 2: Dashboard laden
```bash
# Browser: http://localhost:3000
# Erwartung: Dashboard lädt ohne Fehler in der Konsole
```

### Test 3: Connected Accounts laden
```bash
# Browser: http://localhost:3000/dashboard/connect-accounts
# Erwartung: Seite lädt, zeigt FrameSpell und andere Services
```

### Test 4: Account verbinden
1. Klicke auf "FrameSpell API"
2. Gib deinen API Key ein
3. Erwartung: Erfolgs-Meldung + Weiterleitung zum Dashboard

---

## 📝 Logs überwachen

### Während des Testens
```bash
# Terminal 1: FrameSphere Logs
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
tail -f backend.log frontend.log

# Terminal 2: FrameSpell Logs
# Werden direkt im Terminal angezeigt wo uvicorn läuft
```

### Was du sehen solltest

**Beim Laden des Dashboards**:
```
GET /api/dashboard/stats 200
GET /api/api-keys 200
GET /api/services 200
GET /api/connected-accounts 200
```

**Beim Verbinden eines Accounts**:
```
POST /api/connected-accounts 201
```

**FrameSpell sollte zeigen**:
```
INFO: POST /api/auth/verify-connection HTTP/1.1" 200
INFO: Successfully verified connection for user X
```

---

## ❌ Häufige Probleme und Lösungen

### Problem: "Port already in use"
```bash
./stop-services.sh
./start-services.sh
```

### Problem: "Cannot connect to database"
```bash
# PostgreSQL starten
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux

# Status prüfen
pg_isready -h localhost -p 5432
```

### Problem: "Service nicht gefunden"
```bash
# FrameSpell Service manuell hinzufügen
export PGPASSWORD='framesphere_password'
psql -h localhost -p 5432 -U framesphere_user -d framesphere << EOF
INSERT INTO api_services (name, display_name, description, type, endpoint_url, status)
VALUES ('framespell', 'FrameSpell API', 'KI-gestützte Rechtschreib- und Grammatikprüfung', 'spelling', 'http://localhost:8000', 'active')
ON CONFLICT (name) DO NOTHING;
EOF
unset PGPASSWORD
```

### Problem: "Invalid API Key" beim Verbinden
- Stelle sicher, dass du den richtigen API Key von FrameSpell verwendest
- Der Key muss von einem existierenden FrameSpell User stammen
- Teste den Key direkt: `curl http://localhost:8000/me -H "X-API-Key: DEIN_KEY"`

---

## ✅ Erfolgskriterien

Alles funktioniert, wenn:

1. ✅ `http://localhost:3000` lädt ohne Fehler
2. ✅ Dashboard zeigt 4 Karten (API Calls, Tokens, Keys, Guthaben)
3. ✅ "Account verbinden" Seite zeigt alle Services
4. ✅ FrameSpell Account kann verbunden werden
5. ✅ Dashboard zeigt verbundenen Account
6. ✅ Keine Fehler in Browser-Konsole
7. ✅ Keine 500er Fehler in Backend Logs

---

## 🎉 Nächste Schritte

Nach erfolgreicher Einrichtung:

1. **Teste weitere Features**:
   - API Key erstellen
   - Statistiken anschauen
   - Account trennen/neu verbinden

2. **Andere Services vorbereiten**:
   - CoreChain AI
   - CoreChain API
   - SphereHub
   - SphereNet

3. **Produktiv setzen**:
   - Environment auf `production` setzen
   - Echte Secrets verwenden
   - SSL/HTTPS konfigurieren

---

## 📞 Support

Bei weiteren Problemen:
1. Prüfe `FEHLERBEHEBUNG_ANLEITUNG.md`
2. Schaue in die Logs: `tail -f backend.log frontend.log`
3. Führe Fix-Script nochmal aus: `./fix-account-connection.sh`

**Viel Erfolg! 🚀**
