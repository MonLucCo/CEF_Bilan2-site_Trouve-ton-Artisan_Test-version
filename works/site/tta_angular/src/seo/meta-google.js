document.addEventListener("DOMContentLoaded", function () {
    // Création dynamique des balises meta Google
    const metaTags = [
        { name: "description", content: "Plateforme de formation sur la mise en relation entre artisans et clients." },
        { name: "keywords", content: "artisan, développement web, apprentissage Angular, SEO" },
        { name: "robots", content: "index, follow" }
    ];

    // Ajout des balises au document
    metaTags.forEach(metaData => {
        let metaElement = document.createElement("meta");
        metaElement.name = metaData.name;
        metaElement.content = metaData.content;
        document.head.appendChild(metaElement);
    });
});
