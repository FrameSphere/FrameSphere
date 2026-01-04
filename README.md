# FrameSphere - AI Orchestration Platform

🚀 Die führende Plattform für AI-Orchestrierung. Chain, connect, innovate.

## 📁 Projektstruktur

```
FrameSphere/
├── frontend/          # React Frontend (Vite)
├── backend/           # Node.js/Express Backend
└── README.md          # Diese Datei
```

## 🎯 Produkte

1. **FrameSpell API** - Fortschrittliche Rechtschreibprüfung mit KI
2. **CoreChain AI** - KI-Orchestrierung für komplexe Workflows
3. **CoreChain API** - Entwickler-API für AI-Orchestrierung
4. **SphereHub** - Lokale AI-Modelle & Smart Home Integration
5. **SphereNet** - Öffentliches Netzwerk von KI-Modellen

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

### Backend
- Node.js
- Express
- PostgreSQL
- JWT Authentication
- bcryptjs

## 📦 Installation

### Voraussetzungen
- Node.js 18+ 
- PostgreSQL 14+
- npm oder yarn

### 1. Repository klonen
```bash
cd FrameSphere
```

### 2. Backend Setup

```bash
cd backend
npm install

# Erstelle .env Datei
cp .env.example .env

# Bearbeite .env mit deinen Datenbank-Credentials
nano .env

# Datenbank migrieren
npm run db:migrate

# Testdaten einfügen (optional)
npm run db:seed

# Server starten
npm run dev
```

Backend läuft auf: http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install

# Erstelle .env Datei
cp .env.example .env

# Frontend starten
npm run dev
```

Frontend läuft auf: http://localhost:3000

## 🔑 Demo Login

Nach dem Seeding sind folgende Demo-Credentials verfügbar:

```
E-Mail: demo@framesphere.dev
Passwort: demo123456
```

## 📚 API Dokumentation

### Auth Endpoints
- `POST /api/auth/register` - Registrierung
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Aktueller User
- `PUT /api/auth/profile` - Profil aktualisieren
- `PUT /api/auth/password` - Passwort ändern

### Dashboard Endpoints
- `GET /api/dashboard/stats` - Dashboard Statistiken
- `GET /api/dashboard/usage-history` - Nutzungshistorie
- `GET /api/dashboard/service-breakdown` - Service Breakdown

### API Keys Endpoints
- `GET /api/api-keys` - Alle API Keys
- `POST /api/api-keys` - Neuen API Key erstellen
- `PUT /api/api-keys/:id` - API Key aktualisieren
- `DELETE /api/api-keys/:id` - API Key löschen
- `GET /api/api-keys/:id/stats` - API Key Statistiken

### Services Endpoints
- `GET /api/services` - Alle Services
- `GET /api/services/:id` - Service Details
- `GET /api/services/user/my-services` - Meine Services
- `GET /api/services/:serviceId/access` - Zugriff prüfen
- `POST /api/services/access/request` - Zugriff anfragen

## 🗄️ Datenbankschema

Das Schema befindet sich in `backend/src/database/schema.sql` und umfasst:

- **users** - Benutzerkonten
- **api_keys** - API Zugriffsschlüssel
- **projects** - Projekt-Organisation
- **api_services** - Verfügbare Services
- **api_usage_logs** - Nutzungsstatistiken
- **subscriptions** - Abo-Verwaltung
- **transactions** - Zahlungen
- **service_access** - Zugriffsrechte
- **notifications** - Benachrichtigungen

## 🔒 Sicherheit

- JWT-basierte Authentifizierung
- bcrypt Password Hashing
- Rate Limiting
- Helmet.js Security Headers
- CORS Protection
- SQL Injection Protection durch Parameterized Queries

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# dist/ Ordner deployen
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd backend
# Setze Umgebungsvariablen
# Starte mit: npm start
```

## 📝 Entwicklung

### Frontend Dev Server
```bash
cd frontend
npm run dev
```

### Backend Dev Server mit Auto-Reload
```bash
cd backend
npm run dev
```

## 🤝 Erweiterbarkeit

Das System ist so designed, dass neue Services einfach hinzugefügt werden können:

1. Service in `api_services` Tabelle einfügen
2. Zugriff via `service_access` Tabelle verwalten
3. API-Endpunkte für Service-Logik erstellen
4. Frontend-Integration hinzufügen

## 📄 Lizenz

Proprietär - FrameSphere © 2025

## 👥 Support

Bei Fragen oder Problemen:
- E-Mail: support@framesphere.dev
- Discord: [Link]
- Dokumentation: https://docs.framesphere.dev

---

Erstellt mit ❤️ von FrameSphere Team
