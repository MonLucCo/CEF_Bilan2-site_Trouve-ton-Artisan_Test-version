import fs from "fs";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configPath = path.resolve(__dirname, "../../config/pages.json");

if (!fs.existsSync(configPath)) {
    console.error("❌ ERREUR : Le fichier config/pages.json est introuvable !");
    console.log(`📌 Vérification du chemin : ${configPath}`);
    process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// 📌 Assurer que le dossier `/results/` existe
const resultsDir = path.resolve(__dirname, "../../results");
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

// 📌 Définition des fichiers de logs et erreurs
const LOG_FILE = path.join(resultsDir, config.log_file || "validation_logs.txt");
const ERROR_LOG_FILE = path.join(resultsDir, "validation_errors.txt");

if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, ""); // Création automatique du fichier de logs
}

if (!fs.existsSync(ERROR_LOG_FILE)) {
    fs.writeFileSync(ERROR_LOG_FILE, ""); // Création automatique du fichier d'erreurs
}

const logMessage = (message) => {
    fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${message}\n`);
};

const logError = (message) => {
    fs.appendFileSync(ERROR_LOG_FILE, `[${new Date().toISOString()}] ${message}\n`);
};

// 📌 Fonction pour enregistrer les erreurs dans un fichier spécifique
const saveDetailedError = (page, type, textResponse) => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toISOString().split("T")[1].slice(0, 5).replace(":", "-"); // Format HH-mm
    const errorFile = path.join(resultsDir, `${page.replace(/\//g, '_')}_err-w3c-${type}-${date}-${time}.txt`);

    fs.writeFileSync(errorFile, `🛑 Erreurs détectées sur la page ${page} (${type})\n\n${textResponse}`);
    logError(`Erreur W3C enregistrée dans '/results/' → ${path.basename(errorFile)}`);
};

// 📌 Fonction de validation W3C pour HTML
const validateHTML = async (page, htmlData) => {
    const formData = new FormData();
    formData.append("out", "json");
    formData.append("content", htmlData);

    const response = await fetch("https://validator.w3.org/nu/", {
        method: "POST",
        body: formData
    });

    const textResponse = await response.text();

    try {
        return JSON.parse(textResponse);
    } catch (error) {
        console.error(`❌ Erreur HTML sur la page ${page} : Réponse invalide du validateur W3C`);
        logMessage(`Erreur HTML sur la page ${page}`);
        saveDetailedError(page, "html", textResponse);
        return null;
    }
};

// 📌 Fonction de validation W3C pour CSS
const validateCSS = async (page, cssData) => {
    const formData = new FormData();
    formData.append("text", cssData);

    const response = await fetch("https://jigsaw.w3.org/css-validator/validator", {
        method: "POST",
        body: formData
    });

    const textResponse = await response.text();

    try {
        return JSON.parse(textResponse);
    } catch (error) {
        console.error(`❌ Erreur CSS sur la page ${page} : Réponse invalide du validateur W3C`);
        logMessage(`Erreur CSS sur la page ${page}`);
        saveDetailedError(page, "css", textResponse);
        return null;
    }
};

// 📌 Lecture des fichiers et validation
const runValidation = async () => {
    const results = [];

    for (let route of config.pages) {
        const htmlFile = `${resultsDir}/_${route.replace(/\//g, '_')}_.html`;
        const cssFile = `${resultsDir}/_${route.replace(/\//g, '_')}_.css`;

        const htmlData = fs.existsSync(htmlFile) ? fs.readFileSync(htmlFile, "utf-8") : "";
        const cssData = fs.existsSync(cssFile) ? fs.readFileSync(cssFile, "utf-8") : "";

        try {
            const htmlErrors = await validateHTML(route, htmlData);
            const cssErrors = await validateCSS(route, cssData);

            results.push({
                page: route,
                html: htmlErrors,
                css: cssErrors
            });

            fs.writeFileSync(`${resultsDir}/${route.replace(/\//g, '_')}_validation.json`,
                JSON.stringify({ html: htmlErrors, css: cssErrors }, null, 2)
            );

            logMessage(`Validation terminée pour la page ${route}`);
        } catch (error) {
            console.error(`❌ Erreur lors de la validation de ${route}:`, error);
            logError(`Erreur critique lors de la validation de ${route}: ${error.message}`);
        }
    }

    console.log("✅ Validation W3C terminée !");
};

runValidation();
