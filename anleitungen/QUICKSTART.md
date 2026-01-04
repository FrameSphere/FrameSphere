# FrameSphere - Quick Start Guide

## 🎯 Was ist FrameSphere?

FrameSphere ist eine professionelle AI Orchestration Platform mit:
- ✅ Vollständigem Frontend (React + Tailwind)
- ✅ REST API Backend (Node.js + Express)
- ✅ PostgreSQL Datenbank
- ✅ JWT Authentifizierung
- ✅ API Key Management
- ✅ Dashboard mit Statistiken
- ✅ Erweiterbar für alle deine Projekte

## 🚀 Schnellstart (3 Minuten)

### Option 1: Automatisches Setup (empfohlen)

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere

# Setup Script ausführbar machen
chmod +x setup.sh

# Setup starten
./setup.sh
```

### Option 2: Manuelles Setup

#### 1. Datenbank erstellen
```bash
# PostgreSQL Terminal öffnen
psql postgres

# Datenbank erstellen
CREATE DATABASE framesphere;
CREATE USER framesphere_user WITH PASSWORD 'dein_passwort';
GRANT ALL PRIVILEGES ON DATABASE framesphere TO framesphere_user;
\q
```

#### 2. Backend starten
```bash
cd backend
npm install
cp .env.example .env
# Bearbeite .env mit deinen DB-Credentials
npm run db:migrate
npm run db:seed
npm run dev
```

#### 3. Frontend starten (neues Terminal)
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Mit Docker (einfachste Methode)

```bash
# Alles mit einem Befehl starten
docker-compose up
```

## 🔑 Demo Login

Nach dem Database Seeding:
```
E-Mail: demo@framesphere.dev
Passwort: demo123456
```

## 📍 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## 📂 Projektstruktur

```
FrameSphere/
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/   # Navbar, Footer, etc.
│   │   ├── pages/        # Home, Login, Dashboard
│   │   ├── context/      # Auth Context
│   │   └── utils/        # API Client
│   └── package.json
│
├── backend/               # Node.js Backend
│   ├── src/
│   │   ├── config/       # Database Config
│   │   ├── controllers/  # Business Logic
│   │   ├── routes/       # API Routes
│   │   ├── middleware/   # Auth, Validation
│   │   └── database/     # Schema & Migrations
│   └── package.json
│
├── docs/                  # Dokumentation
├── docker-compose.yml     # Docker Setup
└── README.md              # Hauptdokumentation
```

## 🎨 Features

### Bereits implementiert:
- ✅ Benutzer-Registrierung & Login
- ✅ JWT Authentifizierung
- ✅ Dashboard mit Statistiken
- ✅ API Key Verwaltung
- ✅ Service Management
- ✅ Responsive Design
- ✅ Dark Mode
- ✅ PostgreSQL Datenbank
- ✅ Erweiterbare Architektur

### Bereit für Integration:
- 🔄 FrameSpell API
- 🔄 CoreChain AI
- 🔄 CoreChain API
- 🔄 SphereHub
- 🔄 SphereNet

## 🛠️ Entwicklung

### Neue API hinzufügen

1. **Service in Datenbank eintragen:**
```sql
INSERT INTO api_services (name, display_name, description, type, version)
VALUES ('mein_service', 'Mein Service', 'Beschreibung', 'api_service', '1.0.0');
```

2. **Controller erstellen:**
```javascript
// backend/src/controllers/meinServiceController.js
export const handleRequest = async (req, res) => {
  // Deine Logik hier
  res.json({ success: true, data: 'Antwort' });
};
```

3. **Route hinzufügen:**
```javascript
// backend/src/routes/meinService.js
import express from 'express';
import { authenticateApiKey } from '../middleware/auth.js';
import { handleRequest } from '../controllers/meinServiceController.js';

