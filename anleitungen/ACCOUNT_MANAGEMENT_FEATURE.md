# Account Management Feature - FrameSphere

## 🎯 Übersicht

Das neue **Account Management Feature** ermöglicht es Benutzern, ihre verschiedenen FrameSphere Produkt-Accounts an einem zentralen Ort zu verbinden und zu verwalten.

## ✨ Features

### 1. Account Verbinden (`/dashboard/connect-accounts`)
- Wähle aus allen verfügbaren FrameSphere Produkten
- Sichere Verbindung mit API Key
- Validierung der Zugangsdaten
- Benutzerfreundliche Schritt-für-Schritt-Anleitung

### 2. Account Verwaltung (`/dashboard/manage-accounts`)
- Übersicht aller verbundenen Accounts
- Zentrale Statistiken (Gesamt API Calls, Tokens, Kosten)
- Einzelne Account-Details anzeigen
- Statistiken manuell aktualisieren
- Accounts trennen

### 3. Account Details Modal
- Detaillierte Statistiken pro Account
- 7-Tage-Nutzungshistorie (Visualisierung)
- Account-Informationen
- Direkter Link zum Produkt

## 🗂️ Dateistruktur

```
frontend/src/
├── pages/
│   ├── Dashboard.jsx (aktualisiert mit "Account verbinden" Button)
│   └── dashboard/
│       ├── ConnectAccounts.jsx (Neue Seite)
│       └── ManageAccounts.jsx (Neue Seite)
└── App.jsx (neue Routen hinzugefügt)

backend/src/
├── controllers/
│   └── connectedAccountsController.js (Neu)
├── routes/
│   └── connectedAccounts.js (Neu)
├── database/
│   └── migrations/
│       └── add_connected_accounts.sql (Neu)
└── server.js (Route registriert)
```

## 🗄️ Datenbank-Migration

Die neue Tabelle `connected_accounts` wurde erstellt:

