const fs = require('fs');
const PDFDocument = require('pdfkit');
const { parse } = require('json2csv');

const exportPDF = (results, res) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=validation_results.pdf');
    doc.pipe(res);

    doc.fontSize(16).text("Résultats de validation W3C", { align: "center" });
    doc.moveDown();

    results.forEach(data => {
        doc.fontSize(12).text(`Page : ${data.page}`);
        doc.fontSize(10).text(`Erreurs HTML : ${data.html.errors.length}`);
        doc.fontSize(10).text(`Erreurs CSS : ${data.css.errors.length}`);
        doc.moveDown();
    });

    doc.end();
};

const exportCSV = (results, res) => {
    const csv = parse(results.map(data => ({
        page: data.page,
        htmlErrors: data.html.errors.length,
        cssErrors: data.css.errors.length
    })));

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=validation_results.csv");
    res.send(csv);
};

module.exports = { exportPDF, exportCSV };
