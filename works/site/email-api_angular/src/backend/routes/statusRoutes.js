module.exports = (config) => {
    const express = require('express');
    const router = express.Router();

    // Endpoint pour le statut du serveur
    router.get(config.api.sendStatusEndpoint.serverEndpoint, (req, res) => {
        console.log("[statusRoutes] : [DEBUG]-[GET] : Accès à l'état du serveur 'Back-End'...");
        res.status(200).json({ status: 'UP' }); // Réponse fixe pour un serveur actif
        console.log("[statusRoutes] : [DEBUG]-[GET] : Etat du serveur 'Back-End' rendu.");
    });

    // Endpoint pour le statut de MailDev
    router.get(config.api.sendStatusEndpoint.targetEndpoint, (req, res) => {
        console.log("[statusRoutes] : [DEBUG]-[GET] : Accès à l'état du serveur 'MailDev'...");
        const isMailDevActive = checkMailDevStatus(); // Appel à une fonction pour vérifier MailDev
        if (isMailDevActive) {
            res.status(200).json({ status: 'UP' });
            console.log("[statusRoutes] : [DEBUG]-[GET] : Etat du serveur 'MailDev' rendu : UP");
        } else {
            res.status(503).json({ status: 'DOWN' });
            console.log("[statusRoutes] : [DEBUG]-[GET] : Etat du serveur 'MailDev' rendu : DOWN");
        }
    });

    // Fonction simulée pour vérifier MailDev (à implémenter selon les besoins)
    function checkMailDevStatus() {
        // Simulation d'un service actif
        console.log("[checkMailDevStatus] : [DEBUG] : Etat simulé du serveur 'MailDev' rendu : UP");
        return true;
    }

    return router
}
