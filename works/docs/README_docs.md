# Documentation du projet d'étude "Trouve Ton Artisan" (TTA)

---

- [Documentation du projet d'étude "Trouve Ton Artisan" (TTA)](#documentation-du-projet-détude-trouve-ton-artisan-tta)
  - [Version](#version)
  - [Contenu du dossier](#contenu-du-dossier)
  - [Diagramme de la structure documentaire - Synthèse graphique](#diagramme-de-la-structure-documentaire---synthèse-graphique)

---

## Version

v1.0.6

---

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
   - objectifs et **implémentation initiale** du [SEO Dynamique et Schémas de référencement](./implementation-docs/seo-schema-injection-dynamique.md)
   - objectifs et **implémentation finale** du [SEO Statique par un Service SEO](./implementation-docs/seo-schema-injection-statique.md)
   - objectifs et implémentation de [Bootstrap et Font Awesome](./implementation-docs/boostrap-fontAwesome-integrationFromCDN.md)
   - intégration et [customisation de Bootstrap](./implementation-docs/customisation-bootstrap.md)
   - [personnalisation centralisée et optimisée des styles](./implementation-docs/styles-personnalise-bootstrap-fontAwesome.md)
   - [Amélioration Accessibilité avec LightHouse](./implementation-docs/accessibility-lighthouse.md)
   - [Amélioration Performance avec LightHouse](./implementation-docs/performance-lighthouse.md)
   - [Hébergement Alwaysdata et version de Production](./implementation-docs/alwaysdata-deploiement.md)
   - [Validation du projet `tta_angular`](./implementation-docs/validation-projet-tta_angular.md)

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
├── implementation-docs/    -----------------------------> # Réalisation et implémentation technique
│   ├── email-gateway-http-smtp.md    -------------------> # Détails techniques de la passerelle HTTP-SMTP
│   ├── seo-schema-injection-dynamique.md    ------------> # Détails de l'intégration intiale du SEO (**dynamique** et schémas de référencement)
│   ├── seo-schema-injection-statique.md    -------------> # Détails de l'intégration finale du SEO (**statique** et schémas de référencement par un service SEO)
│   ├── bootstrap-fontAwesome-integrationFromCDN.md    --> # Détails de l'intégration de Bootstrap par **CDN**
│   ├── customisation-bootstrap.md    -------------------> # Détails de l'intégration de l'identitié du projet dans Bootstrap
│   ├── styles-personnalise-bootstrap-fontAwesome.md    -> # Détails de la personnalisation des styles du projet
│   ├── accessibilty-lighthouse.md    -------------------> # Détails de l'amélioration de l'accessibilité avec LightHouse
│   ├── performance-lighthouse.md    --------------------> # Détails de l'amélioration de la performance avec LightHouse
│   ├── alwaysdata-deploiement.md    --------------------> # Détails de l'hébergement et de la version de production
│   ├── validation-projet-tta_angular.md    -------------> # Détails du suivi de validation et de correction du projet `tta_angular`
```

---

**============>>>   Indiquer les différents documents...**

---
