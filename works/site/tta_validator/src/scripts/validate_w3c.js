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

// 📌 Fonction de validation W3C pour HTML avec URL HTTPS
const validateHTML_urlHttps = async (page, pageUrl) => {
    if (pageUrl.startsWith("https://")) {

        const formData = new URLSearchParams();

        // formData.append("doc", `${encodeURIComponent(pageUrl)}`);  // Url HTTPS encodée
        formData.append("doc", pageUrl);  // Url HTTPS non encodée
        formData.append("showsource", "yes");  // Inclure le "Source" à 'yes'
        formData.append("showoutline", "yes");  // Inclure les "OutLine" (balise de la page...) à 'yes'
        formData.append("showimagereport", "no");  // Inclure les "Image report" à 'no'
        formData.append("checkerrorpages", "yes");  // Inclure les "Check Error Page" (Option) à 'yes'
        // formData.append("useragent", `${encodeURIComponent("Validator.nu/LV https://validator.w3.org/services")}`);  // Inclure les "User Agent" (option) à 'Validator.nu/LV https://validator.w3.org/services'
        formData.append("useragent", `"Validator.nu/LV https://validator.w3.org/services"`);  // Inclure les "User Agent" (option) à 'Validator.nu/LV https://validator.w3.org/services'
        formData.append("acceptlanguage", "");  // Inclure les "Accept-Langage" (option) à 'vide'
        formData.append("out", "json");  // Format de sortie JSON pour analyse


        console.log(`📌 Validation HTML via URL : ${pageUrl}`);
        logMessage(`📌✔ Validation HTML via URL : ${pageUrl}`);

        // 📌 Utilisation de la méthode GET pour solliciter le service de validation CSS du W3C
        const queryString = formData.toString();

        console.log(`📌 Requête 'GET' envoyée au validateur HTML :`, formData);
        logMessage(`📌✔ Requête GET (url https) envoyée au validateur HTML`, formData);

        const response = await fetch(`https://validator.w3.org/nu/?${queryString}`);
        // const response = await fetch(`https://validator.w3.org/nu/?showsource=yes&showoutline=yes&showimagereport=yes&checkerrorpages=yes&doc=${encodeURIComponent(pageUrl)}&out=json`);

        const textResponse = await response.text();

        // console.log(`📌 Réponse brute du validateur HTML :`, textResponse);
        logMessage(`📌✔ Réponse brute (requête GET) du validateur HTM `, textResponse);

        try {
            return JSON.parse(textResponse);
        } catch (error) {
            console.error(`❌ Erreur HTML URL sur ${page} : Réponse invalide`);
            saveDetailedError(page, "html_url", textResponse);
            return null;
        }
    } else return null;
};

// 📌 Fonction de validation W3C pour HTML
const validateHTML = async (page, htmlData, pageUrl) => {
    if (!htmlData.trim()) {
        console.error(`❌ Erreur : Le fichier HTML ${page} est vide`);
        logMessage(`❌ Fichier HTML vide : ${page}`);
        return null;
    }
    const formData = new FormData();
    formData.append("out", "json");
    formData.append("content", htmlData);

    // console.log(`📌 Requête 'POST' envoyée au validateur CSS :`, formData);
    logMessage(`📌✔ Requête POST (html du rendu) envoyée au validateur HTML`, formData);

    // 📌 Utilisation de la méthode POST pour solliciter le service de validation HTML du W3C
    const response = await fetch("https://validator.w3.org/nu/", {
        method: "POST",
        body: formData
    });

    const textResponse = await response.text();

    // console.log(`📌 Réponse brute du validateur HTML :`, textResponse);
    logMessage(`📌✔ Réponse brute (requête POST) du validateur HTML`);

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
const validateCSS = async (page, cssData, pageUrl) => {
    if (!cssData.trim()) {
        console.error(`❌ Erreur : Le fichier CSS ${page} est vide`);
        logMessage(`❌ Fichier CSS vide : ${page}`);
        return null;
    }

    const formData = new URLSearchParams();

    if (pageUrl.startsWith("https://")) {
        formData.append("uri", pageUrl);
    } else {
        formData.append("text", cssData);
    }

    formData.append("lang", "fr");  // Inclure la "Lang" à 'fr'
    formData.append("profile", "css3svg");  // Inclure le "Profil" à 'Utilisation de CSS niveau 3 + SVG'
    formData.append("usermedium", "all");  // Inclure les "Média" (écran, impression...) à 'tous'
    formData.append("vextwarning", "");  // Inclure les "Extensions Propriétaires" à 'valeur par défaut'
    formData.append("warning", "1");  // Inclure les "Avertissements" (dans la validation) à 'Rapport normal'
    formData.append("output", "json");  // Format de sortie JSON pour analyse

    // 📌 Utilisation de la méthode GET pour solliciter le service de validation CSS du W3C
    const queryString = formData.toString();

    // console.log(`📌 Requête 'GET' envoyée au validateur CSS :`, formData);
    logMessage(`📌✔ Requête envoyée au validateur CSS`, formData);

    const response = await fetch(`https://jigsaw.w3.org/css-validator/validator?${queryString}`);

    const textResponse = await response.text();

    // console.log(`📌 Réponse brute du validateur CSS :`, textResponse);
    logMessage(`📌✔ Réponse brute du validateur CSS`, textResponse);

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
        const baseUrl = `${config.base_url}`;
        const pageUrl = `${baseUrl}${route}`;
        const htmlFile = `${resultsDir}/${route.replace(/\//g, '_')}_.html`;
        const cssFile = `${resultsDir}/${route.replace(/\//g, '_')}_.css`;

        const htmlData = fs.existsSync(htmlFile) ? fs.readFileSync(htmlFile, "utf-8") : "";
        const cssData = fs.existsSync(cssFile) ? fs.readFileSync(cssFile, "utf-8") : "";

        try {
            logMessage(`🔹Début de validation W3C, page : ${route}`);

            const htmlErrors = await validateHTML(route, htmlData, pageUrl);
            const htmlUrlErrors = await validateHTML_urlHttps(route, pageUrl);
            const cssErrors = await validateCSS(route, cssData, pageUrl);

            results.push({
                url: baseUrl,
                page: route,
                htmlUrl: htmlUrlErrors,
                html: htmlErrors,
                css: cssErrors
            });

            fs.writeFileSync(`${resultsDir}/${route.replace(/\//g, '_')}_validation.json`,
                JSON.stringify({
                    url: baseUrl,
                    page: route,
                    htmlUrl: pageUrl.startsWith("https://") ? htmlUrlErrors : null,
                    html: htmlErrors,
                    css: cssErrors
                }, null, 2)
            );

            logMessage(`🔹Fin de validation W3C, page : ${route}`);
        } catch (error) {
            // console.error(`❌ Erreur lors de la validation de ${route}:`, error);
            logError(`❌ Erreur critique lors de la validation de ${route}: ${error.message}`);
        }
    }

    console.log("✅ Validation W3C terminée !");
};

// 📌 Pour lancement en ligne de commande (cf. script 'validate' de angular.json) avec la commande 'npm run validate'
if (process.argv[1] && process.argv[1].endsWith("validate_w3c.js")) {
    // console.log("👉 Début de la validation en CLI...");
    runValidation();
    // console.log("👉 Fin de la validation en CLI.");
}

export { runValidation };
