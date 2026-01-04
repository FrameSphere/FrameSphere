# 🔑 API Key Management System - Quick Start

## Zusammenfassung

Das API Key Management System ermöglicht die Erstellung von API Keys, die automatisch zwischen FrameSphere und den externen Services (FrameSpell, CoreChain API, SphereNet) synchronisiert werden.

## ⚡ Schnellstart

### 1. Setup ausführen

```bash
cd backend
chmod +x setup-api-keys.sh
./setup-api-keys.sh
```

Das Script führt automatisch aus:
- ✅ Installation von axios
- ✅ Datenbank-Migration (service_id, connected_account_id)
- ✅ Setup-Bestätigung

### 2. Backend starten

```bash
cd backend
npm run dev
```

### 3. Frontend starten (neues Terminal)

```bash
cd frontend
npm run dev
```

## 🎯 Verwendung

### Im Dashboard:

1. **Account verbinden**: `/dashboard/connect-accounts`
   - Wähle Service (FrameSpell, CoreChain API, oder SphereNet)
   - Authentifiziere dich beim Service
   
2. **API Key erstellen**: Dashboard → "Neuer Key"
   - Wähle den verbundenen Service
   - Gib Key-Namen und Optionen ein
   - System erstellt Keys auf beiden Plattformen

3. **Keys verwalten**: Dashboard
   - Siehe alle Keys mit Service-Info
   - Kopiere FrameSphere Key oder External Key
   - Lösche Keys (löscht auf beiden Seiten)

## 📡 Externe Service Endpoints (erforderlich)

Jeder externe Service muss implementieren:

```
GET  /health                    → Health Check
POST /api/auth/verify           → Account Verifizierung
POST /api/keys                  → API Key erstellen
DELETE /api/keys/:id            → API Key löschen
```

## 🔧 Konfiguration

### Service URLs anpassen

Datei: `backend/src/services/externalServiceClient.js`

```javascript
const SERVICE_ENDPOINTS = {
  'framespell': {
    baseUrl: 'http://localhost:8000',  // ✅ Bereits konfiguriert
    // ...
  },
  'corechain-api': {
    baseUrl: 'http://localhost:9000',  // ⚠️ Anpassen!
    // ...
  },
  'spherenet': {
    baseUrl: 'http://localhost:10000', // ⚠️ Anpassen!
    // ...
  }
};
```

## 🎨 Neue Komponenten

### Backend:
- `src/services/externalServiceClient.js` - Service-Kommunikation
- `src/controllers/apiKeysController.js` - Erweitert mit Service-Integration
- `src/database/migrations/add_service_to_api_keys.sql` - DB Migration

### Frontend:
- `src/components/CreateApiKeyModal.jsx` - Neues Modal mit Service-Auswahl

### Dashboard Updates:
- Service-Filter
- Connection Status
- Dual-Key Anzeige (FrameSphere + External)

## 🔒 Sicherheitsfeatures

- ✅ Account-Verifizierung vor Key-Erstellung
- ✅ Service Health Check
- ✅ JWT-basierte externe Auth
- ✅ Timeout für externe Calls (5s)
- ✅ Sichere Token-Speicherung
- ✅ Synchrone Löschung auf beiden Seiten

## 📝 Testing

```bash
# 1. Health Check testen
curl http://localhost:8000/health

# 2. FrameSphere Backend testen
curl http://localhost:5001/health

# 3. Services Liste abrufen
curl http://localhost:5001/api/services \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🐛 Häufige Probleme

### "Service ist momentan nicht erreichbar"
**Lösung**: Stelle sicher, dass der externe Service läuft:
```bash
curl http://localhost:8000/health
```

### "Account konnte nicht verifiziert werden"
**Lösung**: Verbinde den Account neu unter `/dashboard/connect-accounts`

### CORS Fehler
**Lösung**: Backend .env überprüfen:
```
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

## 📚 Vollständige Dokumentation

Siehe: `API_KEY_SETUP.md` für detaillierte Informationen.

## 🎉 Status

- ✅ Backend API komplett
- ✅ Frontend UI komplett
- ✅ FrameSphere DB Integration
- ✅ External Service Client
- ⏳ FrameSpell Endpoints (zu implementieren)
- ⏳ CoreChain API Endpoints (zu implementieren)
- ⏳ SphereNet Endpoints (zu implementieren)

## 🚀 Nächste Schritte

1. Implementiere die 4 API Endpoints in **FrameSpell** (Port 8000)
2. Implementiere die 4 API Endpoints in **CoreChain API**
3. Implementiere die 4 API Endpoints in **SphereNet**
4. Teste End-to-End Flow
5. Deploy to Production
