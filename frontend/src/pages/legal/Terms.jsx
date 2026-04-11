import React from 'react';
import { FileText, ShieldAlert, Ban, RefreshCw, Scale, Mail, AlertTriangle, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-5">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Nutzungsbedingungen</h1>
          <p className="text-gray-400">Zuletzt aktualisiert: April 2025</p>
        </div>

        <div className="card">

          <Section icon={FileText} title="1. Geltungsbereich">
            <p>
              Diese Nutzungsbedingungen gelten für alle Dienste, APIs und Web-Anwendungen, die unter der Marke <span className="text-white">FrameSphere</span> betrieben werden, einschließlich FrameSpell, FrameTrain, SphereHub, SphereNet, KeyScope und SiteControl.
            </p>
            <p>
              Mit der Registrierung oder der Nutzung unserer Dienste erklärst du dich mit diesen Bedingungen einverstanden.
            </p>
          </Section>

          <Section icon={Wrench} title="2. Leistungsumfang">
            <p>FrameSphere stellt folgende Dienste bereit:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>KI-gestützte APIs (FrameSpell, CoreChain, RateLimit API etc.)</li>
              <li>Web-Anwendungen und Tools (Wordify, FlagGuess etc.)</li>
              <li>Developer-Ressourcen (Dokumentation, SDKs, Quickstart-Guides)</li>
              <li>Nutzerkonto mit Dashboard und API-Key-Verwaltung</li>
            </ul>
            <p className="mt-3">
              Wir behalten uns vor, Funktionen jederzeit zu ändern, zu ergänzen oder einzustellen — insbesondere da sich FrameSphere in aktiver Entwicklung befindet.
            </p>
          </Section>

          <Section icon={ShieldAlert} title="3. Nutzungspflichten">
            <p>Du verpflichtest dich, unsere Dienste nur für legale Zwecke zu nutzen. Verboten ist insbesondere:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Umgehung von Rate-Limits oder Sicherheitsmechanismen</li>
              <li>Automatisierter Missbrauch der API ohne gültige Authentifizierung</li>
              <li>Weiterverkauf von API-Zugängen ohne ausdrückliche schriftliche Genehmigung</li>
              <li>Nutzung für Spam, Phishing oder andere unlautere Zwecke</li>
              <li>Reverse Engineering der Backend-Systeme</li>
            </ul>
          </Section>

          <Section icon={Ban} title="4. Kontosperrung & Kündigung">
            <p>
              FrameSphere behält sich das Recht vor, Konten bei Verstößen gegen diese Bedingungen ohne Vorankündigung zu sperren oder zu löschen.
            </p>
            <p>
              Du kannst dein Konto jederzeit selbst löschen. Nach der Löschung werden deine Daten gemäß unserer{' '}
              <Link to="/legal/privacy" className="text-primary-400 hover:underline">Datenschutzerklärung</Link>{' '}
              behandelt.
            </p>
          </Section>

          <Section icon={AlertTriangle} title="5. Haftungsausschluss">
            <p>
              FrameSphere wird als Einzelprojekt ohne kommerzielle Garantien betrieben. Die Dienste werden <span className="text-white">„as is"</span> bereitgestellt.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Wir übernehmen keine Garantie für eine bestimmte Verfügbarkeit oder Fehlerfreiheit.</li>
              <li>Wir haften nicht für Schäden, die durch die Nutzung oder Nichtverfügbarkeit unserer Dienste entstehen.</li>
              <li>KI-generierte Inhalte (z. B. via FrameSpell) sind keine rechtlich bindenden Aussagen.</li>
            </ul>
          </Section>

          <Section icon={RefreshCw} title="6. Änderungen der Bedingungen">
            <p>
              Wir können diese Nutzungsbedingungen jederzeit anpassen. Bei wesentlichen Änderungen informieren wir registrierte Nutzer per E-Mail oder Systemnachricht.
            </p>
            <p>
              Die fortgesetzte Nutzung nach einer Änderung gilt als Zustimmung zu den aktualisierten Bedingungen.
            </p>
          </Section>

          <Section icon={Scale} title="7. Anwendbares Recht">
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Betreibers.
            </p>
            <p>
              Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </Section>

          <Section icon={Mail} title="8. Kontakt">
            <p>
              Bei Fragen zu diesen Nutzungsbedingungen erreichst du uns unter:{' '}
              <a href="mailto:legal@framesphere.dev" className="text-primary-400 hover:underline">legal@framesphere.dev</a>
            </p>
          </Section>

          <div className="border-t border-white/5 pt-6 mt-4">
            <p className="text-sm text-gray-600 text-center">
              Diese Nutzungsbedingungen gelten ab dem 01. April 2025.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;
