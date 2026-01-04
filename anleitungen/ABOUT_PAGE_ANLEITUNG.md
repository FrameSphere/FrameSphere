# 📝 Über Uns Seite - Anpassungsanleitung

## 🎯 Wo finde ich die Seite?
`frontend/src/pages/About.jsx`

## ✏️ Was kann ich anpassen?

### 1. Firmen-Grundinformationen (Zeile 17-24)
```javascript
const companyInfo = {
  name: 'FrameSphere',                    // ✏️ Firmenname
  tagline: 'Building the Future...',      // ✏️ Slogan
  founded: '2024',                        // ✏️ Gründungsjahr
  location: 'Mainz, Deutschland',         // ✏️ Standort
  employees: '5-10',                      // ✏️ Mitarbeiteranzahl
  description: 'FrameSphere ist...'       // ✏️ Firmenbeschreibung
};
```

### 2. Mission & Vision (Zeile 27-37)
```javascript
const mission = {
  title: 'Unsere Mission',
  text: 'Wir glauben daran, dass...'     // ✏️ Missions-Text
};

const vision = {
  title: 'Unsere Vision',
  text: 'Wir streben danach...'          // ✏️ Visions-Text
};
```

### 3. Firmen-Werte (Zeile 39-63)
Füge hinzu oder ändere Werte:
```javascript
{
  icon: <Rocket className="w-8 h-8" />,  // ✏️ Icon
  title: 'Innovation',                    // ✏️ Titel
  description: 'Wir pushen...'           // ✏️ Beschreibung
}
```

### 4. Team-Mitglieder (Zeile 65-100)
```javascript
{
  name: 'Max Müller',                    // ✏️ Name
  role: 'CEO & Founder',                 // ✏️ Position
  bio: 'AI-Enthusiast mit...',          // ✏️ Kurze Bio
  image: '👨‍💼',                          // ✏️ Emoji oder Bild-URL
  social: {
    linkedin: '#',                       // ✏️ LinkedIn URL
    twitter: '#',                        // ✏️ Twitter URL
    github: '#'                          // ✏️ GitHub URL
  }
}
```

**Team-Mitglied hinzufügen:**
Kopiere einfach einen Block und füge ihn hinzu!

**Team-Mitglied entfernen:**
Lösche den entsprechenden Block aus dem Array.

### 5. Meilensteine/Timeline (Zeile 102-127)
```javascript
{
  year: '2024',                          // ✏️ Jahr
  title: 'Gründung von FrameSphere',    // ✏️ Ereignis-Titel
  description: 'Start mit der Vision...' // ✏️ Beschreibung
}
```

### 6. Statistiken (Zeile 129-134)
```javascript
{ value: '10,000+', label: 'Aktive Nutzer' },     // ✏️ Ändern
{ value: '50M+', label: 'API Calls/Monat' },      // ✏️ Ändern
{ value: '99.9%', label: 'Uptime SLA' },          // ✏️ Ändern
{ value: '24/7', label: 'Support' }                // ✏️ Ändern
```

## 🎨 Design-Elemente

### Icons ändern
Alle verfügbaren Icons findest du hier: [Lucide Icons](https://lucide.dev/)

Beispiel:
```javascript
import { Rocket, Heart, Star } from 'lucide-react';
```

### Farben
Die Seite nutzt dein bestehendes Farbschema:
- `from-primary-500 to-purple-500` - Haupt-Gradient
- `from-green-500 to-emerald-500` - Alternative
- `text-gray-400` - Beschreibungstext
- `text-white` - Überschriften

## 📸 Team-Bilder hinzufügen

Statt Emojis echte Bilder verwenden:

1. **Bilder in den Public-Ordner legen:**
```
frontend/public/team/max-mueller.jpg
```

2. **In der About.jsx ändern:**
```javascript
image: '/team/max-mueller.jpg',  // statt '👨‍💼'
```

3. **Im JSX dann so anzeigen:**
```javascript
<img 
  src={member.image} 
  alt={member.name}
  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
/>
```

## 🔗 Social Media Links

Ersetze die `#` mit echten URLs:

```javascript
social: {
  linkedin: 'https://linkedin.com/in/maxmueller',
  twitter: 'https://twitter.com/maxmueller',
  github: 'https://github.com/maxmueller'
}
```

Social Media Links entfernen, wenn nicht vorhanden:
```javascript
social: {
  linkedin: 'https://...'
  // twitter weggelassen = wird nicht angezeigt
}
```

## 📱 Responsive Design

Die Seite ist bereits vollständig responsive:
- Mobile: 1 Spalte
- Tablet: 2 Spalten
- Desktop: 3-4 Spalten

## 🚀 Schnell-Anleitung

**5-Minuten Setup:**

1. Öffne `frontend/src/pages/About.jsx`
2. Ändere in Zeile 17-24 die Firmen-Infos
3. Ändere in Zeile 65-100 die Team-Mitglieder
4. Speichern - fertig! ✅

**Seite aufrufen:**
http://localhost:5173/about

## 💡 Tipps

- Halte Beschreibungen kurz und prägnant
- Verwende konsistente Bild-Formate fürs Team
- Aktualisiere die Timeline regelmäßig
- Nutze authentische Statistiken

## ❓ Häufige Fragen

**Q: Wie füge ich mehr Team-Mitglieder hinzu?**
A: Kopiere einen bestehenden Block im `team` Array und passe die Werte an.

**Q: Kann ich mehr als 4 Werte hinzufügen?**
A: Ja! Das Grid passt sich automatisch an. Bei mehr als 4 Werten wird eine zweite Reihe erstellt.

**Q: Wie ändere ich die Reihenfolge der Sektionen?**
A: Verschiebe einfach die `<section>`-Blöcke im JSX nach oben oder unten.

---

**Die Seite ist jetzt live unter:** `/about` 🎉
