const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { parse } = require('json2csv');
const app = express();

app.use(express.static('public'));

app.get('/results', (req, res) => {
    let files = fs.readdirSync('results').filter(file => file.endsWith('_validation.json'));
    let results = files.map(file => JSON.parse(fs.readFileSync(`results/${file}`)));
    res.json(results);
});

app.get('/export/pdf', (req, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=validation_results.pdf');
    doc.pipe(res);

    doc.fontSize(16).text("Résultats de validation W3C", { align: "center" });
    doc.moveDown();

    const files = fs.readdirSync('results').filter(file => file.endsWith('_validation.json'));
    files.forEach(file => {
        const data = JSON.parse(fs.readFileSync(`results/${file}`));
        doc.fontSize(12).text(`Page : ${data.page}`);
        doc.fontSize(10).text(`Erreurs HTML : ${data.html.messages.length}`);
        doc.fontSize(10).text(`Erreurs CSS : ${data.css.messages.length}`);
        doc.moveDown();
    });

    doc.end();
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
