import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

// Version du serveur de passerelle HTTP-SMTP
const versionAPI = '0.0.2';

// Interface pour typer le corps de la requête
interface EmailRequestBody {
    from: string;
    to: string;
    subject: string;
    text: string;
}

// Chargement de la configuration en fonction de l'environnement
const environment = process.env['NODE_ENV'] || 'dev';
const config = require(`./environments/environment.${environment}.json`);
console.log(`L'environnement actuel est : ${environment}`);

const app = express();

// Middleware pour parser les requêtes JSON
// app.use(bodyParser.json());
app.use(express.json());

// Middleware de logs amélioré
app.use((req: Request, res: Response, next) => {
    const now = new Date().toISOString(); // Date et heure actuelle
    const method = req.method; // Méthode HTTP (GET, POST, etc.)
    const url = req.url; // URL demandée
    const subject = req.body?.subject || "N/A"; // Sujet (si disponible)
    const bodyContent = req.body?.text || "N/A"; // Corps du message (si disponible)

    // Log détaillé avec le corps du message
    console.log(`[${now}] ${method} ${url} | Sujet : ${subject} | Corps : ${bodyContent}`);
    next(); // Passe à l'étape suivante
});


// Middleware global pour définir l'encodage UTF-8
app.use((req: Request, res: Response, next) => {
    res.setHeader('Content-Type', config.server.contentType || 'application/json; charset=UTF-8');
    next();
});


// Route principale pour envoyer des emails
app.post(
    config.api.sendEmailEndpoint,
    async (req: Request, res: Response) => {
        const { from, to, subject, text } = req.body;

        // Validation des données en entrée
        if (!from || !to || !subject || !text || from.trim() === '' || to.trim() === '' || subject.trim() === '' || text.trim() === '') {
            console.error(`[ERREUR] Champs invalides : De=${from}, À=${to}, Sujet=${subject}, Contenu=${text}`);

            res.status(400).json({
                success: false,
                message: `[ERREUR] : ${config.messages.invalidRequest}`
            });

            console.log(`Content-Type envoyé : ${res.getHeader('Content-Type')}`);
            console.log(`Corps de la réponse : ${JSON.stringify({
                success: false,
                message: `[ERREUR] : ${config.messages.invalidRequest}`
            })}`);


            return; // Arrête l'exécution pour éviter de passer au bloc try {}
        }

        try {
            // Log des champs reçus
            console.log(`[DEBUG] Champs reçus : De=${from}, À=${to}, Sujet=${subject}, Contenu=${text}`);

            // Configuration du transporteur SMTP
            const transporter = nodemailer.createTransport({
                host: config.smtp.host,
                port: config.smtp.port,
                secure: config.smtp.secure
            });

            // Envoi de l'email
            await transporter.sendMail({ from, to, subject, text });
            res.status(200).json({ success: true, message: config.messages.emailSuccess });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : config.messages.unknownError;
            console.error(`[ERREUR] Envoi échoué : ${errorMessage}`);
            res.status(500).json({
                success: false,
                error: `Erreur serveur : ${errorMessage}`
            });
        }
    });

// Lancement du serveur
app.listen(config.server.port, () => {
    console.log(`Versions API : ${versionAPI} | Env : ${config.versionEnv} || API en écoute sur http://localhost:${config.server.port}`);
});
