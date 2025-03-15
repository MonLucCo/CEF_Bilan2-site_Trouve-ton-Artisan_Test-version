# Analyse technique : Intégration protocole d'échanges du service Email avec MailDev

## Contexte

Ce document analyse la problématique et les solutions envisagées pour intégrer un service Email dans le projet, en tenant compte des contraintes imposées :

- Le service Email natif utilise des requêtes HTTP sécurisées.
- Le serveur MailDev, imposé comme outil de validation, utilise le protocole SMTP.

## Problème

HTTP et SMTP sont des protocoles incompatibles pour des échanges directs, ce qui nécessite une solution intermédiaire ou alternative.

## Analyse des solutions

1. Utilisation d’une bibliothèque SMTP dans le front-end (Angular).
2. Appel à une API tierce pour envoyer des emails.
3. Développement d’un back-end pour transformer les requêtes HTTP en SMTP.

## Solution retenue

Front-end → Back-end → MailDev. Cette approche garantit la conformité aux contraintes tout en reflétant une architecture professionnelle.
