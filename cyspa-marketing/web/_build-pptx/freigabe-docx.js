// Freigabeliste vor den Ferien als CYSPA-Word (CI v3: Navy/Gold, Calibri)
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  ShadingType, AlignmentType, Header, Footer, ImageRun, PageNumber, TabStopType, VerticalAlign,
} = require("docx");

const OUT = "/home/user/mein-projekt/cyspa-marketing/00-FREIGABELISTE-VOR-FERIEN.docx";
const LOGO = "/home/user/mein-projekt/cyspa-marketing/web/assets/img/cyspa-logo-transparent.png";

const theme = {
  ink: "1A1A1A", body: "3F3F3F", muted: "8A8A8A", navy: "103157", blue: "425B76",
  gold: "FFC000", gray: "F8F8F8", border: "E6E6E6", white: "FFFFFF",
};
const F = "Calibri";
const CW = 9026;

function runs(text, o = {}) {
  return text.split(/(CYSPA)/g).filter(Boolean).map((p) =>
    new TextRun({ text: p, font: F, size: o.size || 20, color: o.color || theme.body, bold: p === "CYSPA" ? true : o.bold, italics: o.italics }));
}
function P(text, o = {}) {
  return new Paragraph({
    alignment: o.align || AlignmentType.LEFT,
    spacing: { line: 276, before: o.before || 0, after: o.after ?? 120 },
    children: Array.isArray(text) ? text : runs(text, o),
  });
}
function H1(text) {
  return new Paragraph({
    spacing: { before: 360, after: 160, line: 300 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: theme.gold, space: 4 } },
    children: [new TextRun({ text, font: F, size: 26, bold: true, color: theme.navy })],
  });
}
function box(label, text) {
  return new Paragraph({
    spacing: { line: 276, before: 120, after: 160 },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color: theme.gold, space: 8 } },
    shading: { fill: theme.gray, type: ShadingType.CLEAR },
    indent: { left: 200, right: 200 },
    children: [new TextRun({ text: label + " ", font: F, size: 20, bold: true, color: theme.navy }), ...runs(text)],
  });
}
const bd = { style: BorderStyle.SINGLE, size: 4, color: theme.border };
const borders = { top: bd, bottom: bd, left: bd, right: bd };
function cell(children, w, o = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA }, borders, verticalAlign: o.v || VerticalAlign.TOP,
    shading: { fill: o.fill || theme.white, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 110, right: 110 },
    children: children.map((c) => (typeof c === "string" ? P(c, { after: 0, size: o.size, bold: o.bold, color: o.color }) : c)),
  });
}
function table(widths, head, rows) {
  const hr = new TableRow({ tableHeader: true, children: head.map((h, i) => cell([P(h, { after: 0, bold: true, color: theme.white, size: 20 })], widths[i], { fill: theme.navy })) });
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: widths,
    rows: [hr, ...rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(Array.isArray(c) ? c : [c], widths[i], { fill: ri % 2 ? theme.gray : theme.white })) }))],
  });
}
function caption(t) { return P(t, { size: 16, color: theme.muted, italics: true, before: 60, after: 200 }); }
function checks(items) { return items.map((t) => P("☐ " + t, { after: 40, size: 19 })); }
function checkLine(bold, text) {
  return new Paragraph({ spacing: { line: 276, after: 100 }, indent: { left: 360, hanging: 360 },
    children: [new TextRun({ text: "☐\t", font: F, size: 22, color: theme.navy }), new TextRun({ text: bold + " ", font: F, size: 20, bold: true, color: theme.ink }), ...runs(text)] });
}
function small(t) { return P(t, { size: 16, color: theme.muted, after: 0 }); }

