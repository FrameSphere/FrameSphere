# FrameSpell Account Verbindung - Fehler Behebung

## Probleme die behoben wurden:

1. ❌ **Port-Konflikte**: Backend lief auf 5001, Frontend erwartete Port 3000
2. ❌ **Datenbankschema-Diskrepanz**: `connected_accounts` Tabelle hatte falsche Spalten
3. ❌ **Route Parameter Mismatch**: Route nutzte `:accountId`, Controller erwartete `:id`
4. ❌ **CORS-Konfiguration**: Frontend-URL war falsch konfiguriert

## ✅ Schritt-für-Schritt Anleitung zur Behebung:

### 1. Backend neustarten

Das Backend läuft jetzt auf **Port 3001** (statt 5001)

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/backend
npm start
```

Backend sollte nun auf **http://localhost:3001** laufen.

### 2. Datenbank Schema korrigieren

Die `connected_accounts` Tabelle muss neu erstellt werden:

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/backend

# Mit PostgreSQL verbinden
psql -h localhost -p 5432 -U framesphere_user -d framesphere

# Im psql Terminal:
\i scripts/reset-connected-accounts.sql

# Oder direkt:
psql -h localhost -p 5432 -U framesphere_user -d framesphere -f scripts/reset-connected-accounts.sql
```

**Passwort**: `framesphere_password`

### 3. Frontend neustarten

Das Frontend läuft auf **Port 3000** und verbindet sich mit Backend auf Port 3001:

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/frontend
npm start
# oder
npm run dev
```

Frontend sollte auf **http://localhost:3000** laufen.

### 4. FrameSpell API verifizieren

Stelle sicher, dass FrameSpell läuft:

```bash
cd /Users/karol/Desktop/Laufende_Projekte/Rechtschreibe_API/webapp/backend

# Backend starten (falls nicht schon läuft)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

FrameSpell sollte auf **http://localhost:8000** laufen.

## 🔍 Was wurde geändert:

### Backend (.env)
```env
PORT=3001  # Vorher: 5001
CORS_ORIGIN=http://localhost:3000  # Vorher: 5173
FRONTEND_URL=http://localhost:3000  # Vorher: 5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api  # Vorher: 5001
```

### Datenbank Schema
Die `connected_accounts` Tabelle nutzt jetzt:
- `service_id` (UUID, Foreign Key zu api_services)
- `access_token` (verschlüsselter API Key)
- `metadata` (JSONB für zusätzliche Daten)

### Backend Routes
Die Routen nutzen jetzt konsistent `:id` statt `:accountId`:
- `POST /api/connected-accounts/:id/refresh`
- `DELETE /api/connected-accounts/:id`

## 🧪 Testen:

### 1. Teste FrameSpell Verbindung

1. Gehe zu **http://localhost:3000/dashboard/connect-accounts**
2. Wähle **FrameSpell API**
3. Gib folgende Daten ein:
   - Account-Name: "Mein FrameSpell Test Account"
   - API Key: Dein echter FrameSpell API Key (aus FrameSpell Dashboard)
   
4. Klicke auf "Account verbinden"

### 2. Überprüfe Dashboard

Nach erfolgreicher Verbindung solltest du auf **http://localhost:3000/dashboard** deine verbundenen Accounts sehen.

## 🔧 Debugging:

### Backend Logs anschauen:
```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
tail -f backend.log
```

### Frontend Logs:
```bash
tail -f frontend.log
```

### Datenbank prüfen:
```sql
-- Verbundene Accounts anzeigen
SELECT 
    ca.*,
    s.name as service_name,
    u.email as user_email
FROM connected_accounts ca
JOIN api_services s ON ca.service_id = s.id
JOIN users u ON ca.user_id = u.id;

-- API Services anzeigen
SELECT * FROM api_services WHERE name = 'framespell';
```

## 📊 Port Übersicht:

| Service | Port | URL |
|---------|------|-----|
| FrameSphere Frontend | 3000 | http://localhost:3000 |
| FrameSphere Backend | 3001 | http://localhost:3001 |
| FrameSpell Backend | 8000 | http://localhost:8000 |
| FrameSpell Frontend | 8080 | http://localhost:8080 |
| PostgreSQL | 5432 | localhost:5432 |

## ❗ Häufige Fehler:

### Fehler: "Request failed with status code 500"
**Lösung**: Datenbank Schema ist nicht aktuell
```bash
psql -h localhost -p 5432 -U framesphere_user -d framesphere -f scripts/reset-connected-accounts.sql
```

### Fehler: "Request failed with status code 404"
**Lösung**: Backend läuft nicht oder falsche URL
- Prüfe ob Backend auf Port 3001 läuft
- Prüfe `.env` Dateien

### Fehler: "CORS error"
**Lösung**: Frontend-URL in Backend .env korrigieren
```env
CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000
```

### Fehler: "Service nicht gefunden"
**Lösung**: api_services Tabelle füllen
```sql
INSERT INTO api_services (name, display_name, description, type, endpoint_url, status)
VALUES 
    ('framespell', 'FrameSpell API', 'KI-gestützte Rechtschreib- und Grammatikprüfung', 'spelling', 'http://localhost:8000', 'active')
ON CONFLICT (name) DO NOTHING;
```

## ✅ Erfolgskriterien:

Alles funktioniert, wenn:
1. ✅ Frontend läuft auf http://localhost:3000
2. ✅ Backend läuft auf http://localhost:3001
3. ✅ Keine Konsolenfehler beim Laden des Dashboards
4. ✅ "Account verbinden" Seite lädt ohne Fehler
5. ✅ FrameSpell Account kann erfolgreich verbunden werden
6. ✅ Dashboard zeigt verbundene Accounts an

## 🚀 Nächste Schritte:

Nach erfolgreicher Verbindung:
1. Teste Statistik-Refresh (auf Dashboard)
2. Teste Disconnect Funktion
3. Verbinde weitere Services (wenn verfügbar)
