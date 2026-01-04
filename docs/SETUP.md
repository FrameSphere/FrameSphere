# FrameSphere - Entwickler Setup Guide

## 🚀 Schnellstart

### Schritt 1: PostgreSQL installieren

#### macOS (mit Homebrew)
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows
Lade PostgreSQL von https://www.postgresql.org/download/windows/

### Schritt 2: Datenbank erstellen

```bash
# PostgreSQL Terminal öffnen
psql postgres

# In psql:
CREATE DATABASE framesphere;
CREATE USER framesphere_user WITH PASSWORD 'dein_sicheres_passwort';
GRANT ALL PRIVILEGES ON DATABASE framesphere TO framesphere_user;
\q
```

### Schritt 3: Backend einrichten

```bash
cd backend

# Dependencies installieren
npm install

# .env Datei erstellen
cp .env.example .env

# .env bearbeiten mit deinen Daten:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=framesphere_user
# DB_PASSWORD=dein_sicheres_passwort
# DB_NAME=framesphere
# JWT_SECRET=generiere_einen_langen_zufälligen_string

# Datenbank Schema erstellen
npm run db:migrate

# Testdaten einfügen
npm run db:seed

# Server starten
npm run dev
```

Der Backend-Server läuft nun auf http://localhost:5000

### Schritt 4: Frontend einrichten

```bash
cd frontend

# Dependencies installieren
npm install

# .env Datei erstellen (optional, defaults funktionieren)
cp .env.example .env

# Development Server starten
npm run dev
```

Das Frontend läuft nun auf http://localhost:3000

## 🔑 Demo Account

Nach dem Database Seeding kannst du dich mit folgenden Credentials anmelden:

```
E-Mail: demo@framesphere.dev
Passwort: demo123456
```

## 🛠️ Entwickler-Tools

### Backend

#### Neue Migration ausführen
```bash
npm run db:migrate
```

#### Datenbank zurücksetzen
```bash
# In psql:
DROP DATABASE framesphere;
CREATE DATABASE framesphere;
GRANT ALL PRIVILEGES ON DATABASE framesphere TO framesphere_user;

# Dann:
npm run db:migrate
npm run db:seed
```

#### API testen mit cURL

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Registrierung:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

**Dashboard Stats (authentifiziert):**
```bash
curl http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Frontend

#### Build für Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

#### Linting
```bash
npm run lint
```

## 📁 Projektstruktur

### Backend
```
backend/
├── src/
│   ├── config/           # Konfiguration (DB, etc.)
│   ├── controllers/      # Business Logic
│   ├── database/         # Schema & Migrations
│   ├── middleware/       # Express Middleware
│   ├── routes/           # API Routes
│   └── server.js         # Entry Point
├── .env.example
├── package.json
└── README.md
```

### Frontend
```
frontend/
├── public/               # Static Assets
├── src/
│   ├── components/       # React Components
│   ├── context/          # Context API
│   ├── pages/            # Page Components
│   ├── utils/            # Utilities (API, etc.)
│   ├── App.jsx           # Main App Component
│   ├── index.css         # Global Styles
│   └── main.jsx          # Entry Point
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🔧 Troubleshooting

### Backend startet nicht

**Problem:** `Error: connect ECONNREFUSED`
- **Lösung:** PostgreSQL läuft nicht. Starte mit `brew services start postgresql@14` (macOS) oder `sudo systemctl start postgresql` (Linux)

**Problem:** `password authentication failed`
- **Lösung:** Prüfe Credentials in `.env` Datei

**Problem:** `relation "users" does not exist`
- **Lösung:** Führe `npm run db:migrate` aus

### Frontend kann Backend nicht erreichen

**Problem:** `Network Error` oder `CORS error`
- **Lösung:** 
  1. Prüfe ob Backend läuft (http://localhost:5000/health)
  2. Prüfe `CORS_ORIGIN` in Backend `.env`
  3. Prüfe `VITE_API_URL` in Frontend `.env`

### Port bereits belegt

**Backend (5000):**
```bash
# Port freigeben (macOS/Linux)
lsof -ti:5000 | xargs kill -9
```

**Frontend (3000):**
```bash
# Port freigeben (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

## 📚 Nächste Schritte

1. Lies die [API Dokumentation](./API_DOCUMENTATION.md)
2. Verstehe das [Datenbankschema](../backend/src/database/schema.sql)
3. Schaue dir die [Beispiel-Implementierungen](./EXAMPLES.md) an
4. Implementiere neue Features basierend auf dem modularen Design

## 🤝 Contribution Guidelines

1. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
2. Committe deine Changes (`git commit -m 'Add some AmazingFeature'`)
3. Push zum Branch (`git push origin feature/AmazingFeature`)
4. Öffne einen Pull Request

## 📞 Support

Bei Fragen:
- Erstelle ein Issue auf GitHub
- Kontaktiere: dev@framesphere.dev
- Discord: [Server Link]
