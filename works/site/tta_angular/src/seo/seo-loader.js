document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Chargement des fichiers SEO
        await Promise.all([
            fetch('/datas/seo-config.json').then(res => res.json()).then(data => injectSEO(data)),
            fetch('/datas/site-schema.json').then(res => res.json()).then(data => injectSchema(data, "site-schema")),
            fetch('/datas/artisan-schema.json').then(res => res.json()).then(data => injectSchema(data, "artisan-schema"))
        ]);

    } catch (error) {
        console.error("Erreur de chargement du SEO :", error);
    }
});

// Fonction d'injection des métadonnées `<meta>` Google
const injectSEO = (data) => {
    const metas = [
        { name: "description", content: data.description },
        { name: "keywords", content: data.keywords.join(", ") },
        { name: "author", content: data.author },
        { name: "robots", content: data.robots }
    ];

    metas.forEach(metaData => {
        let metaElement = document.createElement("meta");
        metaElement.name = metaData.name;
        metaElement.content = metaData.content;
        document.head.appendChild(metaElement);
    });
};

// Fonction d'injection des données `Schema.org`
const injectSchema = (data, id) => {
    if (data) {
        let scriptElement = document.createElement("script");
        scriptElement.type = "application/ld+json";
        scriptElement.id = id;
        scriptElement.textContent = JSON.stringify(data);
        document.head.appendChild(scriptElement);
        console.log(`Schema.org injecté depuis ${id}`, scriptElement);
    } else {
        console.warn(`Données vides pour ${id}`);
    }
};
