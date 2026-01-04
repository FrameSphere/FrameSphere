# 🔗 FrameSphere Integration - FrameSpell API Endpoints

## Übersicht

Diese Endpoints müssen in der **FrameSpell API** (`Rechtschreibe_API/webapp/backend/main.py`) implementiert werden, damit die Integration mit FrameSphere funktioniert.

---

## 📡 Endpoint 1: Verbindung verifizieren

### Zweck
FrameSphere ruft diesen Endpoint auf, wenn ein User seinen FrameSpell Account verbinden möchte.

### Implementierung

Füge diesen Code in `main.py` ein:

```python
from pydantic import BaseModel
from fastapi import Header

class VerifyConnectionRequest(BaseModel):
    api_key: str
    account_id: Optional[str] = None
    source: str = "framesphere"

@app.post("/api/auth/verify-connection")
async def verify_connection(
    request: VerifyConnectionRequest,
    db: Session = Depends(get_db)
):
    """
    Verifiziert eine Verbindung von FrameSphere
    Prüft ob der API Key gültig ist
    """
    try:
        # Finde User anhand des API Keys
        user = db.query(User).filter(User.api_key == request.api_key).first()
        
        if not user or not user.is_active:
            raise HTTPException(
                status_code=401,
                detail="Invalid API key or inactive account"
            )
        
        # Erstelle oder aktualisiere FrameSphere Connection Entry
        # (Optional: Speichere Connection Info in eigener Tabelle)
        
        return {
            "success": True,
            "user_id": user.id,
            "email": user.email,
            "subscription_type": user.subscription_type,
            "premium": user.premium,
            "verified_at": datetime.utcnow().isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Connection verification error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Verification failed"
        )
```

---

## 📡 Endpoint 2: Nutzungsstatistiken abrufen

### Zweck
FrameSphere ruft regelmäßig Nutzungsstatistiken ab, um sie im Dashboard anzuzeigen.

### Implementierung

```python
@app.get("/api/stats/usage")
async def get_usage_stats_for_framesphere(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    """
    Gibt Nutzungsstatistiken für FrameSphere zurück
    Authentifizierung via API Key im Authorization Header
    """
    try:
        # Extrahiere API Key aus Header
        if not authorization or not authorization.startswith('Bearer '):
            raise HTTPException(status_code=401, detail="Authorization required")
        
        api_key = authorization.replace('Bearer ', '')
        
        # Finde User
        user = db.query(User).filter(User.api_key == api_key).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid API key")
        
        # Berechne Statistiken
        now = datetime.utcnow()
        
        # Heute
        today_start = datetime.combine(now.date(), datetime.min.time())
        today_usage = db.query(APIUsage).filter(
            APIUsage.user_id == user.id,
            APIUsage.timestamp >= today_start
        ).all()
        
        # Dieser Monat
        month_start = datetime(now.year, now.month, 1)
        month_usage = db.query(APIUsage).filter(
            APIUsage.user_id == user.id,
            APIUsage.timestamp >= month_start
        ).all()
        
        # Letzte 7 Tage (für Grafik)
        week_ago = now - timedelta(days=7)
        week_usage = db.query(APIUsage).filter(
            APIUsage.user_id == user.id,
            APIUsage.timestamp >= week_ago
        ).all()
        
        # Gruppiere nach Tag für Grafik
        daily_stats = {}
        for usage in week_usage:
            day = usage.timestamp.date().isoformat()
            if day not in daily_stats:
                daily_stats[day] = {"requests": 0, "cost": 0.0}
            daily_stats[day]["requests"] += 1
            daily_stats[day]["cost"] += usage.cost
        
        return {
            "success": True,
            "user_id": user.id,
            "subscription_type": user.subscription_type,
            "today": {
                "requests": len(today_usage),
                "cost": round(sum(u.cost for u in today_usage), 2)
            },
            "month": {
                "requests": len(month_usage),
                "cost": round(sum(u.cost for u in month_usage), 2)
            },
            "last_7_days": daily_stats,
            "total_usage": db.query(APIUsage).filter(
                APIUsage.user_id == user.id
            ).count()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Stats retrieval error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve stats")
```

