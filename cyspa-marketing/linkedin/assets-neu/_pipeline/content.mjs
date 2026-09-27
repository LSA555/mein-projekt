// Content-Definitionen für alle Batch-1-Visuals.
// Slide-Typen werden in build.mjs gerendert. Copy folgt den Visual-Briefings
// in linkedin/posts/ und dem Styleguide (de-CH, max. ~40 Woerter pro Slide).

const ALL = [
  {
    slug: '2026-09-08-p01-mfa',
    badge: 'QUICK TIP',
    format: 'carousel', // 1080x1350, PDF + PNGs
    slides: [
      { t: 'cover', title: 'MFA ist nicht gleich MFA.', sub: '5 Massnahmen gegen Phishing und MFA-Fatigue' },
      { t: 'split', title: 'Warum klassische MFA fällt', cards: [
        { head: 'MFA-Fatigue', body: 'Push-Anfragen im Minutentakt, bis jemand entnervt «Genehmigen» tippt.' },
        { head: 'Echtzeit-Phishing', body: 'Die gefälschte Login-Seite reicht Passwort und Code direkt an die echte weiter.' },
      ]},
      { t: 'point', num: '1', title: 'Number Matching aktivieren', body: 'Blindes Bestätigen fällt weg: Wer sich anmeldet, muss die angezeigte Zahl eintippen.', mono: 'Microsoft Authenticator' },
      { t: 'point', num: '2', title: 'Passkeys / FIDO2 einführen', body: 'Der Schlüssel funktioniert nur auf der echten Domain — Fälschungen laufen ins Leere. Start: Admin-Konten.', mono: 'FIDO2 · Passkeys' },
      { t: 'point', num: '3', title: 'Legacy-Protokolle abschalten', body: 'Alte Protokolle umgehen MFA komplett. Vorher in den Logs prüfen, was noch darüber läuft.', mono: 'IMAP · POP · SMTP Basic Auth' },
      { t: 'point', num: '4', title: 'MFA auf alle Zugänge', body: 'Nicht nur Microsoft 365: auch VPN, Firewall-Administration, Fernwartung und Hosting-Portale.' },
      { t: 'cta', num: '5', title: 'Notfallkonten im Griff', body: 'Break-Glass-Konten definieren, von den Regeln ausnehmen — und jede Nutzung alarmieren.',
        merk: 'Entscheidend ist nicht, wie stark der zweite Faktor ist — sondern ob er sich phishen lässt.', url: true },
    ],
  },
  {
    slug: '2026-09-10-p04-backup',
    badge: 'RESILIENZ KONKRET',
    format: 'single', // 1200x1500
    noUrl: true, // Briefing: URL steht im Post-Text, nicht auf dem Visual
    slides: [
      { t: 'formula', title: 'Backup ist keine Versicherung. Restore ist eine.',
        sub: 'Ob Ihre Sicherung einen Ransomware-Fall übersteht, entscheidet der getestete Restore.',
        boxes: [
          { n: '3', label: 'Kopien' },
          { n: '2', label: 'Speicherarten' },
          { n: '1', label: 'ausser Haus' },
          { n: '1', label: 'offline oder unveränderbar' },
          { n: '0', label: 'Fehler im Restore-Test' },
        ],
        foot: 'Die vier Prüffragen für die Geschäftsleitung stehen im Beitrag.' },
    ],
  },
  {
    slug: '2026-09-15-p03-verwaltungsrat',
    badge: 'CHEFSACHE CYBER',
    format: 'single',
    theme: 'light',
    slides: [
      { t: 'quote', quote: 'Umsetzung kann man delegieren. Verantwortung nicht.',
        meta: 'Cyber-Risikoaufsicht ist Teil der Oberleitung — Art. 716a OR' },
    ],
  },
  {
    slug: '2026-09-17-p05-conditional-access',
    badge: 'MICROSOFT SECURITY PRAXIS',
    format: 'carousel',
    slides: [
      { t: 'cover', title: 'Die teuerste CA-Policy? Die auf Report-only vergessene.', sub: 'Conditional Access: 3 Basis-Policies — und das Handwerk drumherum' },
      { t: 'split', title: 'Report-only richtig nutzen', cards: [
        { head: 'Einführungsmodus', body: 'Zeigt, was eine Policy blockieren würde — ohne jemanden auszusperren.', tone: 'ok' },
        { head: 'Kein Betriebsmodus', body: 'Sieht im Portal aus wie Schutz. Schützt nichts.', tone: 'bad' },
      ]},
      { t: 'point', num: '1', title: 'MFA für alle Benutzer', body: 'Nicht nur für Administratoren. Ausnahmen sind einzeln begründet — nicht historisch gewachsen.', mono: 'Require multifactor authentication' },
      { t: 'point', num: '2', title: 'Legacy-Auth blockieren', body: 'Alte Protokolle kennen kein MFA. Vorher in den Sign-in-Logs prüfen, was noch darüber läuft.', mono: 'Block legacy authentication' },
      { t: 'point', num: '3', title: 'Admin-Rollen verschärfen', body: 'Phishing-resistente MFA und verwaltete Geräte für alle privilegierten Rollen.', mono: 'Require phishing-resistant MFA' },
      { t: 'cta', title: 'Das Handwerk drumherum', list: [
        'Break-Glass-Konten ausnehmen — und jede Anmeldung alarmieren',
        'Neue Policy: Report-only → prüfen → aktivieren. Mit Termin.',
        'Ohne Entra ID P1: Security Defaults aktivieren',
      ], merk: 'Selbstcheck: Report-only älter als 30 Tage? Aktivieren oder löschen.', url: true },
    ],
  },
  {
    slug: '2026-09-22-p02-faq-zu-klein',
    badge: 'KURZ GEFRAGT',
    format: 'single',
    slides: [
      { t: 'quote', quote: '«Wir sind zu klein, um ein Ziel zu sein.»',
        answer: 'Der Scan kennt Ihren Namen nicht. Er kennt Ihre offene Tür.' },
    ],
  },
  {
    slug: '2026-09-24-p07-shadow-ai',
    badge: 'AI SECURITY',
    format: 'single',
    slides: [
      { t: 'steps', title: 'Shadow AI: Verbieten macht unsichtbar.',
        sub: 'Der Weg zu kontrollierter KI-Nutzung',
        steps: ['Sichtbarkeit schaffen', 'Regeln nach Datenklassen', 'Freigegebene Alternative', 'Befähigen statt bestrafen'] },
    ],
  },
  {
    slug: '2026-09-29-p06-nis2',
    badge: 'REGULATORIK IM KLARTEXT',
    format: 'single',
    slides: [
      { t: 'ways', title: 'NIS2 ist EU-Recht. Und erreicht die Schweiz trotzdem.',
        from: 'EU', to: 'CH',
        arrows: ['EU-Tochtergesellschaften', 'Lieferkettenanforderungen', 'Marktzugang'],
        foot: 'Parallel in der Schweiz: ISG-Meldepflicht — Cyberangriffe auf kritische Infrastrukturen innert 24 h ans BACS (seit 01.04.2025)' },
    ],
  },
  {
    slug: '2026-10-06-p09-pentest',
    badge: 'LESSONS FROM THE FIELD',
    format: 'single',
    slides: [
      { t: 'lines', title: 'Kein Exploit nötig. Ein Login reicht.',
        sub: 'Was sich in Sicherheitstests wiederholt:',
        items: ['Zugänge ohne MFA', 'Wiederverwendete Passwörter', 'Vergessene, extern erreichbare Systeme', 'Zu breite Berechtigungen'],
        foot: 'Identitäten und Angriffsfläche zuerst — dann der Rest.' },
    ],
  },
  {
    slug: '2026-10-08-p12-tabletop',
    badge: 'EXECUTIVE BRIEFING',
    format: 'carousel',
    slides: [
      { t: 'cover', title: 'Samstag, 06:40 Uhr. Wer entscheidet jetzt was?', sub: 'Warum eine Tabletop-Übung Ihrem Führungsteam 90 Minuten wert ist' },
      { t: 'split', title: 'Tabletop = Entscheidungsübung', cards: [
        { head: 'Testet die Organisation', body: 'Entscheide, Rollen, Kommunikation — mit den richtigen Personen am Tisch.', tone: 'ok' },
        { head: 'Testet nicht die Firewall', body: 'Keine Technik-Simulation. Kein System wird angefasst.', tone: 'bad' },
      ]},
      { t: 'point', num: '1', title: 'Unklare Befugnisse', body: 'Wer darf Systeme vom Netz nehmen — auch wenn das Geschäft steht? Wer beauftragt Externe, bis zu welchem Betrag?' },
      { t: 'point', num: '2', title: 'Kommunikation ohne E-Mail', body: 'Wie erreichen Sie Mitarbeitende und Kunden, wenn E-Mail und Chat betroffen sind? Wo liegen die Notfallkontakte?' },
      { t: 'split', title: 'Fristen und Dienstleister', cards: [
        { head: 'Meldefristen', body: 'Wer meldet was bis wann — Datenschutz, Verträge, allenfalls Aufsicht?' },
        { head: 'Der erste Anruf', body: 'Wer ist zuständig — und gilt der Support-Vertrag auch am Wochenende?' },
      ]},
      { t: 'cta', title: 'Ein halber Tag. Eine dokumentierte Erkenntnisliste.',
        merk: 'Ihr Incident-Response-Plan ist eine Hypothese. Die Übung ist ihr Test.',
        note: 'Details und Terminanfrage: Link im ersten Kommentar', url: true },
    ],
  },
  {
    slug: '2026-10-13-p10-harvest',
    badge: 'FUTURE SECURITY',
    format: 'single',
    slides: [
      { t: 'seq', title: '«Harvest now, decrypt later»',
        stages: [
          { icon: 'lock', label: 'heute abfangen' },
          { icon: 'archive', label: 'jahrelang speichern' },
          { icon: 'unlock', label: 'morgen entschlüsseln' },
        ],
        question: 'Wie lange müssen Ihre Daten vertraulich bleiben?' },
    ],
  },
  // ---------------------------------------------------------------- Oktober 20.–29.10.2026 (neu)
  {
    slug: '2026-10-20-p01-passwordless',
    badge: 'QUICK TIP',
    format: 'single',
    slides: [
      { t: 'numlist', title: 'Was man nicht eintippen kann, kann auch keine gefälschte Seite abgreifen.',
        sub: 'Der Weg zu Passkeys in vier Schritten',
        items: [
          'Ein eigenes Passwort pro Konto, ohne Ausnahme',
          'Passwort-Manager für alle Mitarbeitenden',
          'Phishing-resistente MFA, zuerst für Admin-Konten',
          'Passkeys für alle, Passwort-Logins schrittweise abschalten',
        ],
        foot: 'Schritt 1 und 2 lassen sich ohne grosses Projekt starten.' },
    ],
  },
  {
    slug: '2026-10-22-p04-it-vertrag',
    badge: 'RESILIENZ KONKRET',
    format: 'single',
    slides: [
      { t: 'lines', title: 'Lesen Sie den IT-Vertrag, bevor Sie ihn im Ernstfall brauchen.',
        sub: 'Fünf Fragen vor der nächsten Verlängerung:',
        items: [
          'Reaktion auch nachts und am Wochenende?',
          'Vorfall im Vertrag oder nach Aufwand?',
          'Ihr Zugang ohne den Dienstleister?',
          'Wer sichert die Spuren?',
          'Wer zieht Spezialisten bei?',
        ],
        foot: 'Die Klärung schützt beide Seiten.' },
    ],
  },
  {
    slug: '2026-10-27-p05-gastkonten',
    badge: 'MICROSOFT SECURITY PRAXIS',
    format: 'carousel',
    slides: [
      { t: 'cover', title: 'Wer darf in Ihrem Tenant Gäste einladen?',
        sub: 'Standard in Entra ID: alle Benutzer, auch Gäste. Fünf Prüfpunkte für Ihre Gastkonten.' },
      { t: 'point', num: '1', title: 'Gäste sichtbar machen',
        body: 'Benutzerliste nach Typ «Gast» filtern und die letzte Anmeldung einblenden. Jedes inaktive Konto braucht einen Entscheid.',
        mono: 'Last interactive sign-in time' },
      { t: 'point', num: '2', title: 'Einladen eingrenzen',
        body: 'Nur festgelegte Rollen laden ein. Für Fachbereiche gibt es die Rolle Guest Inviter, ohne weitere Admin-Rechte.',
        mono: 'Guest invite settings' },
      { t: 'point', num: '3', title: 'Sicht der Gäste begrenzen',
        body: 'Standard ist «eingeschränkt». Die strengste Stufe zeigt Gästen nur ihr eigenes Profil. Vorher Zusammenarbeit testen.',
        mono: 'Guest user access restrictions' },
      { t: 'point', num: '4', title: 'Jeder Gast hat einen Sponsor',
        body: 'Wer einlädt, wird standardmässig Sponsor. Pflegen Sie das Feld, damit klar ist, wer über das Konto entscheidet.',
        mono: 'Sponsors' },
      { t: 'cta', num: '5', title: 'Regelmässig bestätigen',
        body: 'Access Reviews lassen Verantwortliche den Bedarf bestätigen (Lizenz prüfen). Ohne Lizenz: Liste pro Quartal, Entscheid im IT-Meeting.',
        merk: 'Selbstcheck: Wie viele Gäste haben sich seit 90 Tagen nicht angemeldet?', url: true },
    ],
  },
  {
    slug: '2026-10-29-p08-roadmap',
    badge: 'AUS DEM CISO-ALLTAG',
    format: 'carousel',
    slides: [
      { t: 'cover', title: 'Passt Ihre Security-Roadmap auf eine Seite?',
        sub: 'Drei Horizonte, die Geschäftsleitung und IT gleich lesen. Rechtzeitig vor dem Budgetentscheid.' },
      { t: 'split', title: 'Warum eine Seite', cards: [
        { head: 'Entscheidbar', body: 'Die Geschäftsleitung sieht Reihenfolge, Aufwand und Wirkung und kann Ja oder Nein sagen.', tone: 'ok' },
        { head: 'Nicht: die lange Liste', body: 'Massnahmen ohne Reihenfolge verschieben den Entscheid nur.', tone: 'bad' },
      ]},
      { t: 'point', num: '3', title: 'Monate: Stabilisieren',
        body: 'Offene Türen schliessen, ohne grosses Projekt. Zum Beispiel MFA-Lücken, Admin-Konten, ein echter Restore-Test.' },
      { t: 'point', num: '6', title: 'Monate: Aufbauen',
        body: 'Vorhaben mit Projektcharakter. Zum Beispiel Überwachung mit klarer Reaktion, Berechtigungskonzept, Notfallorganisation.' },
      { t: 'point', num: '12', title: 'Monate: Verankern',
        body: 'Was Reife dauerhaft macht. Zum Beispiel Reporting an die Geschäftsleitung, jährliche Übung, Anforderungen an Lieferanten.' },
      { t: 'cta', title: 'Pro Zeile drei Angaben', list: [
        'Welches Risiko sinkt?',
        'Wer ist verantwortlich?',
        'Was kostet es, intern und extern?',
      ], merk: 'Eine Roadmap ist ein Entscheid über Reihenfolge, keine Wunschliste.',
        note: 'Roadmap-Workshop: Link im ersten Kommentar', url: true },
    ],
  },
];

// ONLY=<Teilstring> rendert nur passende Slugs (z. B. ONLY=2026-10-2).
export const VISUALS = process.env.ONLY ? ALL.filter((v) => v.slug.includes(process.env.ONLY)) : ALL;
