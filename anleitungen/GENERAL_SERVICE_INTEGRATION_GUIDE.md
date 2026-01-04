# 🌐 FrameSphere Integration - Allgemeine Anleitung für alle Services

## 📋 Übersicht

Diese Anleitung erklärt, wie **jeder Service** (CoreChain API, SphereHub, SphereNet, etc.) die FrameSphere-Integration implementieren soll.

---

## 🎯 Was muss jeder Service implementieren?

### Pflicht-Endpoints (3 Stück):

1. **POST** `/api/auth/verify-connection` - Verbindung verifizieren
2. **GET** `/api/stats/usage` - Statistiken abrufen
3. **POST** `/api/sync/framesphere` - Synchronisation

### Optional aber empfohlen:

4. **POST** `/api/webhooks/notify-framesphere` - Real-time Updates

---

## 📡 Endpoint-Spezifikationen

### 1. Verify Connection

**Endpoint:** `POST /api/auth/verify-connection`

**Request:**
```json
{
  "api_key": "string",
  "account_id": "string (optional)",
  "source": "framesphere"
}
```

**Response (Success):**
```json
{
  "success": true,
  "user_id": "string|number",
  "email": "string",
  "subscription_type": "free|professional|enterprise",
  "premium": boolean,
  "verified_at": "2025-01-07T12:00:00Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid API key or inactive account"
}
```

**Logik:**
- Prüfe ob API Key existiert
- Prüfe ob Account aktiv ist
- Gib User-Informationen zurück

---

### 2. Usage Statistics

**Endpoint:** `GET /api/stats/usage`

**Headers:**
```
Authorization: Bearer {api_key}
```

**Response:**
```json
{
  "success": true,
  "user_id": "string|number",
  "subscription_type": "free",
  "today": {
    "requests": 100,
    "cost": 5.50,
    "tokens_used": 1000 (optional)
  },
  "month": {
    "requests": 2500,
    "cost": 125.00,
    "tokens_used": 25000 (optional)
  },
  "last_7_days": {
    "2025-01-01": {"requests": 50, "cost": 2.5},
    "2025-01-02": {"requests": 75, "cost": 3.75}
  },
  "total_usage": 10000
}
```

**Logik:**
- Authentifiziere User via API Key
- Hole Nutzungsdaten aus Datenbank
- Gruppiere nach Tag für letzte 7 Tage
- Berechne Gesamt-Statistiken

---

### 3. FrameSphere Sync

**Endpoint:** `POST /api/sync/framesphere`

**Request:**
```json
{
  "framesphere_user_id": "uuid-or-string",
  "connection_id": "uuid",
  "api_key": "string",
  "sync_type": "connect|disconnect|update"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Connection synchronized",
  "status": "active|disconnected"
}
```

**Logik:**
- Bei `connect`: Erstelle Connection-Eintrag in DB
- Bei `disconnect`: Markiere Connection als inaktiv
- Bei `update`: Aktualisiere Connection-Daten

---

### 4. Real-time Notifications (Optional)

**Endpoint:** `POST /api/webhooks/notify-framesphere`

**Wird aufgerufen wenn:**
- Neue API-Anfrage gemacht wurde
- Quota überschritten
- Fehler aufgetreten

**Request an FrameSphere:**
```json
{
  "service": "framespell|corechain|spherenet|spherehub",
  "user_id": "string",
  "event_type": "usage|error|quota_exceeded",
  "data": {
    "requests": 1,
    "cost": 0.01,
    "timestamp": "2025-01-07T12:00:00Z"
  }
}
```

**FrameSphere Webhook URL:**
```
POST http://localhost:5001/api/webhooks/usage
```

---

## 🗄️ Datenbank-Tabelle

Jeder Service sollte diese Tabelle erstellen:

### framesphere_connections

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | INTEGER/UUID | Primary Key |
| user_id | INTEGER/STRING | Lokale User ID |
| framesphere_user_id | STRING | FrameSphere User ID |
| connection_id | STRING | Eindeutige Connection ID |
| connected_at | TIMESTAMP | Verbindungszeitpunkt |
| last_sync_at | TIMESTAMP | Letzte Synchronisation |
| status | STRING | active, disconnected |
| metadata | JSON/TEXT | Zusätzliche Daten |

