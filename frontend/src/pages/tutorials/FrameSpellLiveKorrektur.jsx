import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, Clock, Zap, CheckCircle } from 'lucide-react';

function CodeBlock({ code, lang = '' }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative mb-6">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-700 rounded-t-lg border-b border-white/5">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{lang}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
        </button>
      </div>
      <pre className="bg-dark-900 rounded-b-lg p-5 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed border border-white/5 border-t-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Callout({ type = 'info', children }) {
  const styles = { info: 'bg-primary-500/10 border-primary-500/40 text-primary-200', warn: 'bg-yellow-500/10 border-yellow-500/40 text-yellow-200', success: 'bg-green-500/10 border-green-500/40 text-green-200' };
  const icons = { info: '💡', warn: '⚠️', success: '✅' };
  return <div className={`flex gap-3 p-4 rounded-lg border mb-6 text-sm leading-relaxed ${styles[type]}`}><span className="flex-shrink-0">{icons[type]}</span><div>{children}</div></div>;
}

function Step({ n, title, children }) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 text-primary-300 flex items-center justify-center text-sm font-bold">{n}</div>
      <div className="flex-1"><h3 className="font-bold text-white mb-3">{title}</h3>{children}</div>
    </div>
  );
}

const TutorialLiveKorrektur = () => (
  <div className="min-h-screen pt-20 pb-20 px-4">
    <div className="max-w-3xl mx-auto">

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/developers/tutorials" className="hover:text-primary-400 transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Tutorials
        </Link>
        <span>/</span>
        <span className="text-white">Live-Korrektur in einem Texteditor</span>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-xs px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full font-semibold">FrameSpell API</span>
          <span className="text-xs px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Fortgeschritten</span>
          <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> 20 Min.</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Live-Korrektur in einem Texteditor</h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Baue einen vollständigen Texteditor mit Echtzeit-Rechtschreibprüfung: Fehler werden unterstrichen, Korrekturen per Klick übernommen — wie in einem professionellen Schreibtool.
        </p>
        <div className="flex gap-4 mt-4 text-sm text-gray-500">
          <span>März 2026</span><span>·</span><span>Vanilla JS / React</span>
        </div>
      </div>

      <div className="card mb-10 bg-gradient-to-br from-primary-500/10 to-purple-500/10 border-primary-500/20">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-primary-400" /> Was du lernst</h2>
        <ul className="space-y-2">
          {['Debounced Live-Check: Prüfung 600ms nach letztem Tastendruck', 'Word-Level Diff: Welche Wörter haben sich verändert?', 'Inline-Highlighting: Fehler optisch unterstreichen', 'Click-to-Accept: Korrekturen mit Klick übernehmen', 'Performance: Nur geänderte Absätze neu prüfen'].map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-8">Schritt-für-Schritt</h2>

        <Step n="1" title="Debounce-Utility erstellen">
          <p className="text-gray-400 text-sm mb-4">Wir brauchen einen Debounce-Helper, damit nicht bei jedem Tastendruck eine API-Anfrage gesendet wird — sondern erst nach einer Pause:</p>
          <CodeBlock lang="utils/debounce.ts" code={`// utils/debounce.ts
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}`} />
        </Step>

        <Step n="2" title="Word-Level Diff berechnen">
          <p className="text-gray-400 text-sm mb-4">Um nur die veränderten Wörter hervorzuheben, brauchen wir einen einfachen Wort-für-Wort-Vergleich zwischen Original und Korrektur:</p>
          <CodeBlock lang="utils/diff.ts" code={`// utils/diff.ts

export interface WordDiff {
  word:        string;
  correction?: string;    // undefined wenn korrekt
  hasError:    boolean;
  index:       number;
}

export function computeWordDiff(original: string, corrected: string): WordDiff[] {
  const origWords = original.split(' ');
  const corrWords = corrected.split(' ');

  return origWords.map((word, idx) => {
    const correction = corrWords[idx];
    const hasError   = word !== correction && correction !== undefined;

    return {
      word,
      correction: hasError ? correction : undefined,
      hasError,
      index: idx,
    };
  });
}

// Beispiel:
// computeWordDiff("Ich wone in Münhen", "Ich wohne in München")
// → [
//     { word: "Ich",    hasError: false },
//     { word: "wone",   correction: "wohne", hasError: true },
//     { word: "in",     hasError: false },
//     { word: "Münhen", correction: "München", hasError: true },
//   ]`} />
        </Step>

        <Step n="3" title="Live-Editor React-Komponente">
          <p className="text-gray-400 text-sm mb-4">Die Hauptkomponente: Textarea für die Eingabe, darunter die Rendered-Ansicht mit Inline-Highlighting:</p>
          <CodeBlock lang="components/LiveSpellEditor.tsx" code={`// components/LiveSpellEditor.tsx
'use client';
import { useState, useCallback, useRef } from 'react';
import { computeWordDiff, WordDiff }     from '@/utils/diff';
import { debounce }                      from '@/utils/debounce';

async function spellcheckViaBackend(text: string): Promise<string> {
  const resp = await fetch('/api/spellcheck', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language: 'de' }),
  });
  const data = await resp.json();
  if (!data.success) throw new Error(data.error);
  return data.data.corrected;
}

export function LiveSpellEditor() {
  const [text, setText]         = useState('');
  const [diffs, setDiffs]       = useState<WordDiff[]>([]);
  const [checking, setChecking] = useState(false);
  const [errorCount, setErrors] = useState(0);

  // Debounced Check – 600ms nach letztem Tastendruck
  const checkText = useCallback(
    debounce(async (raw: string) => {
      if (raw.trim().length < 5) { setDiffs([]); return; }
      setChecking(true);
      try {
        const corrected = await spellcheckViaBackend(raw);
        const wordDiffs = computeWordDiff(raw, corrected);
        setDiffs(wordDiffs);
        setErrors(wordDiffs.filter(d => d.hasError).length);
      } catch {
        // Fehler still ignorieren – kein UI-Crash
      } finally {
        setChecking(false);
      }
    }, 600),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    checkText(value);
  };

  // Einzelnes Wort durch Korrektur ersetzen
  const acceptWord = (diff: WordDiff) => {
    if (!diff.correction) return;
    const words    = text.split(' ');
    words[diff.index] = diff.correction;
    const newText  = words.join(' ');
    setText(newText);
    checkText(newText);
  };

  // Alle Korrekturen auf einmal übernehmen
  const acceptAll = () => {
    const corrected = diffs.map(d => d.correction ?? d.word).join(' ');
    setText(corrected);
    setDiffs([]);
    setErrors(0);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-6">

      {/* Status-Bar */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="text-gray-400">Live-Rechtschreibprüfung</span>
          {checking && (
            <div className="flex items-center gap-1 text-gray-500">
              <div className="w-3 h-3 border border-indigo-400 border-t-transparent rounded-full animate-spin" />
              Prüfe…
            </div>
          )}
        </div>
        {errorCount > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-red-400 font-semibold">{errorCount} Fehler</span>
            <button onClick={acceptAll}
              className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg
                         text-xs font-semibold transition-colors">
              Alle korrigieren
            </button>
          </div>
        )}
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Text eingeben – Fehler werden automatisch erkannt…"
        rows={8}
        className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700
                   text-white resize-y focus:outline-none focus:border-indigo-500
                   text-base leading-relaxed"
      />

      {/* Rendered Diff-Ansicht */}
      {diffs.length > 0 && (
        <div className="p-4 bg-gray-900/60 border border-gray-700 rounded-xl leading-relaxed text-base">
          {diffs.map((diff, i) => (
            <span key={i}>
              {diff.hasError ? (
                <span className="relative group inline-block">
                  {/* Unterstrichenes Wort */}
                  <span className="text-red-300 underline decoration-red-500 decoration-wavy
                                   cursor-pointer hover:bg-red-500/20 rounded px-0.5 transition-colors"
                    onClick={() => acceptWord(diff)}
                    title={\`Korrektur: \${diff.correction}\`}>
                    {diff.word}
                  </span>
                  {/* Tooltip mit Korrektur */}
                  <span className="absolute -top-9 left-0 z-10 px-2 py-1 bg-gray-800 border
                                   border-gray-600 rounded text-xs text-green-300 whitespace-nowrap
                                   opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    → {diff.correction}
                  </span>
                </span>
              ) : (
                <span className="text-gray-200">{diff.word}</span>
              )}
              {i < diffs.length - 1 ? ' ' : ''}
            </span>
          ))}
        </div>
      )}

      {/* Keine Fehler */}
      {diffs.length > 0 && errorCount === 0 && !checking && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-300 text-sm">
          ✓ Keine Rechtschreibfehler gefunden.
        </div>
      )}
    </div>
  );
}`} />
          <Callout type="info">
            <strong>Warum contentEditable statt Textarea?</strong> Eine Textarea kann keinen formatierten HTML-Inhalt rendern. Daher zeigen wir unterhalb der Textarea eine separate Read-only-Ansicht mit dem HTML-Diff. Für einen echten Rich-Text-Editor empfiehlt sich <code>contentEditable</code> oder eine Lib wie Tiptap/Slate.
          </Callout>
        </Step>

        <Step n="4" title="Fortgeschritten: ContentEditable-Editor">
          <p className="text-gray-400 text-sm mb-4">Für eine echte Inline-Bearbeitungserfahrung (Fehler direkt im Text unterstrichen) kann man <code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">contentEditable</code> in Kombination mit <code className="text-indigo-300 text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">innerHTML</code> verwenden:</p>
          <CodeBlock lang="utils/renderDiff.ts" code={`// utils/renderDiff.ts
// Erzeugt HTML-String mit markierten Fehlern
export function renderDiffAsHtml(diffs: WordDiff[]): string {
  return diffs.map((diff, i) => {
    const space = i < diffs.length - 1 ? ' ' : '';
    if (diff.hasError) {
      return \`<span class="spell-error"
                    data-correction="\${diff.correction}"
                    data-index="\${diff.index}"
                    title="→ \${diff.correction}">\${diff.word}</span>\${space}\`;
    }
    return diff.word + space;
  }).join('');
}

// CSS (global.css):
// .spell-error {
//   text-decoration: underline wavy red;
//   cursor: pointer;
//   border-radius: 2px;
// }
// .spell-error:hover { background: rgba(239,68,68,0.15); }`} />
          <Callout type="success">
            <strong>Ergebnis:</strong> Fehlerhafte Wörter werden mit einer roten Wellenlinie unterstrichen. Per Klick wird das Wort sofort ersetzt — genau wie in Google Docs oder Word.
          </Callout>
        </Step>

        <Step n="5" title="Performance-Optimierung: Nur geänderte Absätze prüfen">
          <p className="text-gray-400 text-sm mb-4">Bei langen Texten ist es ineffizient, bei jeder Änderung den gesamten Text zu prüfen. Teile den Text in Absätze und merke dir, welche sich verändert haben:</p>
          <CodeBlock lang="utils/paragraphCheck.ts" code={`// Smarter: Nur geänderte Absätze erneut prüfen
const previousParagraphs = useRef<string[]>([]);
const cachedCorrections  = useRef<Map<string, string>>(new Map());

const checkChangedParagraphs = useCallback(
  debounce(async (text: string) => {
    const paragraphs = text.split('\\n\\n');

    const results = await Promise.all(
      paragraphs.map(async (para, i) => {
        // Cache-Hit: Absatz unverändert → gespeicherte Korrektur verwenden
        if (para === previousParagraphs.current[i]) {
          return cachedCorrections.current.get(para) ?? para;
        }

        // Neu prüfen
        const corrected = await spellcheckViaBackend(para);
        cachedCorrections.current.set(para, corrected);
        return corrected;
      })
    );

    previousParagraphs.current = paragraphs;
    const fullCorrected = results.join('\\n\\n');
    setDiffs(computeWordDiff(text, fullCorrected));
  }, 600),
  []
);`} />
        </Step>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/developers/tutorials/framespell-in-react" className="btn-secondary text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Tutorial 1: React Einsteiger
        </Link>
        <Link to="/developers/tutorials/framespell-batch" className="btn-primary text-sm flex items-center gap-2">
          Nächstes Tutorial: Batch-Verarbeitung <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);

export default TutorialLiveKorrektur;
