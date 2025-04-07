const express = require('express');
const cors = require('cors'); // Importer le module cors
const nodemailer = require('nodemailer'); // Importer Nodemailer pour envoyer des emails via SMTP
const MailDev = require('maildev');

const app = express();

// Activer CORS pour toutes les requêtes
app.use(cors());

// Configuration de MailDev
const maildev = new MailDev({
    smtp: 1025, // Port SMTP de MailDev
    web: 1080,  // Interface Web de MailDev
});

// Vérification du démarrage de MailDev
maildev.listen((err) => {
    if (err) {
        console.error("Erreur lors du lancement de MailDev :", err);
        return;
    }
    console.log('MailDev actif :');
    console.log('SMTP : localhost:1025');
    console.log('Interface web : http://localhost:1080');
});

// Créer un transporteur SMTP avec Nodemailer pour envoyer des emails via MailDev
const transporter = nodemailer.createTransport({
    host: 'localhost', // Adresse du serveur SMTP (MailDev)
    port: 1025,        // Port SMTP de MailDev
    secure: false      // MailDev ne nécessite pas de connexion sécurisée
});

// API pour envoyer un email
app.post('/send-email', express.json(), async (req, res) => {
    const { from, to, subject, body } = req.body;

    try {
        const info = await transporter.sendMail({
            from,       // Adresse expéditeur
            to,         // Destinataire
            subject,    // Sujet de l'email
            text: body  // Corps de l'email
        });

        console.log('Email envoyé avec succès :', info);
        res.status(200).json({ message: "[server] Email envoyé avec succès" });
    } catch (err) {
        console.error("Erreur lors de l'envoi de l'email :", err);
        res.status(500).json({ message: "[server] Erreur lors de l'envoi de l'email" });
    }
});

// API pour récupérer tous les emails capturés
app.get('/get-emails', async (req, res) => {
    try {
        maildev.getAllEmail((err, emails) => {
            if (err) {
                console.error("[server] Erreur lors de la récupération des emails :", err);
                return res.status(500).json({ message: "[server] Erreur lors de la récupération des emails" });
            }

            console.log("[server] Emails récupérés :", emails);
            res.status(200).json(emails);
        });
    } catch (err) {
        console.error("Erreur inattendue :", err);
        res.status(500).json({ message: "[server] Erreur inattendue lors de la récupération des emails" });
    }
});

// API pour supprimer tous les emails capturés
app.delete('/delete-emails', async (req, res) => {
    try {
        maildev.deleteAllEmail((err) => {
            if (err) {
                console.error("[server] Erreur lors de la suppression des emails :", err);
                return res.status(500).json({ message: "[server] Erreur lors de la suppression des emails" });
            }

            console.log("[server] Tous les emails ont été supprimés.");
            res.status(200).json({ message: "[server] Tous les emails ont été supprimés avec succès" });
        });
    } catch (err) {
        console.error("Erreur inattendue :", err);
        res.status(500).json({ message: "[server] Erreur inattendue lors de la suppression des emails" });
    }
});

// Serveur backend (Express)
app.listen(3000, () => {
    console.log("Backend actif : http://localhost:3000");
});
