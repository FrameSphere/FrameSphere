# 🎯 WAS DU JETZT MACHEN MUSST - Schritt für Schritt

## ✅ Was bereits fertig ist

**FrameSphere ist KOMPLETT:**
- ✅ Backend mit Account Connection System
- ✅ Frontend mit Connect Accounts Seite
- ✅ API Key Management mit Service-Integration
- ✅ Live-Sync Mechanismus
- ✅ Error Handling
- ✅ Dokumentation

---

## 📋 DEINE AUFGABEN

### 🔴 PFLICHT: FrameSpell API erweitern

Du musst in der **FrameSpell API** (`Rechtschreibe_API/webapp/backend/main.py`) 3 neue Endpoints hinzufügen:

#### Schritt 1: Prompt kopieren

Öffne: `FrameSphere/PROMPT_FOR_FRAMESPELL.md`

Kopiere den gesamten Prompt und öffne einen **NEUEN Claude Chat**.

#### Schritt 2: Prompt einfügen

Füge den Prompt in den neuen Chat ein. Claude wird dir dann genau sagen, was du in `main.py` einfügen musst.

#### Schritt 3: Code in main.py einfügen

Du bekommst 4 Code-Blöcke:
1. **Pydantic Models** - Nach den anderen Models einfügen
2. **SQLAlchemy Tabelle** - Nach User/APIUsage Klassen einfügen  
3. **3 Endpoints** - Am Ende, vor `if __name__ == "__main__"` einfügen
4. **Tabelle erstellen** - `Base.metadata.create_all(bind=engine)` ist bereits da

#### Schritt 4: Testen

```bash
# Terminal 1: FrameSpell starten
cd Laufende_Projekte/Rechtschreibe_API/webapp/backend
source venv/bin/activate
python main.py

# Terminal 2: Testen
curl -X POST http://localhost:8000/api/auth/verify-connection \
  -H "Content-Type: application/json" \
  -d '{"api_key":"DEIN_API_KEY","source":"framesphere"}'

#Mit Key

curl -X POST http://localhost:8000/api/auth/verify-connection \
-H "Content-Type: application/json" \
-d '{"api_key":"5JguB3TQ8xTbTkkdqBgMK4XCHpckjH6ja9vLI4UOPl8","source":"framesphere"}'
```

**Wenn du eine Success-Response siehst → ✅ FERTIG!**

---

### 🟢 OPTIONAL aber empfohlen: Backend & Frontend neu starten

```bash
# Terminal 1: FrameSphere Backend
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/backend
npm install  # Falls noch nicht gemacht
npm run dev

# Terminal 2: FrameSphere Frontend  
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/frontend
npm run dev

# Terminal 3: FrameSpell Backend
cd /Users/karol/Desktop/Laufende_Projekte/Rechtschreibe_API/webapp/backend
source venv/bin/activate
python main.py
```

---

### 🎮 TESTEN: Vollständiger Flow

1. **Browser öffnen:** http://localhost:5173
2. **Einloggen** (oder registrieren)
3. **Gehe zu:** Dashboard → "Account verbinden"
4. **Klicke auf** "FrameSpell API"
5. **Gib ein:**
   - Account Name: "Mein FrameSpell Account"
   - API Key: [Dein FrameSpell API Key aus Settings]
6. **Klicke** "Account verbinden"

**Erwartetes Ergebnis:**
```
✅ "FrameSpell API Account erfolgreich verbunden!"
→ Redirect zum Dashboard
→ FrameSpell wird als "Verbunden" angezeigt
```

---

## 📄 Welche Dateien anpassen?

### FrameSpell API (PFLICHT)

**Datei:** `/Users/karol/Desktop/Laufende_Projekte/Rechtschreibe_API/webapp/backend/main.py`

**Was hinzufügen:**

1. **Nach den Imports** (ca. Zeile 20):
```python
# Füge nichts hinzu - alle Imports sind schon da
```

2. **Nach den Pydantic Models** (ca. Zeile 150):
```python
# Hier die neuen Pydantic Models einfügen:
class VerifyConnectionRequest(BaseModel):
    api_key: str
    account_id: Optional[str] = None
    source: str = "framesphere"

class FrameSphereSyncRequest(BaseModel):
    framesphere_user_id: str
    connection_id: str
    api_key: str
    sync_type: str
```

3. **Nach den SQLAlchemy Models** (ca. Zeile 200):
```python
# Hier die neue Tabelle einfügen:
class FrameSphereConnection(Base):
    __tablename__ = "framesphere_connections"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    framesphere_user_id = Column(String, nullable=False)
    connection_id = Column(String, unique=True, nullable=False)
    connected_at = Column(DateTime, default=datetime.utcnow)
    last_sync_at = Column(DateTime)
    status = Column(String, default="active")
    metadata = Column(String)
```

