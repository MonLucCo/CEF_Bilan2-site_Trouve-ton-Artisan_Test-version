module.exports = (messages) => {
    const express = require('express');
    const router = express.Router();

    // Récupérer tous les messages
    router.get('/', (req, res) => {
        console.log("[messageRoutes] : [DEBUG]-[GET] : Accès aux messages historisés : ", messages);
        res.status(200).json(messages);
        console.log("[messageRoutes] : [DEBUG]-[GET] : Messages listés dans l'historique. Nombre de messages historisés : ", messages.length);
    });

    // Ajouter un message
    router.post('/', (req, res) => {
        console.log("[messageRoutes] : [DEBUG]-[POST] : Traitement de la requête...", req.body);
        const { id, from, to, subject, body, date } = req.body;

        // Validation des données
        if (!id || !from || !to || !subject || !body || !date) {
            console.log("[messageRoutes] : [ERREUR]-[POST] : Données invalides !");
            return res.status(400).json({
                success: false,
                message: 'Tous les champs sont requis pour ajouter un message.'
            });
        }

        // Validation des adresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(from) || !emailRegex.test(to)) {
            console.log("[messageRoutes] : [ERREUR]-[POST] : Adresses invalides !");
            return res.status(400).json({
                success: false,
                message: 'Le champ "from" ou "to" contient une adresse email invalide.'
            });
        }

        // Validation des dates
        if (isNaN(Date.parse(date))) {
            console.log("[messageRoutes] : [ERREUR]-[POST] : Date invalide !");
            return res.status(400).json({
                success: false,
                message: 'Le champ "date" contient une date invalide.'
            });
        }

        // Ajouter le message à la liste
        const newMessage = { id, from, to, subject, body, date };
        console.log("[messageRoutes] : [DEBUG]-[POST] : Contenu du nouveau message : ", newMessage);
        // console.log("[messageRoutes] : [DEBUG]-[POST] : Contenu des messages avant ajout : ", messages);
        messages.push(newMessage);
        console.log("[messageRoutes] : [DEBUG]-[POST] : Contenu des messages après ajout : ", messages);

        res.status(201).json({
            success: true,
            message: 'Message ajouté avec succès !',
            data: newMessage
        });

        console.log("[messageRoutes] : [DEBUG]-[POST] : Message ajouté dans l'historique. Nombre de messages historisés : ", messages.length);

    });

    // Supprimer un message spécifique par ID
    router.delete('/:id', (req, res) => {
        const messageId = req.params.id;
        console.log("[messageRoutes] : [DEBUG]-[DELETE]-[ID] : Suppression du message : ", messageId);

        // Validation de l'Id
        if (!messageId || typeof messageId !== 'string') {
            console.log("[messageRoutes] : [ERREUR]-[DELETE]-[ID] : Index invalide !");
            return res.status(400).json({
                success: false,
                message: 'ID invalide ou non fourni.'
            });
        }

        // Trouver et supprimer le message
        const index = messages.findIndex(msg => msg.id === messageId);
        if (index === -1) {
            console.log("[messageRoutes] : [ERREUR]-[DELETE]-[ID] : Index du message non trouvé !");
            return res.status(404).json({
                success: false,
                message: `Aucun message trouvé avec l'ID ${messageId}.`
            });
        }

        messages.splice(index, 1); // Supprime le message à l'index trouvé

        res.status(200).json({
            success: true,
            message: `Message avec l'ID ${messageId} supprimé avec succès.`
        });

        console.log("[messageRoutes] : [DEBUG]-[DELETE]-[ID] : Message supprimé dans l'historique. Nombre de messages historisés : ", messages.length);

    });

    // Supprimer tous les messages
    router.delete('/', (req, res) => {
        console.log("[messageRoutes] : [DEBUG]-[DELETE]-[ALL] : Suppression de tous les messages de l'historique");

        messages.forEach((_, index) => messages[index] = null); // Remplace chaque élément par null pour informer le garbage collector
        messages.length = 0; // Vide le tableau tout en conservant la référence

        res.status(200).json({ message: 'Tous les messages ont été supprimés !' });

        console.log("[messageRoutes] : [DEBUG]-[DELETE]-[ALL] : Historique supprimé. Nombre de messages historisés : ", messages.length);

    });

    return router
}
