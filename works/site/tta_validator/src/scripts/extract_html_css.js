import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resultsDir = path.resolve(__dirname, "../../results");
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

const extractHTMLAndCSS = async (pageUrl, pageName, injectHTML, injectCSS) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(pageUrl, { waitUntil: "networkidle2" });

        // 📌 Attendre que les méta dynamiques soient bien injectées
        await page.waitForSelector('meta[name="description"]', { timeout: 5000 });

        // 📌 Récupération du HTML final après rendu complet
        let html = await page.evaluate(() => document.documentElement.outerHTML);

        // 📌 Ajout du contenu `inject_html` (utile pour injecter DOCTYPE non récupéré)
        html = `${injectHTML}\n${html}`;

        // 📌 Sauvegarde du HTML extrait
        const htmlFile = path.join(resultsDir, `${pageName.replace(/\//g, '_')}_.html`);
        fs.writeFileSync(htmlFile, html);
        console.log(`✅ HTML extrait et sauvegardé dans ${htmlFile}`);

        // 📌 Récupération des liens des fichiers CSS externes
        const cssLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
                .map(link => link.href);
        });

        console.log(`📌 Fichiers CSS détectés pour ${pageName} :`, cssLinks);

        let allCSS = injectCSS; // 📌 Ajout du contenu `inject_css` en début de fichier

        for (let link of cssLinks) {
            try {
                const response = await page.evaluate(async (url) => {
                    const res = await fetch(url);
                    return await res.text();
                }, link);

                allCSS += `\n/* CSS extrait de ${link} */\n${response}`;
            } catch (error) {
                console.error(`❌ Erreur lors de l'extraction du fichier CSS ${link} : ${error.message}`);
            }
        }

        // 📌 Sauvegarde du CSS extrait
        const cssFile = path.join(resultsDir, `${pageName.replace(/\//g, '_')}_.css`);
        fs.writeFileSync(cssFile, allCSS);
        console.log(`✅ CSS extrait et sauvegardé dans ${cssFile}`);

    } catch (error) {
        console.error(`❌ Erreur lors de l'extraction HTML/CSS pour ${pageName} : ${error.message}`);
    } finally {
        await browser.close();
    }
};

// 📌 Exécuter l'extraction sur toutes les pages définies dans `pages.json`
const runExtraction = async () => {
    const configPath = path.resolve(__dirname, "../../config/pages.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    const baseUrl = config.base_url;

    config.pages.forEach(async (page) => {
        const pageUrl = `${baseUrl}${page}`;
        await extractHTMLAndCSS(pageUrl, page, config.inject_html || "", config.inject_css || "");
    });
};


// 📌 Pour lancement en ligne de commande (cf. script 'extract' de angular.json) avec la commande 'npm run extract'
if (process.argv[1] && process.argv[1].endsWith("extract_html_css.js")) {
    // console.log("👉 Début de l'extraction en CLI...");
    runExtraction();
    // console.log("👉 Fin de l'extraction en CLI.");
}

export { runExtraction };

