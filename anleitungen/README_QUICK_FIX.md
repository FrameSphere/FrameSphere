# 🎯 GENAU DAS MUSST DU MACHEN

## Schritt 1: Terminal öffnen und eingeben

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
chmod +x fix-account-connection.sh start-services.sh stop-services.sh
./fix-account-connection.sh
```

**Was passiert**: Alle Fehler werden automatisch behoben ✅

---

## Schritt 2: Services starten

```bash
./start-services.sh
```

**Was passiert**: 
- ✅ Backend startet auf Port 3001
- ✅ Frontend startet auf Port 3000

---

## Schritt 3: FrameSpell starten (neues Terminal)

```bash
cd /Users/karol/Desktop/Laufende_Projekte/Rechtschreibe_API/webapp/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Was passiert**: 
- ✅ FrameSpell Backend startet auf Port 8000

---

## Schritt 4: Testen

1. Öffne Browser: **http://localhost:3000**
2. Melde dich an
3. Klicke auf **"Account verbinden"**
4. Wähle **"FrameSpell API"**
5. Gib deinen FrameSpell API Key ein
6. Klicke **"Account verbinden"**

**Fertig!** 🎉

---

## 🔑 FrameSpell API Key bekommen

### Schnellste Methode:

```bash
# Neues Terminal öffnen
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Du bekommst einen Token zurück**. Dann:

```bash
curl http://localhost:8000/me \
  -H "Authorization: Bearer DEIN_TOKEN_HIER"
```

**In der Antwort siehst du**: `"api_key": "xxx..."` ← Das ist dein FrameSpell API Key!

---

## 📊 Architektur - So funktioniert die Verbindung

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (localhost:3000)                 │
│                     FrameSphere Frontend                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Request
                         │ POST /api/connected-accounts
                         │
┌────────────────────────▼────────────────────────────────────┐
│              FrameSphere Backend (Port 3001)                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 1. Empfängt: productId, apiKey, accountName       │    │
│  │ 2. Holt service_id aus api_services Tabelle       │    │
│  │ 3. Verschlüsselt API Key                           │    │
│  └──────────────┬─────────────────────────────────────┘    │
│                 │                                            │
│                 │ HTTP POST                                  │
│                 │ /api/auth/verify-connection                │
│                 │                                            │
└─────────────────┼────────────────────────────────────────────┘
                  │
                  │
┌─────────────────▼────────────────────────────────────────────┐
│              FrameSpell Backend (Port 8000)                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │ 1. Validiert API Key in users Tabelle             │     │
│  │ 2. Gibt User-Daten zurück                          │     │
│  │ 3. Bestätigt Verbindung                            │     │
│  └──────────────┬─────────────────────────────────────┘     │
└─────────────────┼────────────────────────────────────────────┘
                  │
                  │ Response: success, user_id, email
                  │
┌─────────────────▼────────────────────────────────────────────┐
│              PostgreSQL (Port 5432)                           │
│  ┌────────────────────────────────────────────────────┐     │
│  │ INSERT INTO connected_accounts:                    │     │
│  │   - user_id (FrameSphere User)                     │     │
│  │   - service_id (UUID von FrameSpell)              │     │
│  │   - access_token (verschlüsselter API Key)        │     │
│  │   - external_user_id (FrameSpell User ID)         │     │
│  │   - account_name                                   │     │
│  │   - metadata (JSON mit Verifizierungs-Daten)      │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔍 Was wurde genau geändert?

### Datei 1: `backend/.env`
```diff
- PORT=5001
+ PORT=3001

