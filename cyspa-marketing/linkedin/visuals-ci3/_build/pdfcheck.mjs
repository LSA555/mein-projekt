import { PDFDocument, PDFName, PDFDict } from 'pdf-lib';
import { readFileSync } from 'fs';
for (const f of process.argv.slice(2)) {
  const d = await PDFDocument.load(readFileSync(f));
  const sizes = d.getPages().map(p => p.getSize()).map(s => `${s.width}x${s.height}`);
  const fonts = new Set(); let embedded = 0, total = 0;
  for (const [ref, obj] of d.context.enumerateIndirectObjects()) {
    if (obj instanceof PDFDict && obj.get(PDFName.of('Type'))?.toString() === '/FontDescriptor') {
      total++; fonts.add(obj.get(PDFName.of('FontName')).toString());
      if (obj.get(PDFName.of('FontFile2')) || obj.get(PDFName.of('FontFile3')) || obj.get(PDFName.of('FontFile'))) embedded++;
    }
  }
  console.log(f.split('/').slice(-1)[0], d.getPageCount(), [...new Set(sizes)].join(','), `fonts ${embedded}/${total} embedded`, [...fonts].join(' '));
}
