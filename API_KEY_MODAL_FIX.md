# 🔑 API Key Modal Fix

## Problem
Das API Key Modal zeigte eine schwarze Seite.

## Lösung

### Schritt 1: Datenbank aktualisieren

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
chmod +x update-api-keys-db.sh
./update-api-keys-db.sh
```

**Oder manuell:**
```bash
psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/update-api-keys-table.sql
# Passwort: framesphere_password
```

### Schritt 2: Backend neu starten

```bash
./stop-services.sh
./start-services.sh
```

### Schritt 3: Frontend neu laden

Öffne http://localhost:3000 und drücke **Ctrl+Shift+R** (Hard Reload)

## Was wurde geändert:

### 1. Datenbank (`api_keys` Tabelle)
- ✅ Spalte `service_id` hinzugefügt (UUID, Foreign Key)
- ✅ Spalte `connected_account_id` hinzugefügt (UUID, Foreign Key)
- ✅ Indizes für bessere Performance

### 2. Modal Komponente
- ✅ Bessere Fehlerbehandlung
- ✅ Loading-State wenn Daten noch laden
- ✅ Debug-Modus für Development
- ✅ Visuelle Verbesserungen
- ✅ Bessere Validierung

### 3. Neue Features
- ✅ Zeigt welche Services verbunden sind
- ✅ Warnung wenn keine Services verbunden
- ✅ Link zur Account-Verbindung
- ✅ Bessere Fehlermeldungen

## Testen:

1. **Dashboard öffnen**: http://localhost:3000/dashboard
2. **"Neuer Key" Button** klicken
3. **Modal sollte erscheinen** mit:
   - Service-Auswahl Karten
   - Input-Felder für Name, Rate Limit, Ablaufdatum
   - Verbundene Services sind grün markiert

4. **Service auswählen** (z.B. FrameSpell)
5. **Name eingeben** (z.B. "Production API")
6. **"API Key erstellen"** klicken
7. **Erfolg!** Du erhältst zwei Keys:
   - FrameSphere Key (fs_...)
   - FrameSpell Key (wird angezeigt)

## Häufige Probleme:

### Modal ist immer noch schwarz
- **Lösung**: Hard Reload im Browser (Ctrl+Shift+R)
- **Oder**: Browser Cache leeren

### "Keine Services verfügbar"
- **Ursache**: Backend läuft nicht
- **Lösung**: `./start-services.sh`

### "Du musst zuerst deinen Account verbinden"
- **Ursache**: Kein Service verbunden
- **Lösung**: Gehe zu Dashboard → Account verbinden

### Fehler: "column service_id does not exist"
- **Ursache**: Datenbank nicht aktualisiert
- **Lösung**: `./update-api-keys-db.sh` ausführen

## Debug-Modus aktivieren:

Im Modal (nur Development):
- Klicke auf "Show Debug Info"
- Siehst du:
  - Anzahl Services
  - Anzahl verbundener Accounts
  - IDs und Namen

## Erfolgskriterien:

✅ Modal öffnet sich mit weißer Karte (nicht schwarz)
✅ Services werden als Karten angezeigt
✅ Verbundene Services sind grün markiert
✅ Formular ist ausfüllbar
✅ API Key wird erfolgreich erstellt
✅ Zwei Keys werden angezeigt (FrameSphere + External)

## Support:

Falls immer noch Probleme:
1. Prüfe Browser Console (F12) auf Fehler
2. Prüfe `backend.log`: `tail -f backend.log`
3. Führe Update-Script nochmal aus
4. Starte alles neu: `./stop-services.sh && ./start-services.sh`
