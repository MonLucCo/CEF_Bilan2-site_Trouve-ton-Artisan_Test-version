# Définir des constantes pour les valeurs par défaut
$DEFAULT_EMAIL_FROM = "test@example.com"
$DEFAULT_EMAIL_TO = "recipient@example.com"
$DEFAULT_SUBJECT = "Test MailDev via SMTP"
$DEFAULT_BODY = "Ceci est un email envoyé via MailDev et PowerShell."
$DEFAULT_DELAY = 3
$DEFAULT_MAX_RETRIES = 5
$DEFAULT_RETRY_DELAY = 2

# Définition des fonctions =============

# Fonction pour valider un sujet ou un texte
function Valider-Texte {
    param (
        [string]$texte
    )
    # Supprimer les espaces avant et après
    $texte = $texte.Trim()

    # Vérifier si le texte est vide après suppression des espaces
    if (-not $texte) {
        Write-Host "Le texte ne peut pas être vide ou constitué uniquement d'espaces." -ForegroundColor Red
        return $false
    }
    # Vérifier la longueur maximale (par exemple, 100 caractères)
    elseif ($texte.Length -gt 100) {
        Write-Host "Le texte est trop long. Veuillez limiter à 100 caractères." -ForegroundColor Red
        return $false
    }
    # Si toutes les validations passent
    return $true
}

# Fonction pour valider les adresses email
function Valider-Email {
    param (
        [string]$email
    )
    # Expression régulière pour valider une adresse email
    $emailRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if ($email -match $emailRegex) {
        return $true # Adresse email valide
    } else {
        return $false # Adresse email invalide
    }
}

# Fonction pour attendre MailDev après lancement
function Attendre-MailDev {
    param (
        [int]$maxRetries = $DEFAULT_MAX_RETRIES,  # Nombre maximum de tentatives
        [int]$delay = $DEFAULT_RETRY_DELAY        # Délai entre chaque tentative en secondes
    )

    for ($i = 1; $i -le $maxRetries; $i++) {
        Write-Host "Vérification de MailDev... Tentative $i/$maxRetries" -ForegroundColor Cyan
        if ((Test-MailDev) -eq 0) {
            Write-Host "MailDev est maintenant actif sur le port 1080." -ForegroundColor Green
            return $true
        }
        Start-Sleep -Seconds $delay
    }

    Write-Host "MailDev n'a pas démarré après $maxRetries tentatives." -ForegroundColor Red
    return $false
}

# Fonction pour vérifier l'état de MailDev
function Test-MailDev {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:1080" -UseBasicParsing -TimeoutSec 2
        if ($response.Content -match '<title>MailDev') {
            Write-Host "MailDev est actif sur le port 1080." -ForegroundColor Green
            return 0
        } else {
            Write-Host "Le port 1080 est utilisé, mais ce n'est pas MailDev." -ForegroundColor Yellow
            return -1
        }
    }
    catch {
        Write-Host "Le port 1080 est libre ou aucun service n'y répond." -ForegroundColor Red
        return 1
    }
}

# Fonction pour définir le délai d'attente à l'ouverture de MailDev
function Delai-Ouverture-Navigateur-MailDev {
    do {
        $startupDelay = Read-Host "Entrez le délai avant d'ouvrir le navigateur (en secondes) [Défaut : $DEFAULT_DELAY]"
        if (-not $startupDelay) { $startupDelay = $DEFAULT_DELAY }
        if ($startupDelay -as [int] -and $startupDelay -ge 0) { break }
        Write-Host "Veuillez entrer une valeur numérique valide (ex. : $DEFAULT_DELAY)." -ForegroundColor Yellow
    } while ($true)
    return $startupDelay
}

# Script ==================

# 1. Lancer MailDev et ouvrir automatiquement le navigateur

# Vérification de MailDev
$testResult = Test-MailDev
switch ($testResult) {
    0 {
        Write-Host "Passage à l'étape suivante : préparation du message" -ForegroundColor Green
    }
    -1 {
        Write-Host "Le port 1080 est occupé par un autre service. Arrêt du script." -ForegroundColor Red
        exit 1
    }
    1 {
        Write-Host "MailDev n'est pas actif. Configuration du lancement du navigateur." -ForegroundColor Yellow
        $startupDelay = Delai-Ouverture-Navigateur-MailDev
        Write-Host "MailDev n'est pas actif. Tentative de lancement de MailDev..." -ForegroundColor Yellow
        Start-Process "cmd.exe" -ArgumentList "/k maildev"
        if (-not (Attendre-MailDev)) {
            Write-Host "Impossible de démarrer MailDev. Arrêt du script." -ForegroundColor Red
            exit 1
        }
        Start-Sleep -Seconds $startupDelay
        Start-Process "http://localhost:1080"
    }
}

# Saisir et valider l'adresse email de l'expéditeur
do {
    $from = Read-Host "Entrez l'adresse email de l'expéditeur [Défaut : $DEFAULT_EMAIL_FROM]"
    if (-not $from) { $from = $DEFAULT_EMAIL_FROM }
    if (Valider-Email -email $from) { break }
    Write-Host "Adresse email invalide. Veuillez entrer une adresse valide." -ForegroundColor Red
} while ($true)

# Saisir et valider l'adresse email du destinataire
do {
    $to = Read-Host "Entrez l'adresse email du destinataire [Défaut : $DEFAULT_EMAIL_TO]"
    if (-not $to) { $to = $DEFAULT_EMAIL_TO }
    if (Valider-Email -email $to) { break }
    Write-Host "Adresse email invalide. Veuillez entrer une adresse valide." -ForegroundColor Red
} while ($true)

# Saisir et valider le sujet de l'email
do {
    $subject = Read-Host "Entrez le sujet de l'email [Défaut : $DEFAULT_SUBJECT]"
    if (-not $subject) { $subject = $DEFAULT_SUBJECT }
    if (Valider-Texte -texte $subject) { break }
} while ($true)

# Saisir et valider le message de l'email
do {
    $body = Read-Host "Entrez le contenu de l'email [Défaut : $DEFAULT_BODY]"
    if (-not $body) { $body = $DEFAULT_BODY }
    if (Valider-Texte -texte $body) { break }
} while ($true)

# Envoyer l'email
Write-Host "Envoi d'un email de test via MailDev..."
Send-MailMessage -From $from `
                 -To $to `
                 -Subject $subject `
                 -Body $body `
                 -SmtpServer "localhost" `
                 -Port 1025

Write-Host "Email envoyé avec succès ! Vérifiez l'interface MailDev pour le message."
