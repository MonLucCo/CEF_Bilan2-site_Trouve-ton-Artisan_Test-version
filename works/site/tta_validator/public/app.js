document.addEventListener("DOMContentLoaded", async () => {
    const resultsTable = document.getElementById("resultsTable");
    const exportPDFButton = document.getElementById("exportPDF");
    const exportCSVButton = document.getElementById("exportCSV");

    const response = await fetch("/results");
    const results = await response.json();

    results.forEach((result) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" class="select-page" data-page="${result.page}"></td>
            <td>${result.page}</td>
            <td>${result.html.errors.length}</td>
            <td>${result.css.errors.length}</td>
        `;
        resultsTable.appendChild(row);
    });

    exportPDFButton.addEventListener("click", () => {
        window.open("/export/pdf", "_blank");
    });

    exportCSVButton.addEventListener("click", () => {
        window.open("/export/csv", "_blank");
    });
});