---

## 📡 Endpoint 3: FrameSphere Sync

### Zweck
Benachrichtigt FrameSpell über Änderungen von FrameSphere (z.B. Account verbunden/getrennt).

### Implementierung

```python
# Zuerst: Neue Datenbank-Tabelle erstellen
class FrameSphereConnection(Base):
    __tablename__ = "framesphere_connections"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)  # FrameSpell User ID
    framesphere_user_id = Column(String, nullable=False)  # FrameSphere User ID
    connection_id = Column(String, unique=True, nullable=False)
    connected_at = Column(DateTime, default=datetime.utcnow)
    last_sync_at = Column(DateTime)
    status = Column(String, default="active")  # active, disconnected
    
# Dann: Endpoint implementieren
class FrameSphereSyncRequest(BaseModel):
    framesphere_user_id: str
    connection_id: str
    api_key: str
    sync_type: str  # connect, disconnect, update

@app.post("/api/sync/framesphere")
async def sync_with_framesphere(
    request: FrameSphereSyncRequest,
    db: Session = Depends(get_db)
):
    """
    Synchronisiert Connection-Status mit FrameSphere
    """
    try:
        # Validiere API Key
        user = db.query(User).filter(User.api_key == request.api_key).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid API key")
        
        if request.sync_type == "connect":
            # Erstelle oder aktualisiere Connection
            connection = db.query(FrameSphereConnection).filter(
                FrameSphereConnection.connection_id == request.connection_id
            ).first()
            
            if connection:
                connection.status = "active"
                connection.last_sync_at = datetime.utcnow()
            else:
                connection = FrameSphereConnection(
                    user_id=user.id,
                    framesphere_user_id=request.framesphere_user_id,
                    connection_id=request.connection_id,
                    status="active"
                )
                db.add(connection)
            
            db.commit()
            
            return {
                "success": True,
                "message": "Connection synchronized",
                "status": "active"
            }
            
        elif request.sync_type == "disconnect":
            # Markiere Connection als getrennt
            connection = db.query(FrameSphereConnection).filter(
                FrameSphereConnection.connection_id == request.connection_id
            ).first()
            
            if connection:
                connection.status = "disconnected"
                connection.last_sync_at = datetime.utcnow()
                db.commit()
            
            return {
                "success": True,
                "message": "Connection disconnected",
                "status": "disconnected"
            }
        
        else:
            raise HTTPException(status_code=400, detail="Invalid sync_type")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Sync error: {e}")
        raise HTTPException(status_code=500, detail="Sync failed")
```

---

## 📡 Endpoint 4: Webhook für neue API Usage (Optional aber empfohlen)

### Zweck
Benachrichtigt FrameSphere in Echtzeit, wenn eine neue API-Anfrage gemacht wurde.

### Implementierung

```python
import aiohttp

async def notify_framesphere_usage(user_id: int, usage_data: dict):
    """
    Sendet Nutzungsdaten an FrameSphere (non-blocking)
    """
    try:
        # Hole FrameSphere Connection
        # (Du musst die Connection Info speichern)
        framesphere_webhook_url = "http://localhost:5001/api/webhooks/usage"
        
        async with aiohttp.ClientSession() as session:
            await session.post(
                framesphere_webhook_url,
                json={
                    "service": "framespell",
                    "user_id": user_id,
                    "usage": usage_data,
                    "timestamp": datetime.utcnow().isoformat()
                },
                timeout=aiohttp.ClientTimeout(total=3)
            )
    except Exception as e:
        logger.warning(f"Failed to notify FrameSphere: {e}")
        # Fail silently - nicht kritisch

# Dann im /spellcheck Endpoint:
@app.post("/spellcheck", response_model=SpellCheckResponse)
async def check_spelling(...):
    # ... existing code ...
    
    # Am Ende, nach dem Logging:
    usage = APIUsage(...)
    db.add(usage)
    db.commit()
    
    # Benachrichtige FrameSphere (async, non-blocking)
    import asyncio
    asyncio.create_task(notify_framesphere_usage(
        user.id,
        {
            "requests": 1,
            "cost": cost,
            "timestamp": datetime.utcnow().isoformat()
        }
    ))
    
    return SpellCheckResponse(...)
```

