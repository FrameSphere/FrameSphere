#!/bin/bash

echo "🔧 Aktualisiere FrameSphere Datenbank für API Keys..."

# Führe SQL Update aus
export PGPASSWORD='framesphere_password'
psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/update-api-keys-table.sql

if [ $? -eq 0 ]; then
    echo "✅ Datenbank erfolgreich aktualisiert!"
    echo ""
    echo "Bitte Backend neu starten:"
    echo "  ./stop-services.sh"
    echo "  ./start-services.sh"
else
    echo "❌ Fehler beim Aktualisieren der Datenbank"
    echo "Führe manuell aus:"
    echo "  psql -h localhost -p 5432 -U framesphere_user -d framesphere -f backend/scripts/update-api-keys-table.sql"
fi

unset PGPASSWORD
