document.addEventListener("DOMContentLoaded", function () {
    const loadSchemaData = (jsonFile) => {
        fetch(`datas/${jsonFile}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
                    let scriptElement = document.createElement("script");
                    scriptElement.type = "application/ld+json";
                    scriptElement.textContent = JSON.stringify(data);
                    document.head.appendChild(scriptElement);
                    console.log(`Schema.org chargé depuis ${jsonFile}`);
                } else {
                    console.warn(`Fichier JSON vide ou mal formaté : ${jsonFile}`);
                }
            })
            .catch(error => console.error(`Problème de chargement ${jsonFile} :`, error));
    };

    // Chargement des données `Schema.org` depuis `public/datas/`
    loadSchemaData('site-schema.json'); // Objet JSON
    loadSchemaData('artisan-schema.json'); // Tableau JSON
});
