# 🤖 Prompt für FrameSpell API Integration

Kopiere diesen Prompt und verwende ihn in einem neuen Claude Chat für die FrameSpell API:

---

## PROMPT START

Ich habe ein FastAPI Backend für meine Rechtschreib-API (FrameSpell) in `Laufende_Projekte/Rechtschreibe_API/webapp/backend/main.py`.

Ich möchte es mit meiner FrameSphere Plattform integrieren. FrameSphere ist eine zentrale Verwaltungsplattform für mehrere API-Services.

**Was ich brauche:**

Implementiere diese 3 Endpoints in meine FastAPI App (main.py):

### 1. `/api/auth/verify-connection` (POST)
- **Zweck**: FrameSphere verifiziert, ob ein API Key gültig ist
- **Input**: `{"api_key": "string", "account_id": "string (optional)", "source": "framesphere"}`
- **Output**: `{"success": true, "user_id": int, "email": "string", "subscription_type": "string", "premium": bool, "verified_at": "ISO timestamp"}`
- **Logik**: Prüfe ob API Key in der `users` Tabelle existiert und User aktiv ist

### 2. `/api/stats/usage` (GET)
- **Zweck**: FrameSphere ruft Nutzungsstatistiken ab
- **Auth**: `Authorization: Bearer {api_key}` Header
- **Output**: 
```json
{
  "success": true,
  "user_id": 1,
  "subscription_type": "free",
  "today": {"requests": 10, "cost": 0.5},
  "month": {"requests": 250, "cost": 15.0},
  "last_7_days": {
    "2025-01-01": {"requests": 20, "cost": 1.0},
    "2025-01-02": {"requests": 15, "cost": 0.75}
  },
  "total_usage": 1000
}
```
- **Logik**: Hole Daten aus der `api_usage` Tabelle, gruppiert nach Tag

### 3. `/api/sync/framesphere` (POST)
- **Zweck**: FrameSphere benachrichtigt über Connection-Änderungen
- **Input**: `{"framesphere_user_id": "string", "connection_id": "string", "api_key": "string", "sync_type": "connect|disconnect"}`
- **Output**: `{"success": true, "message": "Connection synchronized", "status": "active"}`
- **Logik**: 
  - Erstelle neue DB-Tabelle `framesphere_connections` mit Feldern: id, user_id, framesphere_user_id, connection_id, connected_at, last_sync_at, status, metadata
  - Bei `sync_type="connect"`: Erstelle/Aktualisiere Connection
  - Bei `sync_type="disconnect"`: Setze status auf "disconnected"

**Zusätzliche Anforderungen:**
- Alle Endpoints brauchen Error Handling
- Logge alle Requests mit `logger.info()`
- Validiere API Keys gegen die `users` Tabelle
- Erstelle die neue `framesphere_connections` Tabelle mit SQLAlchemy
- Die Tabelle sollte automatisch mit `Base.metadata.create_all(bind=engine)` erstellt werden

**Vorhandene Struktur:**
- Ich habe bereits eine `User` Tabelle mit Feldern: id, email, api_key, is_active, subscription_type, premium
- Ich habe bereits eine `APIUsage` Tabelle mit Feldern: id, user_id, timestamp, tokens_used, cost
- Ich verwende SQLAlchemy und SessionLocal für DB-Zugriff

**Was ich NICHT brauche:**
- Keine Payment-Integration
- Keine Email-Benachrichtigungen
- Keine komplexe Authentifizierung (nur API Key Check)

Implementiere diese 3 Endpoints und die neue Tabelle in meiner bestehenden main.py. Zeige mir den Code zum Einfügen.

---

## PROMPT ENDE

---

# Alternative: Direkter Code-Einfüge-Prompt

Falls du lieber direkt Code haben möchtest:

---

## PROMPT START (DIREKTER CODE)

Ich habe eine FastAPI App in `Laufende_Projekte/Rechtschreibe_API/webapp/backend/main.py`.

Erstelle diese 4 Code-Blöcke die ich einfügen kann:

**1. Neue Pydantic Models** (nach den bestehenden Models):
```python
# Füge hier die Pydantic Models für die 3 Endpoints ein
```

**2. Neue SQLAlchemy Tabelle** (nach User und APIUsage):
```python
class FrameSphereConnection(Base):
    __tablename__ = "framesphere_connections"
    # Füge Felder hier ein
```

**3. Die 3 Endpoints**:
- POST `/api/auth/verify-connection`
- GET `/api/stats/usage`  
- POST `/api/sync/framesphere`

Jeder Endpoint sollte:
- Vollständig funktional sein
- Error Handling haben
- API Key validieren
- In bestehende SQLAlchemy DB-Struktur passen
- Mit `logger.info()` loggen

**Kontext:**
- Vorhandene Tabellen: `User` (mit api_key, subscription_type, premium), `APIUsage` (mit user_id, timestamp, tokens_used, cost)
- DB: SQLite mit SQLAlchemy
- Dependencies: `get_db()` für Session, `logger` für Logging
- Auth: API Key aus Request Body oder Authorization Header

Gib mir den Code in 4 separaten Blöcken die ich copy-paste kann.

---

## PROMPT ENDE

---

# 📝 Für andere Services (CoreChain API, SphereNet, etc.)

Verwende den gleichen Prompt, ersetze nur:
- "FrameSpell" → "CoreChain API" / "SphereNet" / "SphereHub"
- Port 8000 → 9000 / 9001 / 10000 / 10001
- Service-spezifische Statistiken

**Beispiel für CoreChain API:**
```
Ich habe ein Node.js/Express Backend für meine CoreChain API...
Implementiere diese 3 Endpoints für die FrameSphere Integration:
1. POST /api/auth/verify-connection
2. GET /api/stats/usage
3. POST /api/sync/framesphere
```

---

# 🎯 Nach der Implementierung

Wenn die Endpoints implementiert sind, teste sie:

```bash
# 1. Backend starten
cd Laufende_Projekte/Rechtschreibe_API/webapp/backend
source venv/bin/activate
python main.py

# 2. Test verify-connection
curl -X POST http://localhost:8000/api/auth/verify-connection \
  -H "Content-Type: application/json" \
  -d '{"api_key":"DEIN_FRAMESPELL_API_KEY","source":"framesphere"}'

# 3. Test stats
curl http://localhost:8000/api/stats/usage \
  -H "Authorization: Bearer DEIN_FRAMESPELL_API_KEY"

# 4. Test sync
curl -X POST http://localhost:8000/api/sync/framesphere \
  -H "Content-Type: application/json" \
  -d '{"framesphere_user_id":"test123","connection_id":"conn123","api_key":"DEIN_API_KEY","sync_type":"connect"}'
```

Wenn alle 3 Tests funktionieren, dann:
1. Gehe zurück zu FrameSphere
2. Starte FrameSphere Backend: `cd FrameSphere/backend && npm run dev`
3. Versuche einen Account zu verbinden unter: http://localhost:5173/dashboard/connect-accounts

---

# 📚 Weitere Dokumentation

Siehe auch:
- `FRAMESPELL_INTEGRATION_ENDPOINTS.md` - Detaillierte Endpoint-Spezifikation
- `API_KEY_SETUP.md` - Vollständiges Setup für API Key System
- `IMPLEMENTATION_COMPLETE.md` - Übersicht aller Änderungen

---

**Viel Erfolg! 🚀**
