# FrameSphere – Design-System „Ink / Bone / Signal“

## Farben: 2 + 1

| Token | Wert | Rolle |
|---|---|---|
| `ink` | `#0B0B0C` | Grundfläche, neutrales Schwarz ohne Blaustich |
| `bone` | `#F2EFE8` (+ Skala `bone-50…950`) | Text, Linien, helle Kontrastflächen (Web-Apps-Block) |
| `signal` | `#FF4D2E` (+ Skala) | Die **eine** Farbe, die heraussticht: Primär-Buttons, aktiver Zustand, ein Wort pro Headline |

Regeln:
- Pro Ansicht nur wenige Signal-Flächen. Je seltener das Signal, desto stärker wirkt es.
- Primär-Buttons: Ink-Text auf Signal (Kontrast ≈ 5,9 : 1). Weiß auf Signal hätte nur ≈ 3,3 : 1.
- Grün / Rot / Amber nur semantisch (Status, Fehler, Warnung).
- Die bunten Tailwind-Familien sind in `tailwind.config.js` umgeleitet: `blue/indigo/cyan/sky/teal/gray/slate/zinc → bone`, `purple/violet/pink/rose/fuchsia/orange → signal`. Alte Seiten fallen so automatisch ins System. In neuem Code direkt `ink`, `bone-*`, `signal-*` verwenden.

## Typografie

- **Bricolage Grotesque** (Display, h1–h3): Charakter, enge Laufweite (−0,03 bis −0,045 em).
- **Geist** (Fließtext), **Geist Mono** (Labels, Zahlen, Code).
- Lesemaß über `.measure` (65ch), tabellarische Ziffern über `.tabular`.

## Komponenten

`.btn-primary`, `.btn-secondary`, `.btn-ink` (für Bone-Flächen), `.card`, `.eyebrow`, `.kbd`, `.dot-grid`, `.measure`.
`.glass-effect` und `.gradient-text` gibt es nur noch aus Kompatibilitätsgründen: opake Fläche bzw. Signal-Text, kein Blur, kein Verlauf.

## Grundlagen aus der Forschung

| Prinzip | Quelle | Umsetzung |
|---|---|---|
| Isolationseffekt: Das eine abweichende Element wird erinnert | von Restorff (1933) | Eine Akzentfarbe statt Regenbogen |
| Erster Eindruck entsteht in ~50 ms; Prototypikalität und geringe Komplexität wirken positiv | Lindgaard et al. (2006); Tuch et al. (2012); Reinecke et al. (2013) | Ruhige Flächen, klare Hierarchie, keine Farbblobs |
| Ästhetik beeinflusst wahrgenommene Benutzbarkeit | Kurosu & Kashimura (1995); Tractinsky (1997) | Sorgfältige Typografie und Details |
| Entscheidungszeit wächst mit der Zahl der Optionen | Hick (1952); Hyman (1953) | ⌘K-Suche statt tief verschachtelter Menüs |
| Zielgröße und Distanz bestimmen die Zeigezeit | Fitts (1954) | Buttons ≥ 44 px hoch |
| Lesbarkeit hängt von der Zeilenlänge ab | Dyson & Haselgrove (2001); Bringhurst | `.measure` ≈ 65 Zeichen |
| Scanmuster: Nutzer überfliegen links ausgerichtete Inhalte | Nielsen (2006), Eyetracking | Linksbündige Headlines, nummerierter Index |
| Gemeinsames Schicksal gruppiert Elemente | Gestaltgesetze (Wertheimer) | Index-Hover dreht die Sphere zum Produkt |
| Bewegung kann schaden | WCAG 2.2, 2.3.3 | `prefers-reduced-motion` stoppt Animationen |

## Inhalt: Zahlen nur mit Beleg

Produktdaten stehen zentral in `frontend/src/data/catalog.js`. Jede Zahl muss aus Code, Konfiguration oder einer Messung stammen. Keine Genauigkeits-, Latenz- oder Uptime-Werte ohne Benchmark.