const posts = [
  ["07", "Di 29.09., 08:15", "NIS2 trifft Schweizer Firmen", "linkedin/freigabe/2026-09-29-07-…", "visuals-ci3/07-nis2/", "90", ["Fach-OK Regulatorik (inkl. Satz zu Art. 26)", "Legal", "Freigabe"]],
  ["08", "Do 01.10., 08:15", "Security-Budget: Reihenfolge schlägt Höhe", "linkedin/freigabe/2026-10-01-08-…", "bewusst keine Grafik", "88,9 %", ["Fach-OK CISO", "Freigabe", "Vor den Ferien einplanen (erster Ferientag)"]],
  ["09", "Di 06.10., 08:15", "Pentest: Es reicht oft ein Login", "linkedin/freigabe/2026-10-06-09-…", "visuals-ci3/09-pentest/", "92", ["Fach-OK Pentest", "Security-Redline und Freigabe CISO (Pflicht)"]],
  ["10", "Do 08.10., 08:15", "Tabletop: Aus Plan wird Fähigkeit", "linkedin/freigabe/2026-10-08-10-…", "visuals-ci3/10-tabletop/ (PDF)", "89", ["Fach-OK IR und GRC", "Redline", "«halber Tag, davon rund 90 Minuten» bestätigen", "URL /tabletop live oder Kommentar auf /kontakt", "Wer setzt den ersten Kommentar"]],
  ["11", "Di 13.10., 08:15", "Harvest now, decrypt later", "linkedin/freigabe/2026-10-13-11-…", "visuals-ci3/11-harvest/", "90", ["Fach-OK CISO", "Static statt Motion bestätigen"]],
  ["12", "Do 15.10., 08:15", "Was «Partner» für uns bedeutet", "linkedin/freigabe/2026-10-15-12-…", "visuals-ci3/12-partner-planb/", "86 (Plan B)", ["Plan B (ohne Teamfoto) oder Plan A (Teamfoto mit Einwilligungen)"]],
  ["13", "Di 20.10., 08:15", "Passkeys statt Passwort", "linkedin/posts-neu/2026-10-20-…", "visuals-ci3/13-passwordless/", "92", ["Fach-OK", "Themennähe zu #01 akzeptieren"]],
  ["14", "Do 22.10., 08:15", "IT-Vertrag im Ernstfall: 5 Fragen", "linkedin/posts-neu/2026-10-22-…", "visuals-ci3/14-it-vertrag/", "91", ["Fach-OK", "Legal: Hinweis «keine Rechtsberatung» im Kommentar genügt?"]],
  ["15", "Di 27.10., 08:15", "Gastkonten in Entra ID: 5 Prüfpunkte", "linkedin/posts-neu/2026-10-27-…", "visuals-ci3/15-gastkonten/ (PDF)", "92", ["Fach-OK Microsoft Security"]],
  ["16", "Do 29.10., 08:15", "Security-Roadmap auf einer Seite", "linkedin/posts-neu/2026-10-29-…", "visuals-ci3/16-roadmap/ (PDF)", "88", ["Fach-OK CISO", "Ziel-URL für das Erstgespräch"]],
];
const postRows = posts.map(([n, d, t, f, g, s, todo]) => [
  [P("#" + n, { after: 0, bold: true, color: theme.navy }), small(d)],
  [P(t, { after: 20, bold: true, color: theme.ink, size: 19 }), small("Text: " + f), small("Grafik: " + g)],
  [P(s, { after: 0, align: AlignmentType.CENTER })],
  checks(todo),
]);

