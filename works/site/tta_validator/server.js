import express from "express";
import fs from "fs";
import path from "path";
import { exportPDF, exportCSV } from "./src/scripts/export_results.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(`📌 Dossier de travail : ${__dirname}`); // Log principal au démarrage

const configPath = path.resolve(__dirname, "config/pages.json");

// 📌 Vérifier si `pages.json` existe
if (!fs.existsSync(configPath)) {
    console.error("❌ ERREUR : Le fichier config/pages.json est introuvable !");
    console.log(`📌 Vérification du chemin : ${configPath}`);
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const app = express();

const PORT = config.port || 3010;
const resultsDir = path.resolve(__dirname, "results");

// 📌 Définition de la fonction `logMessage()` avant son utilisation
const LOG_FILE = path.join(resultsDir, config.log_file || "validation_logs.txt");

const logMessage = (message) => {
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${message}\n`);
};

// 📌 Assurer que le dossier `results/` existe avant d'écrire dedans
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
    logMessage(`📌 Création dossier : /results`);
}

// 📌 Vérifier que `validation_logs.txt` existe avant d'écrire dedans
if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, ""); // Création automatique du fichier
    logMessage(`📌 Création fichier : validation_logs.txt`);
}

app.use('/public', express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader("Content-Type", "text/css");
        }
    }
}));

app.get('/', (req, res) => {
    logMessage("➡ Accès à l'interface web");
    res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/results', (req, res) => {
    logMessage("📊 Consultation des résultats de validation");
    let files = fs.readdirSync(resultsDir).filter(file => file.endsWith('_validation.json'));
    let results = files.map(file => JSON.parse(fs.readFileSync(`${resultsDir}/${file}`)));
    res.json(results);
});

app.get('/export/pdf', (req, res) => {
    logMessage("📝 Exportation des résultats en PDF");
    let files = fs.readdirSync(resultsDir).filter(file => file.endsWith('_validation.json'));
    let results = files.map(file => JSON.parse(fs.readFileSync(`${resultsDir}/${file}`)));
    exportPDF(results, res);
});

app.get('/export/csv', (req, res) => {
    logMessage("📄 Exportation des résultats en CSV");
    let files = fs.readdirSync(resultsDir).filter(file => file.endsWith('_validation.json'));
    let results = files.map(file => JSON.parse(fs.readFileSync(`${resultsDir}/${file}`)));
    exportCSV(results, res);
});

app.listen(PORT, () => {
    logMessage(`🚀 Serveur démarré → http://localhost:${PORT}`);
    console.log(`🚀 Serveur tta_validator actif → http://localhost:${PORT}`);
});
