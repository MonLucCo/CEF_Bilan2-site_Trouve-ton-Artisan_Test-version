import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

// Version du serveur de passerelle HTTP-SMTP
// v0.0.1 : version initiale minimal (status 200 et 500) et vEnv0.0.1
// v0.0.2 : version avec logs et status (200, 400 et 500) et vEnv0.0.1
// v0.0.3 : version avec cors et vEnv0.0.2
// v0.0.4 : version avec routes (messages historisés) et vEnv0.0.3
// v0.0.5 : version avec id unique (uuid) et vEnv0.0.3
const versionAPI = '0.0.5';

// Interface pour typer le corps de la requête
interface EmailRequestBody {
    from: string;
    to: string;
    subject: string;
    text: string;
}

// Chargement de la configuration en fonction de l'environnement
let config; // Déclarer la variable en dehors du bloc try...catch
let messages: Array<any> = [];

try {
    // Charger la configuration en fonction de l'environnement
    const environment = process.env['NODE_ENV'] || 'dev';
    config = require(`./environments/back-end/environment.${environment}.json`);
    console.log(`[server] : L'environnement actuel est : ${environment}`);

    // Initialisation des messages en fonction de configTest

    if (config.testCases.configTest) {
        console.log("[server] : [DEBUG] : Chargement des messages à partir des cas de test.");
        messages = config.testCases.messagesHistory;
    } else {
        console.log("[server] : [DEBUG] : Aucun cas de test configuré. Initialisation des messages vides.");
        messages = [];
    }
} catch (error) {
    console.error(`[server] : [ERREUR] : Impossible de charger le fichier de configuration pour l'environnement spécifié (${process.env['NODE_ENV'] || 'dev'}). Détail : `, error);
    process.exit(1); // Terminer le processus en cas d'erreur critique
}

// Identifiant unique
const { v4: uuidv4 } = require('uuid');

// Application serveur
const app = express();

// Middleware CORS : autorise les requêtes provenant d'origines différentes (CROS : Cross-Origin-Ressource-Sharing)
// Cela permet au frontend Angular (http://localhost:4200) de communiquer avec le backend (http://localhost:3000)
app.use(cors({
    origin: config.cors?.origin || '*', // Autorise les requêtes depuis cette origine (ou toutes les origines par défaut)
    methods: config.cors?.methods || ['GET', 'POST', 'DELETE'], // Méthodes HTTP autorisées (ou méthodes par défaut)
    allowedHeaders: config.cors?.allowedHeaders || ['Content-Type', 'Authorization'] // En-têtes HTTP autorisés (ou en-têtes par défaut)
}));

// Middleware pour parser les requêtes JSON
// app.use(bodyParser.json());
app.use(express.json());

// Importer les routes 
const statusRoutes = require('./backend/routes/statusRoutes')(config); // pour gérer les status
const messageRoutes = require('./backend/routes/messageRoutes')(messages); // pour gérer les messages

// Utiliser les routes
app.use(config.api.sendMessagesEndpoint, messageRoutes);
app.use(config.api.sendStatusEndpoint.statusRoute, statusRoutes);

// Middleware de logs amélioré
app.use((req: Request, res: Response, next) => {
    const now = new Date().toISOString(); // Date et heure actuelle
    const method = req.method; // Méthode HTTP (GET, POST, etc.)
    const url = req.url; // URL demandée
    const subject = req.body?.subject || "N/A"; // Sujet (si disponible)
    const bodyContent = req.body?.text || "N/A"; // Corps du message (si disponible)

    // Log détaillé avec le corps du message
    console.log(`[server] : [DEBUG] : [${now}] ${method} ${url} | Sujet : ${subject} | Corps : ${bodyContent}`);
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

        // Validation de l'existence des données en entrée de requête
        if (!from || !to || !subject || !text || from.trim() === '' || to.trim() === '' || subject.trim() === '' || text.trim() === '') {
            console.error(`[server] : [ERREUR] : Champs invalides : De=${from}, À=${to}, Sujet=${subject}, Contenu=${text}`);

            res.status(400).json({
                success: false,
                message: `[ERREUR] : ${config.messages.invalidRequest}`
            });

            console.log(`[server] : [POST] : Content-Type envoyé : ${res.getHeader('Content-Type')}`);
            console.log(`[server] : [POST] : Corps de la réponse : ${JSON.stringify({
                success: false,
                message: `[ERREUR] : ${config.messages.invalidRequest}`
            })}`);

            return // Arrête l'exécution pour éviter de passer au bloc try {}
        }

        try {
            // Log des champs reçus
            console.log(`[server] : [DEBUG] : Champs reçus : De=${from}, À=${to}, Sujet=${subject}, Contenu=${text}`);

            // Configuration du transporteur SMTP
            const transporter = nodemailer.createTransport({
                host: config.smtp.host,
                port: config.smtp.port,
                secure: config.smtp.secure
            });

            // Envoi de l'email
            await transporter.sendMail({ from, to, subject, text });

            // Ajouter à l'historique
            const newMessage = {
                id: uuidv4(), // Génère un identifiant unique
                from,
                to,
                subject,
                body: text,
                date: new Date().toISOString()
            };
            messages.push(newMessage);
            console.log("[server] : [POST] : Ajout du message : ", newMessage);
            console.log("[server] : [POST] : Nombre de messqges historisés : ", messages.length);


            res.status(200).json({
                success: true,
                message: config.messages.emailSuccess,
                data: newMessage
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : config.messages.unknownError;
            console.error(`[server] : [ERREUR] : Envoi échoué : ${errorMessage}`);
            res.status(500).json({
                success: false,
                error: `Erreur serveur : ${errorMessage}`
            });
        }
    });

// Middleware global pour la gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(`[server] : [ERREUR GLOBALE] : ${err.message}`);
    console.error(`[server] : [TRACE] : `, err.stack);

    res.status(500).json({
        success: false,
        message: 'Une erreur interne est survenue. Veuillez réessayer plus tard.',
        error: err.message
    });
});

// Lancement du serveur
app.listen(config.server.port, () => {
    console.log(`[server] : Versions API : ${versionAPI} | Env : ${config.versionEnv} || API en écoute sur http://localhost:${config.server.port}`);
    console.log("[server] : Endpoint Mailer : ", config.api.sendEmailEndpoint);
    console.log("[server] : Endpoint Messages : ", config.api.sendMessagesEndpoint);
    console.log("[server] : Endpoint Stqtus : ", config.api.sendStatusEndpoint.statusRoute);
    console.log("[server] : Nombre de messages historisés : ", messages.length);
});