**SQL (SQLite):**
```sql
CREATE TABLE framesphere_connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    framesphere_user_id TEXT NOT NULL,
    connection_id TEXT UNIQUE NOT NULL,
    connected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_sync_at DATETIME,
    status TEXT DEFAULT 'active',
    metadata TEXT
);
```

**SQL (PostgreSQL):**
```sql
CREATE TABLE framesphere_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INTEGER NOT NULL,
    framesphere_user_id VARCHAR(255) NOT NULL,
    connection_id VARCHAR(255) UNIQUE NOT NULL,
    connected_at TIMESTAMP DEFAULT NOW(),
    last_sync_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    metadata JSONB
);
```

---

## 🔧 Port-Konfiguration

| Service | Port | Status |
|---------|------|--------|
| FrameSpell API | 8000 | ✅ Live |
| CoreChain AI | 9000 | ⏳ To be implemented |
| CoreChain API | 9001 | ⏳ To be implemented |
| SphereHub | 10000 | ⏳ To be implemented |
| SphereNet | 10001 | ⏳ To be implemented |
| FrameSphere Backend | 5001 | ✅ Live |
| FrameSphere Frontend | 5173 | ✅ Live |

---

## 📝 Implementation Checkliste

Für jeden Service:

### Phase 1: Grundlegende Integration
- [ ] Port konfiguriert und dokumentiert
- [ ] `/api/auth/verify-connection` implementiert
- [ ] `/api/stats/usage` implementiert
- [ ] `/api/sync/framesphere` implementiert
- [ ] `framesphere_connections` Tabelle erstellt
- [ ] Error Handling für alle Endpoints
- [ ] Logging für alle FrameSphere-Interaktionen

### Phase 2: Testing
- [ ] Alle Endpoints mit curl getestet
- [ ] Connection von FrameSphere Dashboard getestet
- [ ] Statistiken werden korrekt angezeigt
- [ ] Disconnect funktioniert
- [ ] Error Cases getestet

### Phase 3: Optimierung
- [ ] Rate Limiting implementiert
- [ ] Caching für Statistiken
- [ ] Webhook für Real-time Updates (optional)
- [ ] Monitoring und Alerts
- [ ] Performance-Optimierung

---

## 🧪 Test-Szenarien

### Szenario 1: Account verbinden
1. User geht zu FrameSphere Dashboard
2. Klickt "Account verbinden"
3. Wählt deinen Service aus
4. Gibt API Key ein
5. FrameSphere ruft `/verify-connection` auf
6. Dein Service verifiziert den Key
7. Connection wird in beiden DBs gespeichert

### Szenario 2: Statistiken abrufen
1. FrameSphere ruft `/stats/usage` auf
2. Dein Service gibt aktuelle Nutzungsdaten zurück
3. FrameSphere zeigt sie im Dashboard an

### Szenario 3: API-Anfrage
1. User macht API-Anfrage an deinen Service
2. Dein Service loggt die Nutzung
3. (Optional) Sendet Webhook an FrameSphere
4. Statistiken werden aktualisiert

### Szenario 4: Account trennen
1. User klickt "Trennen" in FrameSphere
2. FrameSphere ruft `/sync/framesphere` mit `disconnect` auf
3. Dein Service markiert Connection als inaktiv
4. Connection wird aus FrameSphere DB gelöscht

---

## 🔒 Sicherheit

### API Key Validierung
- **Immer** API Key gegen Datenbank prüfen
- Prüfe ob Account aktiv ist
- Rate Limiting implementieren

### Error Handling
- Gib **keine** sensitiven Daten in Errors zurück
- Logge Fehler server-seitig
- Gib klare, hilfreiche Fehlermeldungen

### Timeouts
- Setze Timeout für alle externen Calls (3-5 Sekunden)
- Handle Timeouts gracefully
- Verwende async/non-blocking calls wo möglich

---

## 📊 Monitoring