- CORS_ORIGIN=http://localhost:5173
- FRONTEND_URL=http://localhost:5173
+ CORS_ORIGIN=http://localhost:3000
+ FRONTEND_URL=http://localhost:3000
```

### Datei 2: `frontend/.env`
```diff
- VITE_API_URL=http://localhost:5001/api
+ VITE_API_URL=http://localhost:3001/api
```

### Datei 3: `backend/src/routes/connectedAccounts.js`
```diff
- router.post('/:accountId/refresh', refreshAccountStats);
- router.delete('/:accountId', disconnectAccount);
+ router.post('/:id/refresh', refreshAccountStats);
+ router.delete('/:id', disconnectAccount);
```

### Datei 4: `backend/src/database/migrations/add_connected_accounts.sql`
```diff
- product_id VARCHAR(100) NOT NULL,
- product_name VARCHAR(255) NOT NULL,
- account_id VARCHAR(255),
- api_key_encrypted TEXT NOT NULL,
+ service_id UUID NOT NULL REFERENCES api_services(id),
+ external_user_id VARCHAR(255),
+ access_token TEXT NOT NULL,
```

### Datei 5: `frontend/src/pages/dashboard/ConnectAccounts.jsx`
```diff
- return connectedAccounts.some(acc => acc.productId === productId);
+ return connectedAccounts.some(acc => acc.service_name === productId);
```

---

## ✅ Erfolgreich wenn...

Du siehst folgendes ohne Fehler:

1. ✅ **Dashboard lädt**: http://localhost:3000/dashboard
   - 4 Statistik-Karten sichtbar
   - Keine roten Fehler in Browser-Konsole (F12)

2. ✅ **Account verbinden Seite**: http://localhost:3000/dashboard/connect-accounts
   - 5 Produkt-Karten sichtbar (FrameSpell, CoreChain AI, etc.)
   - "Verbinden" Button funktioniert

3. ✅ **Verbindung erfolgreich**:
   - Grüne Erfolgsmeldung erscheint
   - Weiterleitung zum Dashboard
   - Verbundener Account ist sichtbar

4. ✅ **Keine Fehler in Logs**:
   ```bash
   tail -f backend.log  # Keine 500er Fehler
   ```

---

## 🐛 Falls Probleme auftreten

### Problem: "Port already in use"
```bash
./stop-services.sh
./start-services.sh
```

### Problem: "Database connection failed"
```bash
# PostgreSQL starten
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux

# Prüfen
pg_isready -h localhost -p 5432
```

### Problem: "Service not found" (404)
```bash
# FrameSpell Service manuell einfügen
export PGPASSWORD='framesphere_password'
psql -h localhost -p 5432 -U framesphere_user -d framesphere << 'EOF'
INSERT INTO api_services (name, display_name, description, type, endpoint_url, status)
VALUES ('framespell', 'FrameSpell API', 'KI-gestützte Rechtschreib- und Grammatikprüfung', 'spelling', 'http://localhost:8000', 'active')
ON CONFLICT (name) DO NOTHING;
EOF
```

### Problem: "Connected accounts table doesn't exist" (500)
```bash
psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/reset-connected-accounts.sql
```

---

## 📝 Logs live mitverfolgen

```bash
# Terminal 1: FrameSphere Logs
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
tail -f backend.log

# Terminal 2: FrameSphere Frontend
tail -f frontend.log

# Terminal 3: FrameSpell läuft bereits im Terminal
# (zeigt Logs direkt an)
```

### Was du sehen solltest:

**Beim Dashboard laden**:
```
GET /api/dashboard/stats 200 OK
GET /api/api-keys 200 OK
GET /api/services 200 OK
GET /api/connected-accounts 200 OK
```

**Beim Account verbinden**:
```
Backend: POST /api/connected-accounts
Backend: Calling FrameSpell verify endpoint...
FrameSpell: POST /api/auth/verify-connection 200
Backend: Connection verified successfully
Backend: Stored in database
Response: 201 Created
```

---

## 🎉 Nach erfolgreicher Einrichtung

Du kannst jetzt:

✅ FrameSpell Account mit FrameSphere verbinden
✅ Dashboard zeigt alle verbundenen Accounts
✅ Statistiken von FrameSpell werden abgerufen
✅ API Keys für FrameSpell über FrameSphere verwalten
✅ Zentrale Übersicht über alle Dienste

---

## 📚 Weitere Dokumentation

| Datei | Beschreibung |
|-------|--------------|
| `README_QUICK_FIX.md` | Schnellübersicht (diese Datei) |
| `WAS_DU_JETZT_MACHEN_MUSST.md` | Ausführliche Anleitung |
| `FEHLERBEHEBUNG_ANLEITUNG.md` | Detaillierte Problemlösungen |
| `SCHNELLSTART.md` | Quick Start Guide |

---

## 🆘 Immer noch Probleme?

1. **Führe Fix-Script nochmal aus**:
   ```bash
   ./fix-account-connection.sh
   ```

2. **Prüfe alle Services**:
   ```bash
   curl http://localhost:3001/health  # FrameSphere Backend
   curl http://localhost:8000/health  # FrameSpell Backend
   curl http://localhost:3000         # FrameSphere Frontend
   ```

3. **Schaue in die Logs**:
   ```bash
   tail -f backend.log frontend.log
   ```

4. **Datenbank zurücksetzen**:
   ```bash
   psql -h localhost -p 5432 -U framesphere_user -d framesphere \
     -f backend/scripts/reset-connected-accounts.sql
   ```

---

## 🚀 Viel Erfolg!

Wenn alles funktioniert, solltest du jetzt eine voll funktionsfähige FrameSphere Installation mit FrameSpell Integration haben!

**Happy Coding! 🎊**
