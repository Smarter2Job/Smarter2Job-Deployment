import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(__dirname, '../public/downloads/CV_Basics_Checkliste.pdf');
const outputPath = pdfPath;

async function addFooterToPDF() {
  try {
    // Read the existing PDF
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Footer text
    const footerText = [
      '© 2026 Smarter2Job.com – Alle Rechte vorbehalten',
      '',
      'Dieses Dokument wird Bewerbern kostenlos zur Verfügung gestellt.',
      'Das Kopieren, Weiterleiten oder Vervielfältigen dieser Unterlagen ist ohne',
      'ausdrückliche Zustimmung von Smarter2Job.com nicht gestattet.',
      '',
      'Weitere Informationen: smarter2job.com'
    ];

    const pages = pdfDoc.getPages();
    const fontSize = 8;
    const lineHeight = 10;
    const marginBottom = 20;
    const marginLeft = 40;
    const marginRight = 40;

    // Add footer to each page
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      let yPosition = marginBottom;

      // Draw a line above the footer
      page.drawLine({
        start: { x: marginLeft, y: yPosition + 5 },
        end: { x: width - marginRight, y: yPosition + 5 },
        thickness: 0.5,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Draw footer text
      footerText.forEach((line, index) => {
        if (line === '© 2026 Smarter2Job.com – Alle Rechte vorbehalten') {
          // First line in bold
          page.drawText(line, {
            x: marginLeft,
            y: yPosition,
            size: fontSize,
            font: helveticaBoldFont,
            color: rgb(0, 0, 0),
          });
        } else {
          // Other lines in regular
          page.drawText(line, {
            x: marginLeft,
            y: yPosition,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0.2, 0.2, 0.2),
          });
        }
        yPosition -= lineHeight;
      });
    });

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    console.log('✅ Footer erfolgreich zur PDF hinzugefügt!');
    console.log(`📄 Datei: ${outputPath}`);
  } catch (error) {
    console.error('❌ Fehler beim Hinzufügen des Footers:', error);
    process.exit(1);
  }
}

addFooterToPDF();
