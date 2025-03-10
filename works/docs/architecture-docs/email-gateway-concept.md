# Passerelle HTTP-SMTP : Concept et Justification

## Introduction

Ce document présente le concept et la justification de la passerelle HTTP-SMTP utilisée dans le projet. Cette passerelle, réalisée avec l'application `email-api_angular`, permet de résoudre l'incompatibilité entre les protocoles HTTP (utilisé par le front-end Angular) et SMTP (nécessaire pour l'envoi d'emails via MailDev).

L'objectif de ce document est de définir le rôle de cette passerelle dans l'architecture globale et de justifier son importance.

---

## Problématique

### Contexte

Dans le cadre du projet, l'application front-end `tta_angular` utilise des requêtes HTTP pour transmettre des données. En parallèle, MailDev, un outil de test d'emails, fonctionne avec le protocole SMTP. Ces deux protocoles ne sont pas compatibles pour un échange direct.

Cette incompatibilité est détaillée dans le document d'analyse [intégration du service email et MailDev](Analyse-intégration-service-email-et-mailddev.md).

La passerelle HTTP-SMTP est présenté en deux documents selon le schéma documentaire suivant :

``` plaintext
Conceptuel (architecture-docs)         Implémentation (implementation-docs)
 ┌─────────────────────────────┐       ┌─────────────────────────────────────┐
 │ email-gateway-concept.md    │─────► │ email-gateway-http-smtp.md          │
 │ ┌─────────────────────────┐ │       │ ┌─────────────────────────────────┐ │
 │ │ Analyse du besoin       │ │       │ │ Étapes techniques               │ │
 │ │ Rôle de la passerelle   │ │       │ │ Commandes détaillées            │ │
 │ │ Justification           │ │       │ │ Tests et validations            │ │
 │ └─────────────────────────┘ │       │ └─────────────────────────────────┘ │
 └─────────────────────────────┘       └─────────────────────────────────────┘
```

### Contraintes

- L'utilisation de MailDev est imposée comme serveur SMTP pour la capture des emails.
- Les communications front-end (HTTP) doivent être traduites en commandes SMTP.
- La solution développée doit mettre en avant des "principes de qualité et de sécurisation des clients web".
- La solution doit rester simple à maintenir et évolutive.

## Rôle de la passerelle HTTP-SMTP

La passerelle, implémentée sous la forme de l'application `email-api_angular`, joue les rôles suivants :

1. **Intermédiaire protocolaire** :
   - Reçoit les données du front-end via HTTP.
   - Convertit ces données en commandes SMTP.
   - Transmet les emails à MailDev.

2. **Séparation des responsabilités** :
   - Le front-end reste dédié à l'expérience utilisateur et à la collecte de données.
   - La logique liée à l'envoi d'emails est isolée dans une application spécifique.

3. **Compatibilité et flexibilité** :
   - Prépare l'architecture pour une transition facile vers un serveur SMTP réel (ex. SendGrid, Postfix) si nécessaire.

## Diagramme de haut niveau

Un diagramme détaillant les interactions est fourni dans le document d'implémentation de la [passerrelle HTTP-SMTP](../implementation-docs/email-gateway-http-smtp.md).

---

## Ressources complémentaires

Pour en savoir plus sur les concepts abordés dans ce document, consultez les ressources suivantes :

- **Documentation Express.js** : [https://expressjs.com/](https://expressjs.com/)  
  Guide officiel pour configurer un serveur HTTP avec Express.js.
- **Documentation Nodemailer** : [https://nodemailer.com/](https://nodemailer.com/)  
  Référence complète pour l'envoi d'emails via le protocole SMTP.
- **Tutoriel sur MailDev** : [https://maildev.github.io/](https://maildev.github.io/)  
  Explication détaillée de l'installation et de l'utilisation de MailDev pour capturer des emails.
- **Blog éducatif sur les API** : [Les meilleures plateformes éducatives](https://classeurdecole.fr/meilleures-plateformes-ressources-educatives-gratuites/)  
  Une introduction aux API et à leur rôle dans les architectures modernes.
- **Tutoriel sur les passerelles HTTP-SMTP** : [Top 5 des ressources éducatives](https://info-etudes.fr/actualites-educatives/5-sites-incontournables-pour-des-ressources-educatives-de-qualite/)  
  Une ressource pratique pour comprendre les passerelles entre différents protocoles.

---
