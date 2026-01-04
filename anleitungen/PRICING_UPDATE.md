# ✅ PREISE AKTUALISIERT!

## 🎯 Was wurde geändert:

Alle Preise wurden auf **ALLEN Seiten** angepasst:

1. ✅ **Produkte-Übersicht** (`/products`)
2. ✅ **FrameSpell Detail** (`/products/framespell`)
3. ✅ **CoreChain AI Detail** (`/products/corechain-ai`)
4. ✅ **Pricing-Seite** (`/pricing`) - war schon korrekt!

---

## 📊 Neue Preise:

### FrameSpell API:
```
Kostenlos:     €0/Monat - 20 Anfragen/Min
Professional:  €29/Monat - 100 Anfragen/Min
Enterprise:    Individuell
```

### CoreChain AI:
```
Token-System:  Ab €2.99 (500 Tokens)
Premium Trial: €9.99/Monat (7 Tage kostenlos)
Team:          €19.99/Monat (30 Tage kostenlos)
```

### CoreChain API:
```
Kostenlos:     €0/Monat - 18 Anfragen/Min
Professional:  €29/Monat - 80 Anfragen/Min
Enterprise:    Individuell
```

### SphereHub:
```
Basismodell:   €199 (einmalig)
Promodell:     €299 (einmalig)
Firmenserver:  Individuell
```

### SphereNet:
```
Standard:      €0 - Bis zu 10 API Keys
Pro:           €20 - Unbegrenzt Keys
Creator:       €49.99 - Eigene Modelle
```

---

## 🚀 Testen:

```bash
cd /Users/karol/Desktop/Laufende_Projekte/FrameSphere
./restart.sh
```

### Dann öffne:

1. **http://localhost:3000/products**
   - Scroll zu Produkten
   - Pricing-Box rechts prüfen

2. **http://localhost:3000/products/framespell**
   - Scroll zu "Preise"
   - 3 Pläne: Kostenlos (€0), Professional (€29), Enterprise

3. **http://localhost:3000/products/corechain-ai**
   - Scroll zu "Preise"
   - 3 Pläne: Token-System, Premium Trial (€9.99), Team (€19.99)

4. **http://localhost:3000/pricing**
   - Tabs durchklicken
   - Alle 5 Produkte haben korrekte Preise

---

## ✅ Checklist:

### Produkte-Übersicht:
- [ ] FrameSpell: €0, €29, Individuell
- [ ] CoreChain AI: Token ab €2.99, Trial €9.99, Team €19.99
- [ ] CoreChain API: €0, €29, Individuell
- [ ] SphereHub: €199, €299, Individuell
- [ ] SphereNet: €0, €20, €49.99

### FrameSpell Detail:
- [ ] Plan 1: Kostenlos - €0/Monat, 20 Anfragen/Min
- [ ] Plan 2: Professional - €29/Monat, 100 Anfragen/Min (Empfohlen Badge)
- [ ] Plan 3: Enterprise - Individuell, Unbegrenzt
- [ ] Pay-per-use Notes sichtbar

### CoreChain AI Detail:
- [ ] Plan 1: Token-System - Flexibel, ab €2.99
- [ ] Plan 2: Premium Trial - €9.99/Monat (Beliebt Badge)
- [ ] Plan 3: Team - €19.99/Monat

### Pricing-Seite:
- [ ] Alle 5 Produkt-Tabs
- [ ] CoreChain AI zeigt Token-System + Trials
- [ ] SphereHub zeigt Hardware-Preise
- [ ] SphereNet zeigt Account-Typen

---

## 🎨 Besondere Features:

### FrameSpell:
- ✅ "Empfohlen" Badge auf Professional
- ✅ Pay-per-use Hinweis unter jedem Plan
- ✅ "notIncluded" Liste (durchgestrichen)

### CoreChain AI:
- ✅ Token-System erklärt
- ✅ "Beliebt" Badge auf Premium Trial
- ✅ Trial-Perioden hervorgehoben

### Pricing-Seite:
- ✅ CoreChain AI hat special Token-Section
- ✅ Täglicher Bonus + Werbung Icons
- ✅ 4 Token-Pakete zum Kauf

---

## 🔄 Was ist konsistent:

✅ Alle Preise stimmen überein zwischen:
- Produkte-Übersicht (Pricing-Box)
- Detail-Seiten (Pricing Section)
- Pricing-Seite (Tabs)

✅ Badges:
- "Empfohlen" = Meistgewählter Plan
- "Beliebt" = Beste Option
- "Live" / "Beta" = Status

---

## 🎯 Schnelltest:

```bash
# 1. Restart
./restart.sh

# 2. Öffne im Browser
http://localhost:3000/products

# 3. Prüfe FrameSpell Pricing-Box:
Sollte zeigen:
- free: €0/Monat - 20 Anfragen/Min
- professional: €29/Monat - 100 Anfragen/Min
- enterprise: Individuell

# 4. Klick "Mehr erfahren"
Scroll zu Pricing Section
Sollte 3 Cards zeigen mit €0, €29, Individuell

# 5. Zurück zu /products
# 6. Prüfe CoreChain AI Pricing-Box:
Sollte zeigen:
- tokens: Token-System ab €2.99
- trial: Premium Trial: €9.99/Monat
- team: Team-Zusammenarbeit: €19.99/Monat
```

---

## 📱 Mobile Test:

```bash
F12 → Device Toolbar
iPhone 12 Pro wählen

Prüfe:
- Pricing-Boxen stacken richtig
- Text bleibt lesbar
- Buttons funktionieren
```

---

## 💡 Weitere Anpassungen möglich:

Sag mir wenn du noch ändern willst:
- ✏️ Andere Preise
- ✏️ Mehr Features in Plänen
- ✏️ Andere Badge-Texte
- ✏️ Currency (€ → $)
- ✏️ Weitere Pläne hinzufügen

---

**TESTE JETZT:**

```bash
./restart.sh
```

Öffne: **http://localhost:3000/products**

Scroll durch alle Produkte und prüfe die Pricing-Boxen!

Dann: **http://localhost:3000/pricing** 

Klick durch alle 5 Tabs! 🎉
