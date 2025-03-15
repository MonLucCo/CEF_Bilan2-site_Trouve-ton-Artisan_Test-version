# Documentation du projet d'étude "Trouve Ton Artisan" (TTA)

## Contenu du dossier

Le dossier `/works/docs` contient les dossiers et documents des travaux menés pendant le projet.

1. Pour l'**analyse de la technologie** choisie, dans le dossier `/works/docs/process-docs` se trouve les documents :

   - rédaction synthétique [choix-technos-site : synthèse](./process-docs/Choix-technos-site-synthèse.md).
   - rédaction complète [choix-technos-site : développée](./process-docs/choix-technos-site.md).

2. Pour l'**analyse d'architecture** de l'intégration du service Email et de MailDev :

   - synthèse de l'analyse [synthèse de l'étude d'architecture](./architecture-docs/synthèse-protocoles-integration-maildev.md).
   - analyse d'architecture [analyse-intégration-service-email-maildev](./architecture-docs/analyse-intégration-service-email-et-mailddev.md).
   - choix technologique de développement [choix-application-api-http-smtp](./architecture-docs/choix-technologie-application-api-http-smtp.md).
   - analyse technique de la [passerelle HTTP-SMTP](./architecture-docs/email-gateway-concept.md).

3. Pour l'**implémentation technique** de l'application de la passerelle HTTP-SMTP :

   - étapes pratiques d'implémentation de l'[application de passerelle (Email API)](./implementation-docs/email-gateway-http-smtp.md)

## Diagramme de la structure documentaire - Synthèse graphique

``` plaintext
/docs
├── process-docs/  -------------------> # Analyse des processus et choix technologiques
│   ├── choix-techno-site-synthèse.md    -------> # Résumé des choix technologiques
│   ├── choix-techno-site.md    ----------------> # Étude complète comparative des frameworks
│
├── architecture-docs/ ---------------> # Analyse conceptuelle et architecture
│   ├── synthèse-protocoles-integration-maildev.md    ------> # Synthèse de l'analyse d'architecture du service email
│   ├── analyse-intégration-service-email-et-maildev.md    --> # Analyse d'architecture de la passerelle HTTP-SMTP
│   ├── choix-technologique-application-api-http-smtp.md    -> # Choix technologique de la passerelle HTTP-SMTP
│   ├── email-gateway-concept.md    -------------------------> # Concept et justification de la passerelle HTTP-SMTP
│
├── implementation-docs/    ------------> # Réalisation et implémentation technique
│   ├── email-gateway-http-smtp.md    --> # Détails techniques de la passerelle HTTP-SMTP
```

---

**============>>>   Indiquer les différents documents...**

---
