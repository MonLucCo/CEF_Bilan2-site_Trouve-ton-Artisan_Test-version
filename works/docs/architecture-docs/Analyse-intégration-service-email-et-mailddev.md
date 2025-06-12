# Analyse technique : Service Email et MailDev

---

- [Analyse technique : Service Email et MailDev](#analyse-technique--service-email-et-maildev)
  - [Version](#version)
  - [1. Constat initial](#1-constat-initial)
  - [2. Présentation des solutions envisagées](#2-présentation-des-solutions-envisagées)
    - [Solution 1 : Utilisation d’une bibliothèque SMTP directement dans Angular](#solution-1--utilisation-dune-bibliothèque-smtp-directement-dans-angular)
    - [Solution 2 : Utilisation d’une API tierce (HTTP)](#solution-2--utilisation-dune-api-tierce-http)
    - [Solution 3 : Développement d’une application intermédiaire (back-end)](#solution-3--développement-dune-application-intermédiaire-back-end)
  - [3. Solution retenue](#3-solution-retenue)
  - [4. Conclusion](#4-conclusion)

---

## Version

v1.0.6

---

## 1. Constat initial

Le projet impose l'utilisation de MailDev comme serveur SMTP pour la validation des emails. Cependant, le `EmailService` de l'application est conçu pour envoyer des données en HTTP, car cette méthode est nativement intégrée dans Angular via `HttpClient` et offre une communication sécurisée grâce au protocole HTTPS. Cela crée une **incompatibilité directe entre HTTP (utilisé par le service Email) et SMTP (nécessaire pour MailDev).**

En résumé :

- **HTTP** : Utilisé par le front-end pour des communications sécurisées via des APIs REST.
- **SMTP** : Protocole standard d'envoi d'emails, requis par MailDev ou tout autre serveur de messagerie.
- **Problème** : Le service ne peut pas communiquer directement avec MailDev sans un intermédiaire pour convertir les requêtes HTTP en commandes SMTP.

Remarque :

- Ce problème n'est pas lié à l'emploi du framework Angular pour développer le projet.
- Le problème rencontré aurait été similaire avec React, car il est lié aux protocoles de messagerie (SMTP/HTTP) et non au framework.

---

## 2. Présentation des solutions envisagées

Plusieurs approches ont été examinées pour résoudre cette incompatibilité en tenant compte des contraintes techniques (sécurité, React ou Angular, MailDev) et du cadre du projet (étude front-end,  hébergement) :

### Solution 1 : Utilisation d’une bibliothèque SMTP directement dans Angular

- **Description** : Intégration de la bibliothèque `smtp.js` dans le front-end pour établir une connexion directe avec MailDev en utilisant le protocole SMTP.
- **Avantages** :
  - Simplicité d’implémentation : aucune autre application n’est nécessaire.
  - Fonctionnement direct avec MailDev sans intermédiaire.
- **Inconvénients** :
  - **Manque de sécurité** : Les informations SMTP (comme les identifiants, même s'ils ne sont pas nécessaires pour MailDev) sont exposées dans le code du front-end.
  - Peu évolutif : Pas adapté à une mise en production ni à un environnement sécurisé.
  - Complexité pour maintenir une communication SMTP dans le navigateur.

### Solution 2 : Utilisation d’une API tierce (HTTP)

- **Description** : Le front-end envoie une requête HTTP vers une API tierce, comme SendGrid ou Mailgun, qui se charge de convertir la requête en SMTP et d’envoyer les emails.
- **Avantages** :
  - Pas besoin d’un serveur intermédiaire : L’API tierce gère l’envoi des emails.
  - Simplicité d’intégration avec HTTP (nativement pris en charge par Angular).
  - Méthode sécurisée et robuste, adaptée à une mise en production.
- **Inconvénients** :
  - **Exposition de la clé API** : En l’absence de back-end, la clé API est visible dans le front-end, créant des vulnérabilités potentielles.
  - Dépendance à un service externe : Nécessité d’un abonnement pour des usages intensifs (potentiellement coûteux).
  - Non pertinent pour ce projet, car le serveur MailDev est imposé et ne peut pas être remplacé.

### Solution 3 : Développement d’une application intermédiaire (back-end)

- **Description** : Développer un back-end qui reçoit les requêtes HTTP du front-end, les traite et envoie les emails à MailDev via SMTP.
- **Avantages** :
  - **Réaliste et extensible** : Simule une architecture professionnelle où le front-end délègue l’envoi au back-end.
  - **Sécurité renforcée** : Les informations SMTP ne sont pas exposées dans le front-end, elles sont gérées uniquement côté serveur.
  - Compatible à la fois avec MailDev (en dev) et des serveurs SMTP réels (en production).
  - Permet de centraliser d’autres logiques liées à l’envoi d’emails (logs, validation, etc.).
- **Inconvénients** :
  - Nécessite un développement supplémentaire pour créer et déployer l’application intermédiaire.
  - Introduit une couche de complexité par rapport à une solution directe.

---

## 3. Solution retenue

La **Solution 3** a été retenue comme étant la plus adaptée pour ce projet, car elle répond à la fois aux contraintes techniques (incompatibilité HTTP/SMTP) et aux objectifs pédagogiques (étude front-end, hébergement, sécurité, React ou Angular et MailDev) :

- **Architecture finale** :
  - **Application front-end (Angular)** :
    - Gère l’interface utilisateur et envoie les données du formulaire de contact en HTTP vers le back-end.
    - Endpoint utilisé en local : `http://localhost:<port-backend>/api/send-email`.
  - **Application back-end** :
    - Reçoit les données via HTTP.
    - Convertit les données en commandes SMTP et les transmet à MailDev.
    - Communique avec MailDev sur le port SMTP (1025).
  - **MailDev** :
    - Simule la réception des emails envoyés.
    - Permet de visualiser les messages via l’interface web sur le port 1080.
- **Fonctionnement** :
  - En développement local, toutes les applications (front-end, back-end, MailDev) fonctionnent sur localhost avec des ports différents.
  - En hébergement, chaque application est déployée dans des sous-domaines spécifiques (ex. : `front.monsite.com`, `api.monsite.com`, `maildev.monsite.com`).

- **Pourquoi cette solution ?**
  - Elle garantit une séparation des responsabilités entre le front-end et l’envoi d’emails.
  - Elle respecte les bonnes pratiques en matière de sécurité en isolant les informations SMTP dans le back-end.
  - Elle est adaptée aux environnements de développement et d’hébergement.
  - Elle prépare le projet pour une éventuelle transition vers un serveur SMTP réel en production.

---

## 4. Conclusion

Cette architecture répond pleinement aux contraintes et objectifs du projet. Elle introduit une séparation claire entre les responsabilités, respecte les bonnes pratiques professionnelles et facilite l’intégration de MailDev comme outil de validation. Cette solution reste simple à déployer pour un sujet d’étude tout en simulant des cas d’usage réalistes et adaptables à un futur environnement de production.

La technologie de développement de l'application **back-end** est Angular. Ce choix est présenté dans l'analyse technologique [choix-application-api-http-smtp](./choix-technologie-application-api-http-smtp.md)

---
