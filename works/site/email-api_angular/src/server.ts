import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
app.use(bodyParser.json());

app.post('/api/send-email', async (req: Request, res: Response) => {
    const { from, to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'localhost', // Adresse du serveur SMTP (ici MailDev)
        port: 1025,        // Port SMTP de MailDev
        secure: false      // Pas de TLS pour MailDev
    });

    try {
        await transporter.sendMail({ from, to, subject, text });
        res.status(200).send({ success: true });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ success: false, error: error.message });
        } else {
            res.status(500).send({ success: false, error: 'Une erreur inconnue est survenue.' });
        }
    }
});

const PORT = 3000; // Définit le port du serveur
app.listen(PORT, () => {
    console.log(`API en écoute sur http://localhost:${PORT}`);
});
