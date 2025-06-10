document.addEventListener("DOMContentLoaded", async () => {
    const resultsTable = document.getElementById("resultsTable");
    const loadPagesButton = document.getElementById("loadPages");
    const initializeTestButton = document.getElementById("initializeTest");
    const extractPagesButton = document.getElementById("extractPages");
    const validatePagesButton = document.getElementById("validatePages");
    const exportPDFButton = document.getElementById("exportPDF");
    const exportCSVButton = document.getElementById("exportCSV");

    // 📌 Suivi d'exécution (traces des actions)
    const updateStatus = (message) => {
        const statusDiv = document.getElementById("statusExecution");
        if (statusDiv) {
            const p = document.createElement("p");
            p.textContent = message;
            statusDiv.appendChild(p);
            statusDiv.scrollTop = statusDiv.scrollHeight; // Auto-scroll vers le bas
        } else {
            console.error("❌ Élément '.status-content' introuvable !");
        }
    };

    // 📌 Interaction avec le serveur
    const sendRequest = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            updateStatus(`✅ ${endpoint} : ${data.message}`);
            console.log(`📌 Mise à jour du statut : ${data.message}`);
        } catch (error) {
            updateStatus(`❌ Erreur lors de l'appel à ${endpoint} : ${error.message}`);
            console.error(`❌ Erreur détectée : ${error.message}`);
        }
    };

    // 📌 Charger les données de configuration
    const updateBaseURL = async () => {
        try {
            const response = await fetch("/config");
            const config = await response.json();
            document.getElementById("baseURL").textContent = `🔍 Adresse du site : ${config.base_url || "Non définie"}`;
        } catch (error) {
            console.error("❌ Impossible de charger l'URL du site :", error);
        }
    };

    document.addEventListener("DOMContentLoaded", updateBaseURL);

    // 📌 Ajuster l'affichage des résultats pour masquer la colonne HTTPS (si inutile)
    const adjustTableLayout = async () => {
        try {
            const response = await fetch("/config");
            const config = await response.json();
            const baseUrl = config.base_url || "";

            if (baseUrl.startsWith("http://")) {
                document.querySelector("thead tr th:nth-child(5)").style.display = "none";
                document.querySelectorAll("#resultsTable tr td:nth-child(5)").forEach(td => td.style.display = "none");
            }
        } catch (error) {
            console.error("❌ Erreur lors de la récupération du protocole :", error);
        }
    };

    document.addEventListener("DOMContentLoaded", async () => {
        adjustTableLayout();
        loadResults();
    });

    // 📌 Charger les résultats après validation
    const loadResults = async () => {
        try {
            const response = await fetch("/results");
            const results = await response.json();

            resultsTable.innerHTML = ""; // Nettoyage avant affichage
            if (!results || results.length === 0) {
                resultsTable.innerHTML = `<tr><td colspan="5">Aucun résultat disponible.</td></tr>`;
                updateStatus("📌 Aucun résultat à afficher.");
                return;
            }

            results.forEach((result) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><input type="checkbox" class="select-page" data-page="${result.page}"></td>
                    <td>${result.page}</td>
                    <td>
                        ${result.html?.messages?.filter(m => m.type === "error").length || 0} erreurs
                        <br>
                        ${result.html?.messages?.filter(m => m.type === "info").length || 0} avertissements
                    </td>
                    <td>
                        ${result.css?.cssvalidation?.errors?.length || 0} erreurs
                        <br>
                        ${result.css?.cssvalidation?.warnings?.length || 0} avertissements
                    </td>
                    <td>
                        ${result.htmlUrl?.messages?.filter(m => m.type === "error").length || 0} erreurs
                        <br>
                        ${result.htmlUrl?.messages?.filter(m => m.type === "info").length || 0} avertissements
                    </td>
                `;
                resultsTable.appendChild(row);
            });

            updateStatus("📌 Résultats mis à jour !");
        } catch (error) {
            updateStatus(`❌ Erreur lors du chargement des résultats : ${error.message}`);
        }
    };

    document.addEventListener("DOMContentLoaded", loadResults);

    // 📌 Fonctionnalités réactives de l'application

    loadPagesButton.addEventListener("click", () => sendRequest("/loadPages"));
    extractPagesButton.addEventListener("click", () => sendRequest("/extractPages"));
    validatePagesButton.addEventListener("click", async () => {
        await sendRequest("/validatePages");
        loadResults();
    });
    exportPDFButton.addEventListener("click", () => window.open("/export/pdf", "_blank"));
    exportCSVButton.addEventListener("click", () => window.open("/export/csv", "_blank"));
    initializeTestButton.addEventListener("click", async () => {
        updateStatus("📌 Réinitialisation du test en cours...");

        try {
            await fetch("/resetTests", { method: "POST" });
            resultsTable.innerHTML = `<tr><td colspan="4">📌 Résultats effacés, prêt pour un nouveau test</td></tr>`;
            updateBaseURL();
            loadResults();
        } catch (error) {
            updateStatus(`❌ Erreur lors de la réinitialisation : ${error.message}`);
        }
    });
});