4. **Am Ende der Datei** (VOR `if __name__ == "__main__"`):
```python
# Hier die 3 Endpoints einfügen:

@app.post("/api/auth/verify-connection")
async def verify_connection(request: VerifyConnectionRequest, db: Session = Depends(get_db)):
    # ... Code vom Claude Prompt

@app.get("/api/stats/usage")
async def get_usage_stats_for_framesphere(...):
    # ... Code vom Claude Prompt

@app.post("/api/sync/framesphere")
async def sync_with_framesphere(request: FrameSphereSyncRequest, db: Session = Depends(get_db)):
    # ... Code vom Claude Prompt
```

---

## 🔍 Wie findest du deinen FrameSpell API Key?

### Methode 1: Aus der Datenbank
```bash
cd Laufende_Projekte/Rechtschreibe_API/webapp/backend
sqlite3 spellcheck_api.db

sqlite> SELECT email, api_key FROM users;
# Kopiere deinen API Key
```

### Methode 2: Neuen User erstellen
```bash
# Terminal: FrameSpell starten
python main.py

# Anderes Terminal: Registrieren
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Dann API Key aus DB holen (siehe Methode 1)
```

### Methode 3: Über FrameSpell Frontend
1. Öffne http://localhost:8080
2. Registriere dich / Logge ein
3. Gehe zu Settings → API Keys
4. Kopiere den API Key

---

## ⚠️ Häufige Probleme

### Problem: "axios ist not defined"
**Lösung:**
```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere/backend
npm install
```

### Problem: "Cannot connect to FrameSpell"
**Prüfe:**
```bash
# Ist FrameSpell gestartet?
curl http://localhost:8000/health

# Erwartete Antwort:
{"status": "healthy", "model_loaded": true, ...}
```

### Problem: "Invalid API Key"
**Lösung:** 
- API Key aus FrameSpell DB holen (siehe oben)
- Prüfen ob User aktiv ist: `SELECT * FROM users WHERE api_key='...'`

### Problem: "CORS Error"
**Lösung:**
- FrameSphere Backend neu starten
- `.env` prüfen: `CORS_ORIGIN=http://localhost:5173`

### Problem: "Port already in use"
**Lösung:**
```bash
# Backend Port 5001
lsof -ti:5001 | xargs kill -9

# Frontend Port 5173
lsof -ti:5173 | xargs kill -9

# FrameSpell Port 8000
lsof -ti:8000 | xargs kill -9
```

---

## 📚 Hilfe & Dokumentation

### Wenn du nicht weiterkommst:

1. **Lies:**
   - `ACCOUNT_CONNECTION_COMPLETE.md` - Vollständige Übersicht
   - `FRAMESPELL_INTEGRATION_ENDPOINTS.md` - Detaillierte Specs
   - `PROMPT_FOR_FRAMESPELL.md` - Claude Prompt

2. **Prüfe Logs:**
   - FrameSphere Backend: Terminal Output
   - FrameSphere Frontend: Browser Console (F12)
   - FrameSpell Backend: Terminal Output

3. **Teste Endpoints:**
```bash
# Health Checks
curl http://localhost:5001/health  # FrameSphere
curl http://localhost:8000/health  # FrameSpell

# Test Connection
curl -X POST http://localhost:5001/api/connected-accounts \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"productId":"framespell","productName":"FrameSpell API","apiKey":"YOUR_FRAMESPELL_KEY","accountName":"Test"}'
```

---

## ✨ Nach erfolgreicher Integration

Wenn alles funktioniert:

### Im FrameSphere Dashboard siehst du:
- ✅ "FrameSpell API" als verbunden
- 📊 Live-Statistiken von FrameSpell
- 🔑 Möglichkeit, API Keys zu erstellen
- 💰 Kosten-Übersicht

### Du kannst dann:
1. Weitere Services verbinden (CoreChain, SphereNet, etc.)
2. API Keys pro Service erstellen
3. Zentrale Übersicht über alle Services
4. Kosten tracken
5. Nutzung monitoren

---

## 🎯 Zusammenfassung

**PFLICHT (30 Minuten):**
1. Öffne `PROMPT_FOR_FRAMESPELL.md`
2. Kopiere Prompt in neuen Claude Chat
3. Füge Code in `main.py` ein
4. Teste mit curl
5. Verbinde Account im Dashboard

**OPTIONAL:**
- Andere Services später implementieren
- Webhooks für Real-time Updates
- Erweiterte Statistiken
- Grafische Dashboards

---

## 🚀 Los geht's!

**Starte hier:**
```bash
# 1. Öffne Datei
code /Users/karol/Desktop/Laufende_Projekte/FrameSphere/PROMPT_FOR_FRAMESPELL.md

# 2. Neuer Claude Chat
# → Prompt kopieren & einfügen

# 3. Code in main.py einfügen
code /Users/karol/Desktop/Laufende_Projekte/Rechtschreibe_API/webapp/backend/main.py

# 4. Testen!
```

**Du schaffst das! 💪**

---

**Fragen? Schau in die Dokumentation oder frage Claude!**