const children = [
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 360 }, children: [new ImageRun({ type: "png", data: fs.readFileSync(LOGO), transformation: { width: 96, height: 41 }, altText: { title: "CYSPA Logo", description: "CYSPA Cyber Security Partners", name: "logo" } })] }),
  P("MARKETING · FREIGABE", { size: 18, bold: true, color: theme.blue, after: 80 }),
  new Paragraph({ spacing: { after: 60, line: 300 }, children: [new TextRun({ text: "Freigabeliste vor den Ferien", font: F, size: 48, bold: true, color: theme.navy })] }),
  new Paragraph({ spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: theme.gold, space: 6 } }, children: [new TextRun({ text: "Frist Mittwoch, 30.09.2026 · LinkedIn, CI, Webseite, Kalender, Vertretung", font: F, size: 22, color: theme.body })] }),
  P([new TextRun({ text: "Stand 28.09.2026 · Nigel-Aufgabe NGL-20260927-29b621 · ", font: F, size: 18, color: theme.muted }), ...runs("CYSPA GmbH", { size: 18, color: theme.muted })], { after: 240 }),
  P("Alles ist vorbereitet und unabhängig geprüft. Die Liste folgt der Reihenfolge der Publikation. Hake ab, was erledigt ist."),
  box("Wichtig:", "Das fachliche OK (Gate 1) kann die KI nicht ersetzen, das verlangt der eigene Redaktionsprozess (§4.5). Jeder Post braucht deshalb ein OK einer fachlich zuständigen Person, bevor er eingeplant wird."),

  H1("1. LinkedIn-Posts"),
  table([1500, 3150, 900, 3476], ["Post", "Thema und Dateien", "Prüfung", "Was du tun musst"], postRows),
  caption("Tabelle 1: Posts 29.09. bis 29.10.2026. Pfade relativ zu cyspa-marketing/ im Branch claude/cool-fermi-irqllf."),
  P("Für alle Posts zusätzlich: ☐ Legal  ☐ Accessibility  ☐ Freigabe."),
  P("Die Posts #13 und #14 liegen in KW 43, die laut Plan eine Review-Woche ist. Du hast sie am 27.09. beauftragt, der Review von Batch 1 findet trotzdem statt."),
  box("Einplanen oder freigeben:", "Ob LinkedIn Dokument-Posts (PDF) und erste Kommentare vorplanen lässt, ist nicht geprüft. Falls nicht, braucht es eine Person, die #10, #15 und #16 am Termin manuell veröffentlicht."),

  H1("2. Entscheide zum CI"),
  checkLine("Logo:", "Für dunklen Grund fehlt eine helle Variante der Bildmarke (dort steht jetzt die Wortmarke «CYSPA.ch»). Datei liefern oder die abgeleitete Variante freigeben. Offen ist auch der Widerspruch zum dreifarbigen Unterstrich."),
  checkLine("Gold als Textfarbe:", "Zweite Headline-Zeile auf den Fakten-Karten so lassen oder auf Weiss setzen."),
  checkLine("Eyebrow «SECURITY4KMU»:", "Auf allen Posts, auch bei Pentest und NIS2: ja oder nein. Nummerierung «Tipp der Woche #NN» nach #19: ja oder nein."),
  checkLine("Carousels:", "6 statt 4 Slides ok?"),
  checkLine("Flyer:", "Serifen-Headlines wie im CISO-Flyer ok?"),

  H1("3. Webseite und Flyer"),
  checkLine("Webseiten-Owner", "benennen."),
  checkLine("Sicherheits-Check:", "Entscheid E2 bestätigen und den Check ausführen lassen (web/sicherheits-check/README.md). Er ist passiv, prüft nur öffentliche Seiten und dauert wenige Sekunden. Dazu die WordPress-Version gegen CVE-2026-87902 prüfen."),
  checkLine("Webseitentexte:", "Startseite, Leistungen und Über uns freigeben (web/webseite-texte.md). Offen ist das Leistungsportfolio 2.3 (Security-Baseline), 2.5 (Nachtest) und 2.7 (AI Security)."),
  checkLine("Landingpage Tabletop:", "Bis spätestens 07.10. einpflegen lassen (web/landingpage-tabletop.html). Offen: Formular-Endpunkt, Datenschutz, Impressum. Preis, Ort, Gruppengrösse, Lieferfrist und Vertraulichkeit sind seit 28.09. bestätigt."),
  checkLine("Flyer Tabletop:", "Nicht vor den Ferien drucken. Vorher Preflight bei der Druckerei, Logo freigeben, CMYK klären. Druckdatei web/flyer-tabletop.pdf, bearbeitbar web/flyer-tabletop.pptx."),

  H1("4. Kalender"),
  checkLine("Serientermine freigeben:", "Check-in Mo 08:00, One-to-One Di 08:00, Check-out Mi 16:00 im Google-Kalender (Nigel-Aufgabe NGL-20260928-bfc3ce, wartet auf deine Freigabe)."),

  H1("5. Vertretung während der Ferien"),
  table([4513, 4513], ["Aufgabe", "Person"], [
    ["Veröffentlichen oder Vorplanung prüfen", ""],
    ["60 Minuten nach jedem Post betreuen (Kommentare, Fragen)", ""],
    ["Posting-Stopp auslösen (Redaktionsprozess §4.2, z. B. bei einem Grossvorfall)", ""],
    ["Anfragen aus #10 und #16 beantworten", ""],
  ]),
  caption("Tabelle 2: Vertretung. Bitte Namen eintragen."),

  H1("6. Bekannte Nebenbefunde"),
  P("Die bisherigen Repo-Grafiken #01 bis #06 haben unten einen weissen Balken von 87 px (Renderfehler). Falls sie so publiziert wurden, lohnt sich ein Blick."),
  P("cyspa.ch ist aus der Cloud-Umgebung gesperrt. Für direkte Prüfungen die Domain unter Environment, Edit, Network access freigeben."),
];

const doc = new Document({
  creator: "CYSPA GmbH", title: "Freigabeliste vor den Ferien", description: "CYSPA Marketing, Frist 30.09.2026",
  styles: { default: { document: { run: { font: F, size: 20, color: theme.body } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, right: 1440, bottom: 1134, left: 1440, header: 567, footer: 567 } } },
    headers: { default: new Header({ children: [new Paragraph({ children: [] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      tabStops: [{ type: TabStopType.CENTER, position: 4513 }, { type: TabStopType.RIGHT, position: 9026 }],
      children: [
        new TextRun({ text: "© ", font: F, size: 16, color: theme.muted }), new TextRun({ text: "CYSPA", font: F, size: 16, bold: true, color: theme.muted }),
        new TextRun({ text: " GmbH 2026\t", font: F, size: 16, color: theme.muted }),
        new TextRun({ children: [PageNumber.CURRENT], font: F, size: 16, color: theme.muted }),
        new TextRun({ text: "\twww.cyspa.ch", font: F, size: 16, color: theme.muted }),
      ] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(OUT, b); console.log("written", OUT); });