---

## 🗄️ Datenbank-Migration

Füge diese Tabelle zur Datenbank hinzu:

```python
# In main.py, nach den anderen Models:

class FrameSphereConnection(Base):
    __tablename__ = "framesphere_connections"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    framesphere_user_id = Column(String, nullable=False)
    connection_id = Column(String, unique=True, nullable=False)
    connected_at = Column(DateTime, default=datetime.utcnow)
    last_sync_at = Column(DateTime)
    status = Column(String, default="active")
    metadata = Column(String)  # JSON string für zusätzliche Daten

# Dann: Tabelle erstellen
Base.metadata.create_all(bind=engine)
```

---

## 🧪 Testing

### Test 1: Verbindung verifizieren
```bash
curl -X POST http://localhost:8000/api/auth/verify-connection \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_FRAMESPELL_API_KEY",
    "source": "framesphere"
  }'
```

**Erwartete Antwort:**
```json
{
  "success": true,
  "user_id": 1,
  "email": "user@example.com",
  "subscription_type": "free",
  "premium": false,
  "verified_at": "2025-01-07T12:00:00"
}
```

### Test 2: Statistiken abrufen
```bash
curl http://localhost:8000/api/stats/usage \
  -H "Authorization: Bearer YOUR_FRAMESPELL_API_KEY"
```

### Test 3: Sync
```bash
curl -X POST http://localhost:8000/api/sync/framesphere \
  -H "Content-Type: application/json" \
  -d '{
    "framesphere_user_id": "framesphere-user-123",
    "connection_id": "conn-abc-123",
    "api_key": "YOUR_FRAMESPELL_API_KEY",
    "sync_type": "connect"
  }'
```

---

## 📋 Checkliste

- [ ] `/api/auth/verify-connection` implementiert
- [ ] `/api/stats/usage` implementiert
- [ ] `/api/sync/framesphere` implementiert
- [ ] `FrameSphereConnection` Tabelle erstellt
- [ ] Alle Endpoints mit curl getestet
- [ ] Error Handling implementiert
- [ ] Logging aktiviert
- [ ] (Optional) Webhook für Real-time Updates

---

## 🔄 Für andere Services (CoreChain, SphereNet, etc.)

**GLEICHE STRUKTUR** verwenden:

1. `/api/auth/verify-connection` - Verbindung verifizieren
2. `/api/stats/usage` - Statistiken abrufen
3. `/api/sync/framesphere` - Sync mit FrameSphere
4. Datenbank-Tabelle für Connections

**Nur anpassen:**
- Port-Nummer (9000, 9001, 10000, 10001)
- Service-spezifische Statistiken
- Service-spezifische Features

---

## 💡 Wichtige Hinweise

1. **Sicherheit**: Alle Endpoints sollten API Key validieren
2. **Rate Limiting**: Verhindere Missbrauch
3. **Logging**: Logge alle FrameSphere-Interactions
4. **Error Handling**: Gib klare Fehlermeldungen zurück
5. **Non-blocking**: Webhooks sollten async sein
6. **Timeouts**: Setze Timeouts für externe Calls (3-5 Sekunden)

---

**Status**: Ready for Implementation
**Priority**: HIGH - Ohne diese Endpoints funktioniert die FrameSphere Integration nicht!
