fetch('seo/seo-config.json')
    .then(response => response.json())
    .then(data => {
        console.log("SEO Configuration chargée :", data);
    })
    .catch(error => console.error("Erreur de chargement du SEO :", error));
