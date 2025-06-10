import express from "express";
import fs from "fs";
import path from "path";

import { exportPDF, exportCSV } from "./src/scripts/export_results.js";
import { runValidation } from "./src/scripts/validate_w3c.js";
import { runExtraction } from "./src/scripts/extract_html_css.js";

import { execFile } from "child_process";

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
    fs.writeFileSync(LOG_FILE, "", { flag: "w" }); // Création automatique du fichier
    logMessage(`📌 Création fichier : validation_logs.txt`);
}

// Utile avec les EndPoints utilisant les scripts .sh et .ps1
// 📌 Détection de l'OS pour adapter l'exécution (utile pour l'exécution de scripts .sh ou .ps1)
// const isWindows = process.platform === "win32";

// 📌 End-Points du serveur et composition de l'application
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

app.post("/resetTests", (req, res) => {
    console.log("📌 Réinitialisation du test en cours...");

    try {
        fs.readdirSync(resultsDir).forEach(file => {
            const filePath = path.join(resultsDir, file);
            if (filePath !== LOG_FILE) {
                fs.unlinkSync(filePath);
            }
        });

        console.log("✅ Réinitialisation terminée !");
        res.json({ message: "📌✅ Test réinitialisé avec succès !" });
    } catch (error) {
        console.error("❌🔍  Erreur lors de la réinitialisation :", error);
        res.status(500).json({ message: "Erreur lors de la réinitialisation." });
    }
});

app.get('/config', (req, res) => {
    console.log("📌 Consultation des paramètres de configuration...");
    logMessage("📊 Consultation des paramètres de configuration");

    try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        res.json(config);
    } catch (error) {
        console.error("❌ Erreur lors du chargement des paramètres :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des paramètres de configuration." });
    }
});

app.get('/results', (req, res) => {
    logMessage("📊 Consultation des résultats de validation");
    let files = fs.readdirSync(resultsDir).filter(file => file.endsWith('_validation.json'));

    if (files.length === 0) {
        // return res.json({ message: "Aucun résultat disponible." });
        return res.json([]); // Corrige la réponse vide en retournant un tableau au lieu d'un objet    
    }
    let results = files.map(file => JSON.parse(fs.readFileSync(`${resultsDir}/${file}`)));
    res.json(results);
});

app.get('/export/pdf', (req, res) => {
    res.status(200).send("🚧 Fonction d'export PDF en construction. Veuillez patienter pour une future mise à jour.");
});

app.get('/export/csv', (req, res) => {
    res.status(200).send("🚧 Fonction d'export CSV en construction. Veuillez patienter pour une future mise à jour.");
});

app.get('/loadPages', (req, res) => {
    logMessage("📥 Chargement du fichier `pages.json`");
    const configPath = path.resolve(__dirname, "config/pages.json");

    if (!fs.existsSync(configPath)) {
        return res.status(404).send("❌ ERREUR : `pages.json` introuvable !");
    }

    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    res.json({ message: "✅ `pages.json` chargé avec succès", config });
});

app.get('/extractPages', async (req, res) => {
    console.log("📌 Extraction en cours...");
    logMessage("📌📑 Extraction des pages en cours...");

    try {
        const result = await runExtraction();
        console.log("✅ Extraction réussie :", result);
        res.json({ message: "📌✅ Extraction terminée", result });
    } catch (error) {
        console.error("❌🔍 Erreur d'extraction :", error);
        res.status(500).send("Erreur lors de l'extraction.");
    }

});

// EndPoint '/extractPages' utilisant des scripts .sh et .ps1 selon l'environnement système.
// app.get('/extractPages', (req, res) => {
//     console.log("📌 Extraction en cours...");
//     logMessage("📌📑 Extraction des pages en cours...");

//     const extractPath = isWindows ? "src/scripts/extract.ps1" : "src/scripts/extract.sh";
//     // const extractPath = path.resolve(__dirname, isWindows ? "src/scripts/extract.ps1" : "src/scripts/extract.sh");
//     const extractCommand = "powershell.exe";
//     // const extractCommand = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
//     const extractArgs = ["-ExecutionPolicy", "Bypass", "-File", extractPath];

//     if (!fs.existsSync(extractPath)) {
//         console.error(`❌ Le script d'extraction est introuvable : ${extractPath}`);
//         return res.status(500).send("Erreur : Script d'extraction introuvable.");
//     }

//     console.log(`📌🔍 Exécution de : ${extractCommand} avec les arguments ${extractArgs}`);

//     execFile(extractCommand, extractArgs, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`❌ Erreur d\'extraction : ${error.message}`);
//             console.error(`🔍 Détails de l'erreur : ${stderr}`);
//             return res.status(500).send("Erreur lors de l'extraction.");
//         }
//         console.log(`📌📝 Résultat d'extraction' : ${stdout}`);
//         console.log(`📌✅ Extraction des pages terminée`);
//         logMessage("📌📑 Extraction des pages terminée");
//         res.json({ message: "📌✅ Extraction des pages terminée" });
//     });

// });

app.get('/validatePages', async (req, res) => {
    console.log("📌 Validation en cours...");
    logMessage("📌📊 Validation des pages en cours...");

    try {
        const result = await runValidation();
        console.log("✅ Validation réussie :", result);
        res.json({ message: "📌✅ Validation terminée", result });
    } catch (error) {
        console.error("❌🔍 Erreur de validation :", error);
        res.status(500).send("Erreur lors de la validation.");
    }

});

// EndPoint '/validatePages' utilisant des scripts .sh et .ps1 selon l'environnement système.
// app.get('/validatePages', (req, res) => {
//     console.log("📌 Validation en cours...");
//     logMessage("📌📊 Validation des pages en cours...");

//     const validatePath = isWindows ? "src/scripts/validate.ps1" : "src/scripts/validate.sh";
//     // const validatePath = path.resolve(__dirname, isWindows ? "src/scripts/validate.ps1" : "src/scripts/validate.sh");
//     const validateCommand = "powershell.exe";
//     // const validateCommand = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
//     const validateArgs = ["-ExecutionPolicy", "Bypass", "-File", validatePath];

//     if (!fs.existsSync(validatePath)) {
//         console.error(`❌ Le script de validation est introuvable : ${validatePath}`);
//         return res.status(500).send("Erreur : Script de validation introuvable.");
//     }

//     console.log(`📌🔍 Exécution de : ${validateCommand} avec les arguments ${validateArgs}`);

//     execFile(validateCommand, validateArgs, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`❌ Erreur validation : ${error.message}`);
//             console.error(`🔍 Détails de l'erreur : ${stderr}`);
//             return res.status(500).send("Erreur lors de la validation.");
//         }
//         console.log(`📌📝 Résultat de validation : ${stdout}`);
//         console.log(`📌✅ Validation des pages terminée`);
//         res.json({ message: "📌✅ Validation des pages terminée" });
//     });
// });

// 📌 Mise en service du serveur
app.listen(PORT, () => {
    logMessage(`🚀 Serveur démarré → http://localhost:${PORT}`);
    console.log(`🚀 Serveur tta_validator actif → http://localhost:${PORT}`);
});
