# 🔧 FrameSphere Deployment Troubleshooting

## Problem: Backend startet nicht
**Lösung:**
- Prüfe Vercel Logs: Deployment → View Function Logs
- Stelle sicher, dass alle Environment Variables gesetzt sind
- Prüfe ob `DATABASE_URL` korrekt ist

## Problem: CORS Error
**Symptom:** `Access-Control-Allow-Origin` Fehler in Browser Console

**Lösung:**
1. Backend Environment Variables prüfen:
   ```
   CORS_ORIGIN = https://dein-frontend.vercel.app
   ```
   (OHNE trailing slash!)

2. Frontend überprüfen - sollte Backend-URL nutzen:
   ```
   VITE_API_URL = https://dein-backend.vercel.app/api
   ```

3. Backend neu deployen nach Environment Variable Änderung

## Problem: Database Connection Error
**Symptom:** `Database connection failed` in Logs

**Lösung:**
1. Prüfe Connection String:
   ```
   DATABASE_URL=postgresql://postgres.pvvxqiervpdopjzszrzj:PASSWORD@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
   ```

2. Stelle sicher, dass du **Transaction Pooler** (Port 6543) nutzt, nicht Direct Connection (Port 5432)

3. Passwort darf keine Sonderzeichen ohne URL-Encoding haben

4. Teste Connection in Supabase Dashboard → SQL Editor:
   ```sql
   SELECT version();
   ```

## Problem: API calls gehen zu localhost
**Symptom:** Frontend macht Requests an `http://localhost:5001`

**Lösung:**
1. Frontend Environment Variable setzen:
   ```
   VITE_API_URL = https://dein-backend.vercel.app/api
   ```

2. Frontend neu deployen

3. Hard-Refresh im Browser (Cmd+Shift+R / Ctrl+Shift+R)

## Problem: 401 Unauthorized
**Symptom:** Alle API Calls returnen 401

**Lösung:**
1. JWT_SECRET in Backend Environment Variables prüfen
2. Stelle sicher, dass Frontend und Backend gleichen JWT_SECRET nutzen
3. Token im LocalStorage löschen und neu einloggen

## Problem: Rate Limiting zu strikt
**Symptom:** "Too many requests" nach wenigen Requests

**Lösung:**
Backend Environment Variables anpassen:
```
RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 1000
```

## Problem: Vercel Function Timeout
**Symptom:** 504 Gateway Timeout nach 10 Sekunden

**Lösung:**
- Vercel Free Tier hat 10s Function Timeout
- Upgrade zu Pro für 60s Timeout
- Oder optimiere langsame Queries

## Quick Checks

### Backend Health Check
```
curl https://dein-backend.vercel.app/health
```

Sollte returnen:
```json
{
  "success": true,
  "message": "FrameSphere API is running"
}
```

### Database Connection Test
Im Supabase SQL Editor:
```sql
SELECT COUNT(*) FROM users;
```

### Frontend Check
Browser Console öffnen → Network Tab
- API Calls sollten zu `dein-backend.vercel.app` gehen
- Status sollte 200 sein (nicht 401, 403, oder 500)

## Environment Variables Checkliste

### Backend (Vercel)
- ✅ NODE_ENV = production
- ✅ DATABASE_URL = postgresql://...6543/postgres
- ✅ JWT_SECRET = ...
- ✅ CORS_ORIGIN = https://frontend.vercel.app
- ✅ RATE_LIMIT_WINDOW_MS = 900000
- ✅ RATE_LIMIT_MAX_REQUESTS = 100

### Frontend (Vercel)
- ✅ VITE_API_URL = https://backend.vercel.app/api

## Häufige Fehler

### Fehler 1: "Cannot connect to database"
→ Port 6543 (Transaction Pooler) verwenden, nicht 5432

### Fehler 2: CORS Fehler trotz CORS_ORIGIN gesetzt
→ Nach Environment Variable Änderung IMMER neu deployen!

### Fehler 3: 404 auf allen API Routes
→ vercel.json prüfen, sollte routes zu src/server.js haben

### Fehler 4: Environment Variables werden nicht geladen
→ In Vercel alle Variables auf "Production" setzen, nicht nur "Preview"

## Logs anschauen

### Backend Logs
Vercel Dashboard → Dein Backend Projekt → Deployments → Latest → View Function Logs

### Frontend Logs
Browser → F12 → Console Tab

### Supabase Logs
Supabase Dashboard → Logs → Database

## Support Resources
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Express on Vercel: https://vercel.com/guides/using-express-with-vercel
