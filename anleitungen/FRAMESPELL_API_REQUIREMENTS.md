# FrameSpell API Endpoints - Implementierungsanleitung

## 🎯 Übersicht

FrameSpell (läuft auf http://localhost:8000) muss 4 Endpoints implementieren, damit die FrameSphere Integration funktioniert.

## 📡 Endpoint 1: Health Check

### Request
```http
GET /health
```

### Response
```json
{
  "status": "ok",
  "service": "framespell",
  "version": "1.0.0",
  "timestamp": "2025-01-07T12:00:00Z"
}
```

### Beispiel (Python/FastAPI)
```python
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "framespell",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }
```

---

## 📡 Endpoint 2: Account Verification

### Request
```http
POST /api/auth/verify
Content-Type: application/json
Authorization: Bearer <user_access_token>

{
  "user_id": "abc123"
}
```

### Response - Success
```json
{
  "success": true,
  "user_id": "abc123",
  "email": "user@example.com",
  "status": "active"
}
```

### Response - Error
```json
{
  "success": false,
  "error": "Invalid token or user not found"
}
```

### Beispiel (Python/FastAPI)
```python
@app.post("/api/auth/verify")
async def verify_account(
    request: VerifyRequest,
    token: str = Header(..., alias="Authorization")
):
    try:
        # Extract token
        access_token = token.replace("Bearer ", "")
        
        # Verify JWT token
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
        
        # Check if user exists
        user = db.get_user(request.user_id)
        
        if not user:
            return {"success": False, "error": "User not found"}
        
        return {
            "success": True,
            "user_id": user.id,
            "email": user.email,
            "status": user.status
        }
    except jwt.JWTError:
        return {"success": False, "error": "Invalid token"}
```

---

## 📡 Endpoint 3: Create API Key

### Request
```http
POST /api/keys
Content-Type: application/json
Authorization: Bearer <user_access_token>

{
  "user_id": "abc123",
  "name": "FrameSphere - Production Key",
  "permissions": {},
  "rate_limit": 1000
}
```

### Response - Success
```json
{
  "success": true,
  "id": "key_789xyz",
  "key": "fs_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "name": "FrameSphere - Production Key",
  "user_id": "abc123",
  "rate_limit": 1000,
  "created_at": "2025-01-07T12:00:00Z",
  "status": "active"
}
```

### Response - Error
```json
{
  "success": false,
  "error": "Unauthorized or invalid request"
}
```

### Beispiel (Python/FastAPI)
```python
@app.post("/api/keys")
async def create_api_key(
    request: CreateKeyRequest,
    token: str = Header(..., alias="Authorization")
):
    try:
        # Verify token
        access_token = token.replace("Bearer ", "")
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
        
        # Verify user_id matches token
        if payload.get("user_id") != request.user_id:
            return {"success": False, "error": "Unauthorized"}
        
        # Generate API key
        api_key = f"fs_{secrets.token_hex(32)}"
        key_id = f"key_{secrets.token_hex(8)}"
        
        # Save to database
        db_key = APIKey(
            id=key_id,
            key=api_key,
            name=request.name,
            user_id=request.user_id,
            rate_limit=request.rate_limit,
            permissions=request.permissions,
            created_at=datetime.now(),
            status="active"
        )
        db.save(db_key)
        
        return {
            "success": True,
            "id": key_id,
            "key": api_key,
            "name": request.name,
            "user_id": request.user_id,
            "rate_limit": request.rate_limit,
            "created_at": db_key.created_at.isoformat(),
            "status": "active"
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
```

---

## 📡 Endpoint 4: Delete API Key

### Request
```http
DELETE /api/keys/{key_id}
Authorization: Bearer <user_access_token>
```

### Response - Success
```json
{
  "success": true,
  "message": "API key deleted successfully",
  "id": "key_789xyz"
}
```

### Response - Error (Not Found)
```json
{
  "success": false,
  "error": "API key not found or unauthorized"
}
```

### Beispiel (Python/FastAPI)
```python
@app.delete("/api/keys/{key_id}")
async def delete_api_key(
    key_id: str,
    token: str = Header(..., alias="Authorization")
):
    try:
        # Verify token
        access_token = token.replace("Bearer ", "")
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        
        # Get API key
        api_key = db.get_api_key(key_id)
        
        if not api_key:
            return {"success": False, "error": "API key not found"}
        
        # Verify ownership
        if api_key.user_id != user_id:
            return {"success": False, "error": "Unauthorized"}
        
        # Delete from database
        db.delete_api_key(key_id)
        
        return {
            "success": True,
            "message": "API key deleted successfully",
            "id": key_id
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
```

---

## 🗄️ Datenbank-Schema (Empfehlung)

### API Keys Tabelle
```sql
CREATE TABLE api_keys (
    id VARCHAR(255) PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    rate_limit INTEGER DEFAULT 1000,
    permissions JSONB DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    last_used TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key ON api_keys(key);
```

---

## 🔒 Sicherheit

### Token Validation
```python
import jwt
from datetime import datetime, timedelta

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        
        # Check expiration
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.now():
            raise jwt.ExpiredSignatureError("Token expired")
        
        return payload
    except jwt.JWTError as e:
        raise HTTPException(status_code=401, detail=str(e))
```

### Rate Limiting
```python
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter

@app.post("/api/keys")
@limiter.limit("10/minute")
async def create_api_key(...):
    # Implementation
    pass
```

---

## 🧪 Testing

### Test mit curl

```bash
# 1. Health Check
curl http://localhost:8000/health

# 2. Verify Account
curl -X POST http://localhost:8000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test123"}'

# 3. Create API Key
curl -X POST http://localhost:8000/api/keys \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"test123",
    "name":"Test Key",
    "rate_limit":1000,
    "permissions":{}
  }'

# 4. Delete API Key
curl -X DELETE http://localhost:8000/api/keys/key_789xyz \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Python Test Script
```python
import requests

BASE_URL = "http://localhost:8000"
TOKEN = "your_access_token_here"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Test health
response = requests.get(f"{BASE_URL}/health")
print("Health:", response.json())

# Test verify
response = requests.post(
    f"{BASE_URL}/api/auth/verify",
    headers=headers,
    json={"user_id": "test123"}
)
print("Verify:", response.json())

# Test create key
response = requests.post(
    f"{BASE_URL}/api/keys",
    headers=headers,
    json={
        "user_id": "test123",
        "name": "Test Key",
        "rate_limit": 1000,
        "permissions": {}
    }
)
print("Create:", response.json())
key_id = response.json().get("id")

# Test delete key
response = requests.delete(
    f"{BASE_URL}/api/keys/{key_id}",
    headers=headers
)
print("Delete:", response.json())
```

---

## 📝 Checkliste

- [ ] Health Check Endpoint implementiert
- [ ] Verify Account Endpoint implementiert
- [ ] Create API Key Endpoint implementiert
- [ ] Delete API Key Endpoint implementiert
- [ ] Datenbank-Schema erstellt
- [ ] JWT Token Validation funktioniert
- [ ] Rate Limiting konfiguriert
- [ ] Alle Endpoints mit curl getestet
- [ ] Error Handling implementiert
- [ ] Logging aktiviert

---

## 🚀 Integration mit FrameSphere

Sobald alle Endpoints implementiert sind:

1. FrameSphere Backend startet automatisch mit der Integration
2. Health Checks laufen alle 30 Sekunden
3. User können API Keys über FrameSphere Dashboard erstellen
4. Keys werden automatisch synchronisiert

---

## 💡 Tipps

1. **Logging**: Logge alle API Key Operationen für Audit
2. **Monitoring**: Überwache die Request Rate
3. **Backup**: Sichere API Keys regelmäßig
4. **Rotation**: Implementiere Key-Rotation für Sicherheit
5. **Notifications**: Benachrichtige User bei Key-Erstellung/Löschung

---

**Status**: Ready for Implementation
**Priority**: High
**Estimated Time**: 2-4 Stunden
