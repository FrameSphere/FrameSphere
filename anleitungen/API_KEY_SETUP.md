# API Key Management Setup Anleitung

## 🎯 Übersicht
Das neue API Key Management System erlaubt die Erstellung von API Keys, die sowohl in FrameSphere als auch auf den externen Service-Plattformen (FrameSpell, CoreChain API, SphereNet) synchronisiert werden.

## 📦 Installation

### 1. Backend Dependencies installieren
```bash
cd backend
npm install
```

Dies installiert das neue `axios` Package für externe API-Kommunikation.

### 2. Datenbank Migration ausführen
```bash
cd backend
psql -U framesphere_user -d framesphere < src/database/migrations/add_service_to_api_keys.sql
```

**Oder manuell in psql:**
```bash
psql -U framesphere_user -d framesphere
```

Dann die Migration ausführen:
```sql
\i src/database/migrations/add_service_to_api_keys.sql
```

### 3. Backend neu starten
```bash
cd backend
npm run dev
```

### 4. Frontend neu starten
```bash
cd frontend
npm run dev
```

## 🔧 Konfiguration

### Service Endpoints konfigurieren

Die Datei `backend/src/services/externalServiceClient.js` enthält die Service-Konfiguration:

```javascript
const SERVICE_ENDPOINTS = {
  'framespell': {
    baseUrl: 'http://localhost:8000',  // ✅ FrameSpell läuft auf Port 8000
    healthEndpoint: '/health',
    apiKeysEndpoint: '/api/keys',
    verifyAccountEndpoint: '/api/auth/verify'
  },
  'corechain-api': {
    baseUrl: 'http://localhost:9000',  // ⚠️ Anpassen an tatsächlichen Port
    healthEndpoint: '/health',
    apiKeysEndpoint: '/api/keys',
    verifyAccountEndpoint: '/api/auth/verify'
  },
  'spherenet': {
    baseUrl: 'http://localhost:10000', // ⚠️ Anpassen an tatsächlichen Port
    healthEndpoint: '/health',
    apiKeysEndpoint: '/api/keys',
    verifyAccountEndpoint: '/api/auth/verify'
  }
};
```

**Wichtig:** Passe die Ports für CoreChain API und SphereNet an!

## 🗄️ Datenbankschema

Die Migration fügt folgende Spalten zur `api_keys` Tabelle hinzu:

- `service_id` - UUID, Referenz zu `api_services`
- `connected_account_id` - UUID, Referenz zu `connected_accounts`

## 🚀 Workflow

### 1. User verbindet seinen Service-Account
- Benutzer geht zu `/dashboard/connect-accounts`
- Wählt einen Service (z.B. FrameSpell)
- Authentifiziert sich beim Service
- Account wird als `connected_account` gespeichert

### 2. User erstellt API Key
- Benutzer klickt im Dashboard auf "Neuer Key"
- Wählt den Service aus (nur verbundene Services werden angezeigt)
- Gibt Key-Name und Optionen ein
- System führt aus:
  1. ✅ Überprüft ob Account verbunden ist
  2. ✅ Prüft ob Service verfügbar ist (Health Check)
  3. ✅ Verifiziert Account beim externen Service
  4. ✅ Erstellt API Key beim externen Service
  5. ✅ Speichert beide Keys in FrameSphere DB

### 3. Keys werden angezeigt
- Dashboard zeigt alle Keys mit Service-Information
- Beide Keys (FrameSphere + Extern) werden angezeigt
- Status ist synchronisiert

### 4. Key-Löschung
- Beim Löschen wird der Key aus beiden Systemen entfernt
- FrameSphere DB: Sofortiges Löschen
- Externer Service: Best-effort Löschung (falls Service verfügbar)

## 📡 Externe Service Requirements

Jeder externe Service (FrameSpell, CoreChain API, SphereNet) muss folgende Endpoints bereitstellen:

### 1. Health Check
```
GET /health
Response: { "status": "ok" }
```

### 2. Account Verification
```
POST /api/auth/verify
Headers: Authorization: Bearer <token>
Body: { "user_id": "<user_id>" }
Response: { "success": true }
```

### 3. API Key Creation
```
POST /api/keys
Headers: Authorization: Bearer <token>
Body: {
  "user_id": "<user_id>",
  "name": "Key Name",
  "permissions": {},
  "rate_limit": 1000
}
Response: {
  "id": "<key_id>",
  "key": "<api_key>",
  "success": true
}
```

### 4. API Key Deletion
```
DELETE /api/keys/:id
Headers: Authorization: Bearer <token>
Response: { "success": true }
```

## 🎨 UI Features

### Dashboard
- Service-Auswahl mit visuellen Icons
- Connection Status (Verbunden/Nicht verbunden)
- Warnung wenn Service nicht verbunden
- Link zu "Account verbinden"
- Anzeige beider Keys (FrameSphere + Extern)

### Create API Key Modal
- Service-Auswahl Cards
- Disabled State für nicht-verbundene Services
- Real-time Validierung
- Error Handling mit hilfreichen Messages
- Info-Box mit Erklärung des Sync-Prozesses

## 🔐 Sicherheit

- JWT-basierte Authentifizierung für externe Services
- Access Tokens werden sicher in `connected_accounts` gespeichert
- Externe API Calls haben 5 Sekunden Timeout
- Fehlerhafte externe Calls brechen den Prozess ab
- Rate Limits werden auf beiden Seiten enforced

## 🐛 Troubleshooting

### "Service ist momentan nicht erreichbar"
- Prüfe ob der externe Service läuft
- Überprüfe die baseUrl in `externalServiceClient.js`
- Teste den Health Endpoint manuell: `curl http://localhost:8000/health`

### "Account konnte nicht verifiziert werden"
- Access Token möglicherweise abgelaufen
- User muss Account neu verbinden
- Prüfe ob `/api/auth/verify` Endpoint funktioniert

### "Fehler beim Erstellen des API Keys"
- Prüfe Backend Logs für Details
- Verifiziere dass `/api/keys` Endpoint korrekt implementiert ist
- Stelle sicher dass User-ID korrekt übergeben wird

## 📝 Testing

### 1. Manueller Test
```bash
# Health Check
curl http://localhost:8000/health

# Create API Key (mit valid token)
curl -X POST http://localhost:8000/api/keys \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"user_id":"123","name":"Test","rate_limit":1000}'
```

### 2. Integration Test
1. Verbinde FrameSpell Account
2. Erstelle API Key im Dashboard
3. Verifiziere dass beide Keys erstellt wurden
4. Teste API Call mit FrameSphere Key
5. Lösche Key und verifiziere Löschung auf beiden Seiten

## 🎉 Fertig!

Das System ist jetzt bereit für den Einsatz. Sobald die externen Services die benötigten Endpoints implementiert haben, funktioniert die vollständige Synchronisation.

## 📋 Next Steps

1. ✅ Implementiere die API Endpoints in FrameSpell
2. ⏳ Implementiere die API Endpoints in CoreChain API
3. ⏳ Implementiere die API Endpoints in SphereNet
4. ⏳ Teste vollständigen Workflow
5. ⏳ Implementiere Success-Modal mit beiden Keys
6. ⏳ Füge Copy-Buttons für beide Keys hinzu