### Was loggen?
- Alle FrameSphere API Calls
- Verification Erfolge/Fehler
- Sync-Operationen
- Statistik-Abrufe
- Fehler und Exceptions

### Log-Format
```
[FRAMESPHERE] 2025-01-07 12:00:00 - verify_connection - user_id: 123 - success
[FRAMESPHERE] 2025-01-07 12:01:00 - stats_usage - user_id: 123 - requests: 100
[FRAMESPHERE] 2025-01-07 12:02:00 - sync - connection_id: abc - type: connect
```

---

## 🎨 Service-spezifische Anpassungen

### FrameSpell (Rechtschreibprüfung)
- **Statistiken**: Anfragen, korrigierte Texte, Fehleranzahl
- **Besonderheit**: Sprach-spezifische API Keys

### CoreChain AI (KI-Orchestrierung)
- **Statistiken**: Workflows, verwendete Tokens, Modelle
- **Besonderheit**: Multi-Step Processing

### CoreChain API (Developer API)
- **Statistiken**: API Calls, Endpoints, Response Times
- **Besonderheit**: Entwickler-spezifische Metriken

### SphereHub (Smart Home)
- **Statistiken**: Geräte, Automationen, Ausführungen
- **Besonderheit**: Lokale vs. Cloud-Verarbeitung

### SphereNet (KI-Netzwerk)
- **Statistiken**: Modell-Nutzung, Netzwerk-Calls
- **Besonderheit**: Community-Modelle

---

## 💻 Code-Templates

### Python/FastAPI Template

```python
from fastapi import FastAPI, HTTPException, Header, Depends
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

class VerifyConnectionRequest(BaseModel):
    api_key: str
    account_id: str = None
    source: str = "framesphere"

@app.post("/api/auth/verify-connection")
async def verify_connection(request: VerifyConnectionRequest):
    # Implementierung hier
    pass

@app.get("/api/stats/usage")
async def get_usage_stats(authorization: str = Header(None)):
    # Implementierung hier
    pass

@app.post("/api/sync/framesphere")
async def sync_with_framesphere(request: dict):
    # Implementierung hier
    pass
```

### Node.js/Express Template

```javascript
const express = require('express');
const app = express();

app.post('/api/auth/verify-connection', async (req, res) => {
  // Implementierung hier
});

app.get('/api/stats/usage', async (req, res) => {
  // Implementierung hier
});

app.post('/api/sync/framesphere', async (req, res) => {
  // Implementierung hier
});
```

---

## 🚀 Deployment Checkliste

- [ ] Service läuft auf konfiguriertem Port
- [ ] Endpoints sind öffentlich erreichbar
- [ ] CORS ist konfiguriert (erlaubt FrameSphere)
- [ ] Logs werden geschrieben
- [ ] Monitoring ist aktiv
- [ ] Error Handling funktioniert
- [ ] Rate Limiting ist aktiv
- [ ] Datenbank-Backups laufen

---

## 📞 Support & Debugging

### Häufige Probleme

**Problem:** "Connection verification failed"
- **Lösung**: Prüfe ob API Key korrekt ist, Service erreichbar, und Endpoint implementiert

**Problem:** "Stats not updating"
- **Lösung**: Prüfe ob Usage-Logging funktioniert, `/stats/usage` korrekte Daten zurückgibt

**Problem:** "CORS Error"
- **Lösung**: Füge `http://localhost:5173` und `http://localhost:5001` zu CORS allowed origins hinzu

**Problem:** "Timeout"
- **Lösung**: Erhöhe Timeout, optimiere DB-Queries, implementiere Caching

---

## 📚 Weitere Ressourcen

- `FRAMESPELL_INTEGRATION_ENDPOINTS.md` - Detaillierte FrameSpell Beispiele
- `PROMPT_FOR_FRAMESPELL.md` - Claude Prompts für Implementierung
- `API_KEY_SETUP.md` - API Key Management System
- `IMPLEMENTATION_COMPLETE.md` - Übersicht aller Änderungen

---

**Version**: 1.0
**Letzte Aktualisierung**: 2025-01-07
**Status**: Production Ready ✅
