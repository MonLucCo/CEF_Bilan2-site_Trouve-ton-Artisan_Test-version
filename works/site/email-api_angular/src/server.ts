import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

// Chargement de la configuration en fonction de l'environnement
const environment = process.env['NODE_ENV'] || 'dev';
const config = require(`./environments/environment.${environment}.json`);
console.log(`L'environnement actuel est : ${environment}`);

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Middleware de logs
app.use((req: Request, res: Response, next) => {
    const now = new Date().toISOString(); // Date et heure actuelle
    const method = req.method; // Méthode HTTP (GET, POST, etc.)
    const url = req.url; // URL demandée
    const subject = req.body?.subject || "N/A"; // Sujet (si disponible dans le corps de la requête)

    // Log détaillé
    console.log(`[${now}] ${method} ${url} | Sujet : ${subject}`);
    next(); // Passe à l'étape suivante dans le pipeline
});

// Middleware global pour définir l'encodage UTF-8
app.use((req: Request, res: Response, next) => {
    res.setHeader('Content-Type', config.server.contentType);
    next();
});

// Route principale pour envoyer des emails
app.post(config.api.sendEmailEndpoint, async (req: Request, res: Response) => {
    const { from, to, subject, text } = req.body;

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure
    });

    try {
        // Envoi de l'email
        await transporter.sendMail({ from, to, subject, text });
        res.status(200).send({ success: true, message: config.messages.emailSuccess });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : config.messages.unknownError;
        res.status(500).send({ success: false, error: errorMessage });
    }
});

// Lancement du serveur
app.listen(config.server.port, () => {
    console.log(`API en écoute sur http://localhost:${config.server.port}`);
});
