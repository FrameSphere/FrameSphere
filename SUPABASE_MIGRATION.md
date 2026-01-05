# 🚀 Supabase Migration Guide für FrameSphere

## Überblick
Dieses Dokument beschreibt die Migration von der lokalen PostgreSQL-Datenbank zu Supabase.

## ✅ Vorteile von Supabase
- ☁️ Managed PostgreSQL (keine Server-Wartung)
- 🔒 Integrierte Authentifizierung
- 🚀 Auto-Scaling
- 💾 Automatische Backups
- 🌐 Globales CDN
- 📊 Realtime Subscriptions (optional)
- 🆓 Großzügiger Free Tier

## 📋 Migrations-Schritte

### 1. Supabase Projekt erstellen
1. Gehe zu https://supabase.com
2. Klicke auf "New Project"
3. Wähle einen Namen und starkes Passwort
4. Warte ~2 Minuten bis das Projekt bereit ist

### 2. Datenbank-Schema importieren
1. Gehe im Supabase Dashboard zu **SQL Editor**
2. Kopiere den Inhalt von `backend/src/database/schema.sql`
3. Füge ihn in den SQL Editor ein
4. Klicke auf "Run"

### 3. Connection Details notieren
Gehe zu **Project Settings → Database** und notiere:
- **Host**: `db.xxxxxxxxx.supabase.co`
- **Database name**: `postgres`
- **Port**: `5432`
- **User**: `postgres`
- **Password**: [Dein gewähltes Passwort]

Oder kopiere die komplette **Connection String**:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxx.supabase.co:5432/postgres
```

### 4. Backend-Konfiguration aktualisieren

#### Lokale Entwicklung (.env)
```env
NODE_ENV=development
DB_HOST=db.xxxxxxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=dein_passwort
DB_NAME=postgres
JWT_SECRET=dein_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

#### Production auf Vercel
Setze in den Vercel Environment Variables:
```
NODE_ENV=production
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
JWT_SECRET=dein_production_jwt_secret
CORS_ORIGIN=https://dein-frontend.vercel.app
```

### 5. Backend deployen

#### Auf Vercel:
```bash
cd backend
vercel
```

Oder pushe zu GitHub und importiere das Repository in Vercel.

### 6. Frontend API-URL aktualisieren

In `frontend/.env.production`:
```env
VITE_API_URL=https://dein-backend.vercel.app
```

### 7. Testen
```bash
# Backend lokal testen
cd backend
npm start

# Frontend lokal testen
cd frontend
npm run dev
```

## 🔧 Troubleshooting

### SSL-Fehler
Falls du SSL-Fehler bekommst, stelle sicher dass in `database.js`:
```javascript
ssl: process.env.NODE_ENV === 'production' ? {
  rejectUnauthorized: false
} : false
```

### Connection Timeout
- Überprüfe, ob die Database erreichbar ist
- Stelle sicher, dass keine Firewall blockiert
- Prüfe die Connection Details

### CORS-Fehler
- Überprüfe `CORS_ORIGIN` in den Environment Variables
- Stelle sicher, dass die Frontend-URL korrekt ist

## 📚 Weitere Supabase Features (Optional)

### Supabase Client für Direct Database Access
Du kannst auch den Supabase JavaScript Client verwenden:
```bash
npm install @supabase/supabase-js
```

### Row Level Security (RLS)
Supabase bietet RLS für zusätzliche Sicherheit:
- Gehe zu **Authentication → Policies**
- Erstelle Policies für jede Tabelle

### Realtime Subscriptions
```javascript
const { data, error } = await supabase
  .from('notifications')
  .on('INSERT', payload => {
    console.log('New notification!', payload)
  })
  .subscribe()
```

## 🎉 Fertig!
Deine App läuft jetzt mit Supabase als Datenbank-Backend.

## 📞 Support
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
