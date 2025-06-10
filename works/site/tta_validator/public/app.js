document.addEventListener("DOMContentLoaded", async () => {
    const resultsTable = document.getElementById("resultsTable");
    const statusOutput = document.getElementById("statusOutput");

    const loadPagesButton = document.getElementById("loadPages");
    const extractPagesButton = document.getElementById("extractPages");
    const validatePagesButton = document.getElementById("validatePages");
    const exportPDFButton = document.getElementById("exportPDF");
    const exportCSVButton = document.getElementById("exportCSV");

    const updateStatus = (message) => {
        statusOutput.textContent += `${message}\n`;
    };

    // 📌 Interaction avec le serveur
    const sendRequest = async (endpoint) => {
        try {
            const response = await fetch(endpoint);
            const data = await response.text();
            updateStatus(`✅ ${endpoint} : ${data}`);
        } catch (error) {
            updateStatus(`❌ Erreur lors de l'appel à ${endpoint} : ${error.message}`);
        }
    };

    loadPagesButton.addEventListener("click", () => sendRequest("/loadPages"));
    extractPagesButton.addEventListener("click", () => sendRequest("/extractPages"));
    validatePagesButton.addEventListener("click", () => sendRequest("/validatePages"));

    // 📌 Charger les résultats après validation
    const response = await fetch("/results");
    const results = await response.json();

    if (results.message) {
        resultsTable.innerHTML = `<tr><td colspan="4">${results.message}</td></tr>`;
    } else {
        results.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" class="select-page" data-page="${result.page}"></td>
                <td>${result.page}</td>
                <td>${result.html?.messages?.length || 0}</td>
                <td>${result.css?.messages?.length || 0}</td>
            `;
            resultsTable.appendChild(row);
        });
    }

    exportPDFButton.addEventListener("click", () => window.open("/export/pdf", "_blank"));
    exportCSVButton.addEventListener("click", () => window.open("/export/csv", "_blank"));
});
