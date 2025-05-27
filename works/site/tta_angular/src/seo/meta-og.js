document.addEventListener("DOMContentLoaded", function () {
    const metaTags = [
        { property: "og:title", content: "Trouve Ton Artisan | Formation Développement Web" },
        { property: "og:description", content: "Apprenez à créer une plateforme d'artisans avec Angular et Bootstrap." },
        { property: "og:image", content: "https://www.trouve-ton-artisan.com/images/cover.jpg" },
        { property: "og:url", content: "https://www.trouve-ton-artisan.com" }
    ];

    metaTags.forEach(metaData => {
        let metaElement = document.createElement("meta");
        metaElement.setAttribute("property", metaData.property);
        metaElement.setAttribute("content", metaData.content);
        document.head.appendChild(metaElement);
    });
});
