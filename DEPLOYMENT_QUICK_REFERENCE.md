# 📋 FrameSphere Deployment Quick Reference

## 🔗 Wichtige URLs

### Deine Deployments
- **Frontend:** https://[DEIN-FRONTEND].vercel.app
- **Backend:** https://[DEIN-BACKEND].vercel.app
- **Backend Health:** https://[DEIN-BACKEND].vercel.app/health
- **Supabase Dashboard:** https://supabase.com/dashboard

### Connection String
```
postgresql://postgres.pvvxqiervpdopjzszrzj:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
```

---

## ⚙️ Environment Variables

### Backend (Vercel)
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres.pvvxqiervpdopjzszrzj:[PASSWORD]@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
JWT_SECRET=UrfyuNg9vPXzPoZ7uDPkFnXxY8YehqyKXzn5DXvD5Yg=
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://[DEIN-FRONTEND].vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (Vercel)
```env
VITE_API_URL=https://[DEIN-BACKEND].vercel.app/api
```

---

## 🚀 Deployment Commands

### Backend deployen
```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/backend
vercel
```

### Frontend deployen
```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/frontend
vercel
```

### Lokal testen
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

---

## 🧪 Test Commands

### Backend Health Check
```bash
curl https://[DEIN-BACKEND].vercel.app/health
```

### Test Registration (mit curl)
```bash
curl -X POST https://[DEIN-BACKEND].vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### Database Connection Test (Supabase SQL Editor)
```sql
SELECT version();
SELECT COUNT(*) FROM users;
```

---

## 📁 Wichtige Dateien

### Backend
- `src/server.js` - Haupt-Server-Datei
- `src/config/database.js` - Database Connection
- `vercel.json` - Vercel Konfiguration
- `.env` - Lokale Environment Variables

### Frontend
- `src/utils/api.js` - API Configuration
- `src/main.jsx` - Entry Point
- `vite.config.js` - Vite Konfiguration
- `.env` - Lokale Environment Variables

---

## 🔥 Nach Environment Variable Änderung

**IMMER ausführen:**

1. In Vercel Dashboard: Settings → Environment Variables → Ändern
2. Zu Deployments → Neuestes Deployment → "..." → **Redeploy**
3. Warten bis Deployment fertig
4. Im Browser: Hard Refresh (Cmd+Shift+R)

---

## 📊 Status Monitoring

### Backend Live-Status
```bash
curl https://[DEIN-BACKEND].vercel.app/health
```

Sollte returnen:
```json
{
  "success": true,
  "message": "FrameSphere API is running",
  "timestamp": "...",
  "version": "1.0.0"
}
```

### Frontend Check
Browser öffnen → F12 → Network Tab
- Requests gehen zu [DEIN-BACKEND].vercel.app
- Status 200 (nicht 401, 403, 500)

---

## 🆘 Quick Fixes

### CORS Error
```bash
# Backend CORS_ORIGIN prüfen
# Muss EXAKT die Frontend-URL sein (ohne trailing /)
CORS_ORIGIN=https://[DEIN-FRONTEND].vercel.app

# Backend neu deployen!
```

### Database Error
```bash
# Connection String prüfen
# Port MUSS 6543 sein (Transaction Pooler)
DATABASE_URL=...@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
```

### Frontend ruft localhost
```bash
# Frontend Environment Variable setzen
VITE_API_URL=https://[DEIN-BACKEND].vercel.app/api

# Frontend neu deployen!
```

---

## 📝 Nächste Schritte nach Deployment

### 1. Erster Test-User
- Gehe zu Frontend
- Klicke "Register"
- Erstelle Account
- Login testen

### 2. Supabase Dashboard prüfen
- Table Editor öffnen
- `users` Tabelle prüfen
- Sollte neuen User sehen

### 3. API Keys erstellen
- Im Dashboard einloggen
- API Keys Section
- Neuen Key erstellen

### 4. Monitoring Setup
- Vercel Analytics aktivieren
- Supabase Logs beobachten
- Error Tracking einrichten

---

## 🎯 Production Checklist

- [ ] Backend deployed und erreichbar
- [ ] Frontend deployed und erreichbar
- [ ] Database Schema in Supabase importiert
- [ ] Environment Variables gesetzt (Backend)
- [ ] Environment Variables gesetzt (Frontend)
- [ ] CORS korrekt konfiguriert
- [ ] Health Check funktioniert
- [ ] Registration funktioniert
- [ ] Login funktioniert
- [ ] API Calls funktionieren
- [ ] JWT_SECRET geändert (nicht default!)
- [ ] Supabase Backups aktiviert
- [ ] Domain konfiguriert (optional)

---

## 💡 Pro Tips

1. **Environment Variables ändern?** → Immer neu deployen!
2. **CORS Probleme?** → URL EXAKT checken (kein trailing /)
3. **Connection Issues?** → Port 6543 verwenden!
4. **Deployment failed?** → Logs in Vercel anschauen
5. **Frontend zeigt Fehler?** → Browser Console checken (F12)

---

**Erstellt:** $(date +%Y-%m-%d)
**Projekt:** FrameSphere
**Stack:** React + Express + Supabase + Vercel
