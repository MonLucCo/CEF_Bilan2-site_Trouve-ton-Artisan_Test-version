# Choix technologie de développement - application API HTTP-SMTP

## **Rôle de l'application API HTTP-SMTP**

L'application (la seconde) jouera le rôle d’une API back-end intermédiaire. Elle recevra les données en HTTP du front-end (l'application principale) et enverra ensuite les emails via SMTP à MailDev.

---

## **Cas d’Angular pour la seconde application**

1. **Avantages** :
   - Angular est un framework robuste avec une structure intégrée.
   - Développement familiarisé avec Angular, cela facilite le  (développement et partage des bonnes pratiques avec l'application principale.
   - Utilisation native de **HttpClient** pour gérer les requêtes entrantes (HTTP depuis l'application principale).
   - Intégration possible avec des bibliothèques tierces pour gérer le SMTP (exemple : `smtp.js`).

2. **Inconvénients** :
   - Angular est principalement conçu pour des interfaces utilisateur riches (SPA). Son utilisation pour un rôle back-end peut être lourde et moins adaptée par rapport à d’autres technologies comme Node.js.

---

## **Cas de React pour la seconde application**

1. **Avantages** :
   - React étant léger et centré sur la modularité, il peut être utilisé pour cette tâche.
   - React est facile à intégrer avec des librairies SMTP pour gérer les emails (ex. : `emailjs` ou `smtp.js`).

2. **Inconvénients** :
   - Comme Angular, React est conçu pour des interfaces front-end. Cette approche est limite pour une application d’échange HTTP/SMTP sans interface utilisateur.
   - La gestion des requêtes HTTP entrantes et sortantes nécessitera des ajustements via une intégration avec des outils dédiés (ex. : `fetch`).

---

## **Alternative technologique pour la seconde application**

1. **Technologie alternative pour le rôle back-end** :
   - Pour un back-end classique, **Node.js** serait mieux adapté. Avec Node.js, l'utilisation  des bibliothèques comme **Express** pour gérer les requêtes HTTP et **Nodemailer** pour les emails via SMTP est grandement facilitée.

   - Voici un exemple rapide d'implémentation avec Node.js :
  
     ``` javascript
     const express = require('express');
     const nodemailer = require('nodemailer');
     const app = express();

     app.use(express.json());

     const transporter = nodemailer.createTransport({
       host: 'localhost',
       port: 1025, // MailDev SMTP
       secure: false
     });

     app.post('/api/send-email', async (req, res) => {
       try {
         const { from, to, subject, text } = req.body;
         await transporter.sendMail({ from, to, subject, text });
         res.status(200).send({ success: true });
       } catch (error) {
         res.status(500).send({ success: false, error: error.message });
       }
     });

     app.listen(3000, () => console.log('Back-end en écoute sur le port 3000'));
     ```

1. **Développement en Angular ou React car imposé** :
   - Pour respecter la contrainte Angular/React, Angular pourrait offrir un environnement plus structuré pour gérer les tâches du back-end.
   - React, bien qu’il soit possible de l’utiliser, demanderait des ajustements importants car il est encore plus orienté interface utilisateur qu’Angular.

---

### **Conclusion**

La contrainte de l'étude impose Angular ou React. Ainsi **Angular** est choisi pour sa structure plus rigoureuse et la possibilité de réutiliser des pratiques déjà appliquées dans l'application principale.
Cependant, dans un contexte professionnel, un back-end avec **Node.js** ou d’autres frameworks back-end plus adaptés serait le choix optimal.
