import React from 'react';
import { Shield, Mail, Server, Eye, Lock, Trash2, UserCheck, Globe } from 'lucide-react';

const Section = ({ icon: Icon, title, children }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-400" />
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="text-gray-400 leading-relaxed space-y-3 pl-12">{children}</div>
  </div>
);

const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Datenschutzerklärung</h1>
          <p className="text-gray-400">Zuletzt aktualisiert: April 2025</p>
        </div>

        <div className="card">

          <Section icon={Eye} title="1. Verantwortlicher">
            <p>
              Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:
            </p>
            <div className="mt-2 p-4 rounded-lg bg-dark-700 border border-white/5 text-sm">
              <p className="text-white font-medium">FrameSphere</p>
              <p>Betrieben als Einzelprojekt</p>
              <p>Kontakt: <a href="mailto:privacy@framesphere.dev" className="text-primary-400 hover:underline">privacy@framesphere.dev</a></p>
            </div>
          </Section>

          <Section icon={Server} title="2. Welche Daten wir erheben">
            <p>Wir erheben nur Daten, die für den Betrieb des Dienstes notwendig sind:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><span className="text-white">Konto-Daten:</span> Name und E-Mail-Adresse bei der Registrierung per E-Mail/Passwort.</li>
              <li><span className="text-white">OAuth-Daten:</span> Bei Anmeldung über Google oder GitHub erhalten wir Name, E-Mail-Adresse und Profilbild vom jeweiligen Anbieter. Wir speichern keine OAuth-Tokens dauerhaft.</li>
              <li><span className="text-white">Nutzungsdaten:</span> API-Anfragen, Zeitstempel und technische Logs zur Fehlerdiagnose.</li>
              <li><span className="text-white">Technische Daten:</span> IP-Adresse (Rate-Limiting), Browser-Typ (anonymisiert).</li>
            </ul>
          </Section>

          <Section icon={Globe} title="3. OAuth – Google & GitHub">
            <p>
              Wenn du dich mit Google oder GitHub anmeldest, wirst du zunächst auf die Website des jeweiligen Anbieters weitergeleitet. Dort stimmst du deren Datenschutzrichtlinien zu.
            </p>
            <p>
              FrameSphere erhält nach deiner Zustimmung ausschließlich folgende Informationen:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Deinen öffentlichen Namen</li>
              <li>Deine E-Mail-Adresse (nur primäre, verifizierte Adresse)</li>
              <li>Dein Profilfoto (optional, nur zur Anzeige)</li>
            </ul>
            <p className="mt-3">
              Weiterführende Informationen:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">Google Datenschutz</a>
              {' · '}
              <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">GitHub Datenschutz</a>
            </p>
          </Section>

          <Section icon={Lock} title="4. Zweck der Verarbeitung">
            <ul className="list-disc pl-5 space-y-1">
              <li>Bereitstellung und Absicherung des Nutzerkontos (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li>Schutz vor Missbrauch und Rate-Limiting (Art. 6 Abs. 1 lit. f DSGVO)</li>
              <li>Versand wichtiger Systemnachrichten (keine Werbung ohne explizite Einwilligung)</li>
            </ul>
            <p className="mt-3">
              Wir verkaufen keine personenbezogenen Daten an Dritte und setzen keine Tracking-Pixel oder Werbenetzwerke ein.
            </p>
          </Section>

          <Section icon={Server} title="5. Datenspeicherung & Hosting">
            <p>
              Alle Daten werden in einer PostgreSQL-Datenbank bei <span className="text-white">Supabase</span> (Rechenzentrum: EU-West) gespeichert. Das Backend läuft auf <span className="text-white">Vercel</span> (Serverless, Region: Frankfurt).
            </p>
            <p>
              Daten werden so lange gespeichert, wie dein Konto aktiv ist. Nach Kontolöschung werden alle personenbezogenen Daten innerhalb von 30 Tagen gelöscht.
            </p>
          </Section>

          <Section icon={UserCheck} title="6. Deine Rechte (DSGVO)">
            <p>Du hast das Recht auf:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><span className="text-white">Auskunft</span> – welche Daten wir über dich gespeichert haben</li>
              <li><span className="text-white">Berichtigung</span> – Korrektur unrichtiger Daten</li>
              <li><span className="text-white">Löschung</span> – vollständige Löschung deines Kontos und aller Daten</li>
              <li><span className="text-white">Datenportabilität</span> – Export deiner Daten in maschinenlesbarem Format</li>
              <li><span className="text-white">Widerspruch</span> – gegen bestimmte Verarbeitungen</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung deiner Rechte wende dich an:{' '}
              <a href="mailto:privacy@framesphere.dev" className="text-primary-400 hover:underline">privacy@framesphere.dev</a>
            </p>
          </Section>

          <Section icon={Trash2} title="7. Cookies">
            <p>
              FrameSphere verwendet <span className="text-white">keine Tracking-Cookies</span>. Das JWT-Token zur Authentifizierung wird ausschließlich im <code className="text-primary-400 bg-primary-500/10 px-1 rounded text-sm">localStorage</code> deines Browsers gespeichert und verlässt deinen Browser nur für API-Anfragen an unsere Server.
            </p>
          </Section>

          <Section icon={Mail} title="8. Kontakt & Beschwerden">
            <p>
              Bei Fragen oder Beschwerden zum Datenschutz erreichst du uns unter{' '}
              <a href="mailto:privacy@framesphere.dev" className="text-primary-400 hover:underline">privacy@framesphere.dev</a>.
            </p>
            <p>
              Du hast außerdem das Recht, Beschwerde bei der zuständigen Datenschutzbehörde einzulegen (in Deutschland: der jeweilige Landesbeauftragte für Datenschutz).
            </p>
          </Section>

          <div className="border-t border-white/5 pt-6 mt-4">
            <p className="text-sm text-gray-600 text-center">
              Diese Datenschutzerklärung gilt ab dem 01. April 2025. Änderungen werden auf dieser Seite veröffentlicht.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;
