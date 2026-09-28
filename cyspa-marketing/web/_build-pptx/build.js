// CYSPA Flyer "Tabletop-Übung" als bearbeitbare PPTX (A4 hoch, 2 Seiten), CI v3.0
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const Lu = require("react-icons/lu");

const WEB = "/home/user/mein-projekt/cyspa-marketing/web";
const OUT = path.join(WEB, "flyer-tabletop.pptx");

// CI v3 Tokens (ohne #)
const C = {
  gold: "FFC000", navy: "103157", deep: "071828", blue: "425B76",
  ink: "1A1A1A", body: "5A5A5A", muted: "8A8A8A", border: "E6E6E6", gray: "F8F8F8",
  white: "FFFFFF", panel: "143762", panelLine: "2B4C78", soft: "C9D3E0", tile: "0F2B4D",
};
const SERIF = "Cambria";
const SANS = "Calibri";
const W = 8.27, H = 11.69;

async function icon(Comp, color, px = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: "#" + color, size: px, strokeWidth: 1.8 })
  );
  const buf = await sharp(Buffer.from(svg)).resize(px, px).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// Hintergrund: Navy-Deep-Verlauf mit feinem Raster rechts (deckend, keine Transparenz)
async function heroBg(wIn, hIn, gridFromFrac = 0.55) {
  const w = Math.round(wIn * 200), h = Math.round(hIn * 200);
  const step = 40;
  let lines = "";
  const x0 = Math.round(w * gridFromFrac);
  for (let x = x0; x <= w; x += step) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#1b3a63" stroke-width="1.2"/>`;
  for (let y = 0; y <= h; y += step) lines += `<line x1="${x0}" y1="${y}" x2="${w}" y2="${y}" stroke="#1b3a63" stroke-width="1.2"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0.35">
      <stop offset="0" stop-color="#071828"/><stop offset="0.5" stop-color="#0a1f38"/><stop offset="1" stop-color="#12345c"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>${lines}</svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function T(slide, text, o) {
  slide.addText(text, { isTextBox: true, margin: 0, valign: "top", fontFace: SANS, ...o });
}
function eyebrow(slide, x, y, label, color = C.white) {
  slide.addShape("rect", { x, y: y + 0.06, w: 0.38, h: 0.03, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  T(slide, label, { x: x + 0.55, y, w: 4, h: 0.18, fontFace: SERIF, fontSize: 9, bold: true, color, charSpacing: 6 });
}
function sectionLabel(slide, x, y, label) {
  T(slide, label, { x, y, w: 6.5, h: 0.2, fontFace: SERIF, fontSize: 9, bold: true, color: C.blue, charSpacing: 6 });
}
function placeholder(slide, text, x, y, w, h = 0.2, dark = false) {
  slide.addText(text, {
    isTextBox: true, x, y, w, h, margin: [1, 3, 1, 3], fontFace: SANS, fontSize: 8, bold: true,
    color: dark ? C.white : C.navy, valign: "middle",
    line: { color: dark ? C.soft : C.navy, width: 0.75, dashType: "dash" },
  });
}
function card(slide, x, y, w, h) {
  slide.addShape("rect", {
    x, y, w, h, fill: { color: C.white }, line: { color: C.border, width: 0.75 },
    shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 2, angle: 90 },
  });
}

(async () => {
  const pres = new pptxgen();
  pres.defineLayout({ name: "A4P", width: W, height: H });
  pres.layout = "A4P";
  pres.title = "CYSPA Flyer Tabletop-Übung";
  pres.company = "CYSPA GmbH";

  const I = {
    key: await icon(Lu.LuKeyRound, C.gold), msg: await icon(Lu.LuMessageSquare, C.white),
    clock: await icon(Lu.LuClock, C.white), phone: await icon(Lu.LuPhone, C.white),
    clip: await icon(Lu.LuClipboardCheck, C.white), keyW: await icon(Lu.LuKeyRound, C.white),
    shield: await icon(Lu.LuShieldCheck, C.white),
    msgN: await icon(Lu.LuMessageSquare, C.white), branch: await icon(Lu.LuGitBranch, C.navy),
    search: await icon(Lu.LuSearch, C.navy), file: await icon(Lu.LuFileText, C.navy),
    check: await icon(Lu.LuCheck, C.gold), pin: await icon(Lu.LuMapPin, C.gold),
    globe: await icon(Lu.LuGlobe, C.gold), mail: await icon(Lu.LuMail, C.gold), tel: await icon(Lu.LuPhone, C.gold),
    clockN: await icon(Lu.LuClock, C.navy), users: await icon(Lu.LuUsers, C.white), fileN: await icon(Lu.LuFileText, C.navy),
    qr: await icon(Lu.LuQrCode, C.soft),
  };
  const logoLight = path.join(WEB, "assets/img/cyspa-logo-hell.png");

  // ================= SEITE 1 =================
  const s1 = pres.addSlide();
  s1.background = { color: C.white };
  s1.addImage({ altText: "Hintergrund Navy mit feinem Raster", data: await heroBg(W, 4.1, 0.58), x: 0, y: 0, w: W, h: 4.1 });
  s1.addShape("rect", { x: 0, y: 0, w: 0.2, h: 4.1, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });

  eyebrow(s1, 0.75, 0.6, "TABLETOP-ÜBUNG");
  s1.addText([
    { text: "Ein Plan ist eine Hypothese.", options: { breakLine: true } },
    { text: "Die Übung ist ihr " },
    { text: "Test.", options: { color: C.gold } },
  ], { isTextBox: true, x: 0.75, y: 0.9, w: 4.25, h: 1.2, margin: 0, fontFace: SERIF, fontSize: 24, bold: true, color: C.white, valign: "top", lineSpacingMultiple: 0.92 });
  s1.addShape("rect", { x: 0.75, y: 1.92, w: 0.65, h: 0.035, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  T(s1, "Wer entscheidet, wenn es ernst wird? Die Tabletop-Übung für Ihre Geschäftsleitung.",
    { x: 0.75, y: 2.1, w: 4.1, h: 0.45, fontFace: SERIF, fontSize: 12, bold: true, color: C.white });
  T(s1, "Samstag, 06:40 Uhr. Die Dateiserver sind verschlüsselt, die Produktion steht. Eine Tabletop-Übung zeigt Ihrer Führungsrunde, ob die Antwort auf diese Frage feststeht, bevor der Ernstfall sie stellt.",
    { x: 0.75, y: 2.64, w: 4.1, h: 0.75, fontSize: 9.5, color: C.soft, lineSpacingMultiple: 1.1 });

  // Panel rechts
  const px = 5.1, py = 0.45, pw = 2.45, ph = 3.1;
  s1.addShape("roundRect", { x: px, y: py, w: pw, h: ph, rectRadius: 0.06, fill: { color: C.panel }, line: { color: C.panelLine, width: 1 } });
  s1.addImage({ altText: "CYSPA Cyber Security Partners Logo", path: logoLight, x: px + pw / 2 - 0.5, y: py + 0.18, w: 1.0, h: 0.42 });
  T(s1, "WER ENTSCHEIDET JETZT WAS?", { x: px + 0.1, y: py + 0.72, w: pw - 0.2, h: 0.3, fontSize: 9, bold: true, color: C.white, align: "center", charSpacing: 1.5 });
  T(s1, "SAMSTAG, 06:40 UHR", { x: px + 0.15, y: py + 1.04, w: pw - 0.3, h: 0.18, fontSize: 8, color: C.soft, align: "center", charSpacing: 3 });
  const tiles = [["BEFUGNISSE", I.key, true], ["KOMMUNIKATION", I.msg], ["MELDEFRISTEN", I.clock], ["DIENSTLEISTER", I.phone]];
  const tw = 1.02, th = 0.7;
  tiles.forEach(([lab, ic, hot], i) => {
    const tx = px + 0.17 + (i % 2) * (tw + 0.07), ty = py + 1.36 + Math.floor(i / 2) * (th + 0.07);
    s1.addShape("rect", { x: tx, y: ty, w: tw, h: th, fill: { color: C.tile }, line: { color: hot ? C.gold : C.panelLine, width: hot ? 1.25 : 0.75 } });
    s1.addImage({ altText: "Symbol", data: ic, x: tx + tw / 2 - 0.16, y: ty + 0.08, w: 0.3, h: 0.3 });
    T(s1, lab, { x: tx, y: ty + 0.46, w: tw, h: 0.16, fontSize: 6.5, bold: true, color: C.white, align: "center", charSpacing: 1 });
  });
  T(s1, "GETESTET WIRD DIE ORGANISATION", { x: px + 0.05, y: py + 2.86, w: pw - 0.1, h: 0.16, fontSize: 6.5, bold: true, color: C.soft, align: "center", charSpacing: 1 });

  // Nutzenkarten
  const cards1 = [
    [I.clip, "Erkenntnisliste mit Verantwortlichen", "Jede Lücke hat einen Namen und einen nächsten Schritt."],
    [I.keyW, "Geklärte Befugnisse", "Wer entscheidet was, auch am Wochenende und ohne die üblichen Kanäle."],
    [I.shield, "Ein getesteter Plan", "Aus einer Annahme wird eine geübte Fähigkeit. Oder Sie wissen genau, was im Plan fehlt."],
  ];
  const cw = 2.17, cy = 3.75, ch = 1.48;
  cards1.forEach(([ic, title, body], i) => {
    const cx = 0.75 + i * (cw + 0.15);
    card(s1, cx, cy, cw, ch);
    s1.addShape("rect", { x: cx + 0.2, y: cy, w: 0.5, h: 0.04, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
    s1.addShape("ellipse", { x: cx + 0.17, y: cy + 0.25, w: 0.46, h: 0.46, fill: { color: C.navy }, line: { color: C.navy, width: 0 } });
    s1.addImage({ altText: "Symbol", data: ic, x: cx + 0.28, y: cy + 0.36, w: 0.24, h: 0.24 });
    T(s1, title, { x: cx + 0.72, y: cy + 0.22, w: cw - 0.8, h: 0.52, fontFace: SERIF, fontSize: 10, bold: true, color: C.navy, valign: "middle" });
    T(s1, body, { x: cx + 0.17, y: cy + 0.85, w: cw - 0.34, h: 0.55, fontSize: 9, color: C.body, lineSpacingMultiple: 1.1 });
  });

  // Ablauf
  s1.addShape("rect", { x: 0, y: 5.45, w: W, h: 2.85, fill: { color: C.gray }, line: { color: C.gray, width: 0 } });
  sectionLabel(s1, 0.75, 5.7, "ABLAUF DER ÜBUNG");
  const steps = [
    [I.msgN, "1. Vorgespräch", "Wir klären Teilnehmende, Rahmen und Schwerpunkt des Szenarios.", true],
    [I.branch, "2. Szenario", "Ein realistisches, fiktives Szenario entwickelt sich Schritt für Schritt. Ihre Führungsrunde entscheidet, wir moderieren."],
    [I.search, "3. Auswertung", "Was lief gut, wo fehlten Befugnisse, Informationen oder Kontakte?"],
    [I.file, "4. Erkenntnisliste", "Dokumentierte Erkenntnisse mit klaren Verantwortlichkeiten."],
  ];
  const colW = 1.7, sx0 = 0.75, cyc = 6.35;
  s1.addShape("line", { x: sx0 + colW / 2, y: cyc, w: colW * 3, h: 0, line: { color: "B7C3D1", width: 1 } });
  steps.forEach(([ic, title, body, filled], i) => {
    const cx = sx0 + i * colW + colW / 2;
    s1.addShape("ellipse", { x: cx - 0.3, y: cyc - 0.3, w: 0.6, h: 0.6, fill: { color: filled ? C.navy : C.white }, line: { color: C.navy, width: 1.5 } });
    s1.addImage({ altText: "Symbol", data: ic, x: cx - 0.14, y: cyc - 0.14, w: 0.28, h: 0.28 });
    T(s1, title, { x: cx - colW / 2 + 0.05, y: cyc + 0.42, w: colW - 0.1, h: 0.22, fontFace: SERIF, fontSize: 10.5, bold: true, color: C.navy, align: "center" });
    T(s1, body, { x: cx - colW / 2 + 0.06, y: cyc + 0.66, w: colW - 0.12, h: 0.85, fontSize: 8.5, color: C.body, align: "center", lineSpacingMultiple: 1.05 });
  });
  s1.addText([
    { text: "Eine moderierte Entscheidungsübung, keine Technik-Simulation. ", options: { bold: true, color: C.navy } },
    { text: "An Ihren Systemen wird nichts getestet oder verändert.", options: { color: C.body } },
  ], { isTextBox: true, x: 0.75, y: 7.95, w: 6.77, h: 0.22, margin: 0, fontFace: SANS, fontSize: 9, align: "center" });

  // Vertrauensblock
  s1.addShape("rect", { x: 0, y: 8.3, w: W, h: 2.35, fill: { color: C.deep }, line: { color: C.deep, width: 0 } });
  s1.addShape("rect", { x: 0, y: 8.3, w: 0.2, h: 2.35, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  T(s1, "Worauf Sie sich verlassen können", { x: 0.75, y: 8.6, w: 4.6, h: 0.32, fontFace: SERIF, fontSize: 15, bold: true, color: C.gold });
  const trust = [
    "Getestet wird die Organisation, nicht die Firewall",
    "Realistisches, fiktives Szenario, zum Beispiel ein Ransomware-Angriff",
    "Vertraulich: Eine Vertraulichkeitsvereinbarung ist bei jeder Übung Standard",
    "Nachvollziehbar dokumentiert: eine Grundlage für Verwaltungsrat und Versicherer",
  ];
  trust.forEach((t, i) => {
    const y = 9.05 + i * 0.37;
    s1.addImage({ altText: "Symbol", data: I.check, x: 0.75, y: y + 0.02, w: 0.16, h: 0.16 });
    T(s1, t, { x: 1.05, y, w: 4.4, h: 0.34, fontSize: 9.5, color: C.white });
  });
  s1.addText([
    { text: "½", options: { fontSize: 36 } }, { text: " Tag", options: { fontSize: 20 } },
  ], { isTextBox: true, x: 5.55, y: 8.62, w: 2.2, h: 0.6, margin: 0, fontFace: SERIF, bold: true, color: C.white, valign: "bottom" });
  T(s1, "mit Ihrer Führungsrunde, davon rund 90 Minuten Übung im Szenario. Am Ende steht eine dokumentierte Erkenntnisliste.",
    { x: 5.55, y: 9.35, w: 2.1, h: 0.9, fontSize: 9, color: C.soft, lineSpacingMultiple: 1.1 });

  // Kontaktleiste
  s1.addShape("rect", { x: 0, y: 10.65, w: W, h: 0.035, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  s1.addShape("rect", { x: 0, y: 10.685, w: W, h: H - 10.685, fill: { color: C.deep }, line: { color: C.deep, width: 0 } });
  [[I.pin, "Erlenstrasse 4B, CH-6343 Rotkreuz", 0.75, 3.0], [I.globe, "www.cyspa.ch", 4.1, 1.5], [I.mail, "info@cyspa.ch", 6.05, 1.6]].forEach(([ic, t, x, w]) => {
    s1.addImage({ altText: "Symbol", data: ic, x, y: 11.08, w: 0.18, h: 0.18 });
    T(s1, t, { x: x + 0.28, y: 11.06, w, h: 0.22, fontFace: SERIF, fontSize: 10, bold: true, color: C.white, valign: "middle" });
  });
  s1.addNotes("Flyer Seite 1. Quelle: cyspa-marketing/web/flyer-tabletop.md. Offene Punkte: Ablauf und «½ Tag, rund 90 Minuten» durch IR-Owner bestätigen; helle Logovariante freigeben; Vektorlogo.");

  // ================= SEITE 2 =================
  const s2 = pres.addSlide();
  s2.background = { color: C.white };
  s2.addText([{ text: "CYSPA", options: { color: C.navy } }, { text: ".ch", options: { color: C.gold } }],
    { isTextBox: true, x: 0.75, y: 0.32, w: 3, h: 0.45, margin: 0, fontFace: SERIF, fontSize: 24, bold: true, charSpacing: 8, valign: "middle" });
  T(s2, "CYBER SECURITY PARTNERS", { x: 3.6, y: 0.45, w: 3.92, h: 0.2, fontFace: SERIF, fontSize: 8, bold: true, color: C.blue, align: "right", charSpacing: 4 });

  s2.addImage({ altText: "Hintergrund Navy mit feinem Raster", data: await heroBg(W, 2.55, 0.62), x: 0, y: 0.95, w: W, h: 2.55 });
  s2.addShape("rect", { x: 0, y: 0.95, w: 0.2, h: 2.55, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  eyebrow(s2, 0.75, 1.25, "DAS FORMAT");
  s2.addText([
    { text: "Ein halber Tag.", options: { breakLine: true } },
    { text: "Eine dokumentierte", options: { breakLine: true } },
    { text: "Erkenntnisliste.", options: { color: C.gold } },
  ], { isTextBox: true, x: 0.75, y: 1.5, w: 4.3, h: 0.95, margin: 0, fontFace: SERIF, fontSize: 20, bold: true, color: C.white, valign: "top", lineSpacingMultiple: 0.95 });
  T(s2, "Die wertvollsten Erkenntnisse aus Übungen sind fast immer organisatorisch, nicht technisch. Deshalb sitzen die Personen am Tisch, die im Ernstfall entscheiden. Einen fertigen Notfallplan brauchen Sie nicht: Gibt es keinen, zeigt die Übung, welche Entscheide ein Plan regeln muss.",
    { x: 0.75, y: 2.62, w: 4.3, h: 0.8, fontSize: 9, color: C.soft, lineSpacingMultiple: 1.08 });
  s2.addShape("roundRect", { x: 5.25, y: 1.33, w: 2.3, h: 1.65, rectRadius: 0.05, fill: { color: C.panel }, line: { color: C.panelLine, width: 1 } });
  ["Moderierte Entscheidungsübung", "Keine Technik-Simulation", "Realistisches, fiktives Szenario", "Klare Verantwortlichkeiten"].forEach((t, i) => {
    const y = [1.5, 1.94, 2.24, 2.68][i];
    s2.addImage({ altText: "Symbol", data: I.check, x: 5.43, y: y + 0.03, w: 0.15, h: 0.15 });
    T(s2, t, { x: 5.68, y, w: 1.8, h: 0.33, fontFace: SERIF, fontSize: 9.5, bold: true, color: C.white });
  });

  // Formatkarten
  const fc = [
    [I.clockN, "DAUER", "Ein halber Tag", "Davon rund 90 Minuten Übung im Szenario.", null, false],
    [I.users, "TEILNEHMENDE", "Ihre Führungsrunde", "Geschäftsleitung, dazu je nach Organisation IT-Verantwortliche und Kommunikation. Bis 10 Personen.", null, true],
    [I.fileN, "ERGEBNIS", "Dokumentierte Erkenntnisliste", "Mit klaren Verantwortlichkeiten, innert 5 Arbeitstagen nach der Übung.", null, false],
  ];
  const fw = 2.17, fy = 3.65, fh = 1.78;
  fc.forEach(([ic, lab, title, body, ph, hi], i) => {
    const fx = 0.75 + i * (fw + 0.15);
    card(s2, fx, fy, fw, fh);
    s2.addShape("rect", { x: fx, y: fy, w: fw, h: 0.4, fill: { color: hi ? C.blue : C.gray }, line: { color: hi ? C.blue : C.border, width: 0.75 } });
    s2.addImage({ altText: "Symbol", data: ic, x: fx + 0.18, y: fy + 0.1, w: 0.2, h: 0.2 });
    T(s2, lab, { x: fx + 0.48, y: fy + 0.1, w: fw - 0.6, h: 0.2, fontFace: SERIF, fontSize: 9.5, bold: true, color: hi ? C.white : C.navy, charSpacing: 2, valign: "middle" });
    T(s2, title, { x: fx + 0.18, y: fy + 0.55, w: fw - 0.36, h: 0.42, fontFace: SERIF, fontSize: 11, bold: true, color: C.navy });
    T(s2, body, { x: fx + 0.18, y: fy + 0.95, w: fw - 0.36, h: 0.5, fontSize: 8.5, color: C.body, lineSpacingMultiple: 1.05 });
    if (ph) placeholder(s2, ph, fx + 0.18, fy + 1.5, fw - 0.5);
  });

  // Was typischerweise sichtbar wird
  sectionLabel(s2, 0.75, 5.58, "WAS TYPISCHERWEISE SICHTBAR WIRD");
  const vis = [
    ["Unklare Befugnisse", "Wer darf Systeme vom Netz nehmen, auch wenn damit das Geschäft steht?", true],
    ["Kommunikation ohne die üblichen Kanäle", "Wie erreichen Sie Mitarbeitende und Kunden, wenn E-Mail und Chat betroffen sind?"],
    ["Meldefristen unter Zeitdruck", "Datenschutzbehörde, Vertragspartner, allenfalls Aufsicht oder das Bundesamt für Cybersicherheit (BACS): Wer meldet was bis wann?"],
    ["Die Dienstleisterfrage", "Wer ist der erste Anruf? Gilt der Support-Vertrag auch am Wochenende?"],
  ];
  const vw = 1.62, vy = 5.83, vh = 1.42;
  vis.forEach(([t, b, hot], i) => {
    const vx = 0.75 + i * (vw + 0.1);
    s2.addShape("rect", { x: vx, y: vy, w: vw, h: vh, fill: { color: C.gray }, line: { color: C.gray, width: 0 } });
    s2.addShape("rect", { x: vx, y: vy, w: 0.045, h: vh, fill: { color: hot ? C.gold : C.navy }, line: { color: hot ? C.gold : C.navy, width: 0 } });
    T(s2, t, { x: vx + 0.17, y: vy + 0.14, w: vw - 0.28, h: 0.5, fontFace: SERIF, fontSize: 9.5, bold: true, color: C.navy });
    T(s2, b, { x: vx + 0.17, y: vy + 0.6, w: vw - 0.28, h: 0.8, fontSize: 8, color: C.body, lineSpacingMultiple: 1.05 });
  });

  // FAQ
  sectionLabel(s2, 0.75, 7.4, "HÄUFIGE FRAGEN");
  const faq = [
    ["Ist das ein technischer Test unserer IT?", "Nein. Es wird nichts an Ihren Systemen getestet oder verändert. Die Übung prüft Entscheidungswege, Zuständigkeiten und Kommunikation.", null],
    ["Welches Szenario wird geübt?", "Ein realistisches, fiktives Szenario, zum Beispiel ein Ransomware-Angriff. Das Szenario wird im Vorgespräch auf Ihre Organisation zugeschnitten.", null],
    ["Beraten Sie uns rechtlich zu Meldepflichten?", "Nein. Wir ordnen Meldepflichten im Szenario allgemein ein. Für Ihren Einzelfall ziehen Sie Ihre Rechtsberatung bei.", null],
    ["Wo findet die Übung statt?", "Bei Ihnen vor Ort.", null],
    ["Wie vertraulich ist das?", "Was in der Übung besprochen wird, bleibt vertraulich. Eine Vertraulichkeitsvereinbarung ist bei jeder Übung Standard.", null],
    ["Was kostet die Übung?", "Nach dem Vorgespräch erhalten Sie eine Offerte.", null],
  ];
  faq.forEach(([q, a, ph], i) => {
    const col = Math.floor(i / 3), row = i % 3;
    const x = 0.75 + col * 3.5, y = 7.66 + row * 0.77;
    s2.addShape("ellipse", { x, y: y + 0.07, w: 0.06, h: 0.06, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
    T(s2, q, { x: x + 0.15, y, w: 3.25, h: 0.2, fontFace: SERIF, fontSize: 9, bold: true, color: C.navy });
    let ay = y + 0.22;
    const lines = a ? Math.ceil(a.length / 66) : 0;
    if (a) { T(s2, a, { x: x + 0.15, y: ay, w: 3.2, h: lines * 0.145, fontSize: 8, color: C.body, lineSpacingMultiple: 1.0 }); }
    if (ph) placeholder(s2, ph, x + 0.15, ay + lines * 0.145 + (a ? 0.03 : 0), Math.min(3.15, 0.25 + ph.length * 0.052), 0.18);
  });

  // CTA
  s2.addShape("rect", { x: 0, y: 9.9, w: W, h: H - 9.9, fill: { color: C.deep }, line: { color: C.deep, width: 0 } });
  s2.addShape("rect", { x: 0, y: 9.9, w: 0.2, h: H - 9.9, fill: { color: C.gold }, line: { color: C.gold, width: 0 } });
  eyebrow(s2, 0.75, 10.08, "NÄCHSTER SCHRITT");
  s2.addText([{ text: "Gespräch " }, { text: "vereinbaren.", options: { color: C.gold } }],
    { isTextBox: true, x: 0.75, y: 10.3, w: 4.6, h: 0.36, margin: 0, fontFace: SERIF, fontSize: 20, bold: true, color: C.white });
  T(s2, "In einem kurzen Gespräch klären wir, ob eine Tabletop-Übung für Sie jetzt der richtige Schritt ist und wie sie bei Ihnen aussehen würde. Unverbindlich.",
    { x: 0.75, y: 10.7, w: 4.7, h: 0.34, fontSize: 8.5, color: C.soft });
  [[I.globe, "www.cyspa.ch/tabletop", 0.75, 11.12], [I.mail, "info@cyspa.ch", 2.75, 11.12], [I.tel, "+41 41 521 61 61", 0.75, 11.36], [I.pin, "Erlenstrasse 4B, CH-6343 Rotkreuz", 2.75, 11.36]].forEach(([ic, t, x, y]) => {
    s2.addImage({ altText: "Symbol", data: ic, x, y: y + 0.01, w: 0.15, h: 0.15 });
    T(s2, t, { x: x + 0.23, y, w: 2.6, h: 0.18, fontFace: SERIF, fontSize: 9, bold: true, color: C.white, valign: "middle" });
  });
  s2.addShape("rect", { x: 5.6, y: 10.12, w: 1.95, h: 1.3, fill: { color: C.deep }, line: { color: C.soft, width: 0.75, dashType: "dash" } });
  s2.addImage({ altText: "Symbol", data: I.qr, x: 6.37, y: 10.28, w: 0.4, h: 0.4 });
  T(s2, "[PLATZHALTER: QR-Code auf /tabletop, erst nach Livegang]", { x: 5.7, y: 10.78, w: 1.75, h: 0.5, fontSize: 8, bold: true, color: C.white, align: "center" });
  s2.addNotes("Flyer Seite 2. Platzhalter vor dem Druck füllen (siehe flyer-tabletop.md). Schriften: Cambria (Headlines, Serif wie CISO-Flyer) und Calibri (Text), CI v3 für PPTX.");

  await pres.writeFile({ fileName: OUT });
  console.log("written", OUT);
})();