const router = express.Router();
router.post('/', authenticateApiKey, handleRequest);
export default router;
```

4. **In server.js registrieren:**
```javascript
import meinServiceRoutes from './routes/meinService.js';
app.use('/api/mein-service', meinServiceRoutes);
```

### Frontend für neuen Service aktualisieren

1. **Service Card in Home.jsx hinzufügen**
2. **Dedicated Page in src/pages/ erstellen**
3. **Route in App.jsx eintragen**

## 🔒 API Authentication

### JWT Token (für User-Actions)
```javascript
// Header
Authorization: Bearer YOUR_JWT_TOKEN
```

### API Key (für Service-Calls)
```javascript
// Header
X-API-Key: fs_your_api_key_here
```

## 📊 Datenbank

### Schema Übersicht:
- **users** - Benutzerkonten
- **api_keys** - API Zugriffsschlüssel
- **api_services** - Verfügbare Services (FrameSpell, CoreChain, etc.)
- **service_access** - Wer hat Zugriff auf welchen Service
- **api_usage_logs** - Nutzungsstatistiken
- **subscriptions** - Abo-Verwaltung
- **transactions** - Zahlungen

### Wichtige Queries:

**Alle Services eines Users:**
```sql
SELECT s.* FROM api_services s
JOIN service_access sa ON s.id = sa.service_id
WHERE sa.user_id = 'USER_ID';
```

**API Usage Stats:**
```sql
SELECT COUNT(*) as calls, SUM(tokens_used) as tokens
FROM api_usage_logs
WHERE user_id = 'USER_ID'
AND created_at >= NOW() - INTERVAL '30 days';
```

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register` - Registrierung
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - User Info

### Dashboard
- `GET /api/dashboard/stats` - Statistiken
- `GET /api/dashboard/usage-history` - Historie

### API Keys
- `GET /api/api-keys` - Alle Keys
- `POST /api/api-keys` - Neuen Key erstellen
- `DELETE /api/api-keys/:id` - Key löschen

### Services
- `GET /api/services` - Alle Services
- `GET /api/services/user/my-services` - Meine Services

## 🧪 Testing

### Backend Test
```bash
# Health Check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@framesphere.dev","password":"demo123456"}'
```

### Frontend Test
1. Öffne http://localhost:3000
2. Klicke auf "Login"
3. Nutze Demo Credentials
4. Navigiere zum Dashboard

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Vercel CLI: vercel --prod
```

### Backend (Railway/Render)
1. GitHub Repository verbinden
2. Environment Variables setzen
3. Build Command: `npm install`
4. Start Command: `npm start`

### Datenbank (Railway/Supabase)
1. PostgreSQL Instance erstellen
2. Verbindungs-String in Backend `.env` eintragen
3. Migrationen ausführen

## 🐛 Troubleshooting

### "Cannot connect to database"
- PostgreSQL läuft nicht: `brew services start postgresql@14`
- Falsche Credentials in `.env`

### "Port 5000 already in use"
```bash
lsof -ti:5000 | xargs kill -9
```

### "CORS Error"
- Backend CORS_ORIGIN in `.env` prüfen
- Frontend VITE_API_URL prüfen

## 📚 Nächste Schritte

1. ✅ Basis-Setup abgeschlossen
2. 🔄 Integriere deine bestehenden APIs:
   - FrameSpell API
   - CoreChain AI
   - etc.
3. 🎨 Passe Design an deine Marke an
4. 📈 Füge Analytics hinzu
5. 💳 Implementiere Zahlungssystem (Stripe)
6. 📧 E-Mail Notifications
7. 🚀 Deployment auf Production Server

## 💡 Tipps

- Die Architektur ist modular - jeder Service kann unabhängig entwickelt werden
- Nutze die `api_usage_logs` Tabelle für detaillierte Analytics
- API Keys können individuell Rate Limits haben
- Das System unterstützt mehrere Subscription Tiers

## 🤝 Support

- 📖 Vollständige Docs: `/docs/SETUP.md`
- 🐛 Issues auf GitHub
- 💬 Discord Community
- 📧 support@framesphere.dev

---

**Viel Erfolg mit FrameSphere! 🚀**