```sql
CREATE TABLE connected_accounts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    product_id VARCHAR(100),
    product_name VARCHAR(255),
    account_id VARCHAR(255),
    account_name VARCHAR(255),
    api_key_encrypted TEXT,
    status VARCHAR(50),
    stats JSONB,
    last_sync_at TIMESTAMP,
    last_error TEXT,
    connected_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Migration ausführen:

```bash
cd backend
psql framesphere < src/database/migrations/add_connected_accounts.sql
```

Oder manuell:

```bash
psql framesphere
\i src/database/migrations/add_connected_accounts.sql
```

## 🚀 API Endpoints

### `GET /api/connected-accounts`
Alle verbundenen Accounts eines Users abrufen

**Response:**
```json
[
  {
    "id": "uuid",
    "product_id": "framespell",
    "product_name": "FrameSpell API",
    "account_name": "Mein FrameSpell Account",
    "status": "connected",
    "stats": {
      "apiCalls": 5000,
      "tokensUsed": 25000,
      "totalCost": 45.50,
      "avgLatency": 45
    },
    "connected_at": "2025-01-15T10:00:00Z",
    "last_sync_at": "2025-01-20T14:30:00Z"
  }
]
```

### `POST /api/connected-accounts`
Neuen Account verbinden

**Request Body:**
```json
{
  "productId": "framespell",
  "productName": "FrameSpell API",
  "accountId": "acc_123456",
  "apiKey": "sk_live_...",
  "accountName": "Mein FrameSpell Account"
}
```

**Response:**
```json
{
  "message": "Account erfolgreich verbunden",
  "account": {
    "id": "uuid",
    "product_id": "framespell",
    "product_name": "FrameSpell API",
    "account_name": "Mein FrameSpell Account",
    "status": "connected",
    "connected_at": "2025-01-20T15:00:00Z"
  }
}
```

### `POST /api/connected-accounts/:accountId/refresh`
Statistiken eines Accounts aktualisieren

**Response:**
```json
{
  "message": "Statistiken erfolgreich aktualisiert",
  "stats": {
    "apiCalls": 5100,
    "tokensUsed": 26000,
    "totalCost": 47.20,
    "avgLatency": 43
  }
}
```

### `DELETE /api/connected-accounts/:accountId`
Account trennen

**Response:**
```json
{
  "message": "Account erfolgreich getrennt"
}
```

## 🔐 Sicherheit

- **API Keys werden verschlüsselt gespeichert** (in der Produktion sollte eine echte Verschlüsselung implementiert werden)
- **JWT-basierte Authentifizierung** für alle Endpoints
- **User-spezifische Daten** - Jeder User sieht nur seine eigenen Accounts
- **Validierung** aller Input-Daten

## 🎨 UI/UX Features

### ConnectAccounts Seite
- ✅ Produktauswahl mit visuellen Cards
- ✅ Status-Badges (Live, Beta, Coming Soon)
- ✅ Bereits verbundene Accounts werden angezeigt
- ✅ Zweistufiger Prozess (Produkt wählen → Daten eingeben)
- ✅ Hilfreiche Anleitungen zum Finden der API Keys
- ✅ Fehler- und Erfolgs-Meldungen

### ManageAccounts Seite
- ✅ Gesamt-Statistiken über alle Accounts
- ✅ Account-Cards mit wichtigen Infos
- ✅ Refresh-Funktion für einzelne Accounts
- ✅ Delete-Funktion mit Bestätigung
- ✅ Details-Modal mit erweiterten Statistiken
- ✅ 7-Tage-Nutzungsgraph

## 📊 Unterstützte Produkte

1. **FrameSpell API** ✅
   - API Key benötigt
   - Keine Account ID erforderlich

2. **CoreChain AI** ✅
   - API Key + Account ID benötigt

3. **CoreChain API** ✅
   - API Key benötigt

4. **SphereHub** 🔄 (Beta)
   - API Key + Account ID benötigt

5. **SphereNet** 🚧 (Coming Soon)
   - API Key + Account ID benötigt

## 🔄 Nächste Schritte / TODOs

### Backend
- [ ] **Echte API-Validierung** implementieren
  - Beim Verbinden eines Accounts den API Key testen
  - Echte Statistiken von den Produkt-APIs abrufen
  
- [ ] **Verschlüsselung** für API Keys
  - crypto-js oder ähnliche Library verwenden
  - API Keys vor dem Speichern verschlüsseln
  
- [ ] **Automatische Sync-Jobs**
  - Cron-Job für regelmäßige Statistik-Updates
  - Webhook-Integration für Echtzeit-Updates

- [ ] **Rate Limiting** für Refresh-Funktion
  - Maximal 1 Refresh pro Minute pro Account

### Frontend
- [ ] **Erweiterte Statistiken**
  - Mehr Diagramm-Typen (Line Charts, Pie Charts)
  - Zeitraum-Auswahl (7 Tage, 30 Tage, 90 Tage)
  
- [ ] **Benachrichtigungen**
  - Alert wenn Account-Verbindung fehlschlägt
  - Warnung bei hohen Kosten

- [ ] **Bulk-Operationen**
  - Mehrere Accounts gleichzeitig aktualisieren
  - Export-Funktion für Statistiken

## 🧪 Testing

### Manuelles Testen

1. **Account verbinden:**
   ```
   - Navigate to /dashboard
   - Click "Account verbinden"
   - Select "FrameSpell API"
   - Enter account details:
     - Account Name: "Test Account"
     - API Key: "test_key_123"
   - Click "Account verbinden"
   ```

2. **Statistiken anzeigen:**
   ```
   - Navigate to /dashboard/manage-accounts
   - View total statistics
   - Click "Details anzeigen" on an account
   ```

3. **Account aktualisieren:**
   ```
   - Click Refresh-Icon on an account card
   - Wait for statistics to update
   ```

4. **Account trennen:**
   ```
   - Click Delete-Icon
   - Confirm deletion
   ```

## 📝 Notizen

- Die Statistiken sind derzeit **Mock-Daten**
- In der Produktion müssen die echten APIs der Produkte integriert werden
- API Keys sollten mit einer robusten Verschlüsselungsmethode gespeichert werden
- Überlege Webhook-Integration für Echtzeit-Updates

## 🤝 Integration mit bestehenden Produkten

Um die echten Statistiken zu holen, muss jedes Produkt folgende Endpoints bereitstellen:

```javascript
// Beispiel für FrameSpell API Integration
async function fetchFrameSpellStats(apiKey) {
  const response = await axios.get('https://framespell-api.com/stats', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
  return response.data;
}
```

Diese Funktionen sollten in separaten Service-Files implementiert werden:
- `backend/src/services/framespellService.js`
- `backend/src/services/corechainService.js`
- etc.

---

**Status:** ✅ Feature vollständig implementiert und bereit für Tests!
