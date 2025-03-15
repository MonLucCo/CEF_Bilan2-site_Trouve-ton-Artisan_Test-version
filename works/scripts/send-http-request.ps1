# Données du message HTTP
$body = @{
    to = "recipient@example.com"  # Destinataire (ex : recipient@example.com)
    from = "sender@example.com"  # Expéditeur (ex : sender@example.com)
    subject = "Test MailDev (4)"     # Sujet de l'email (ex : Test MailDev)
    text = "Bonjour, ceci est un message de test envoyé au backend !" # Corps de l'email (ex : Bonjour, ceci est un message de test envoyé au backend !)
}

# Conversion des données en JSON
$jsonBody = $body | ConvertTo-Json -Depth 10 -Compress

# Vérification contenu à envoyer
Write-Host "Contenu JSON envoyé : $jsonBody"

try {
    # Envoi de la requête HTTP POST avec Invoke-WeRestMethod
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/send-email" -Method Post -Body $jsonBody -ContentType "application/json"
    Write-Host "Passage : traitement nominal"
    # Affiche la réponse du backend si succès
    Write-Host "Statut HTTP : $($response.StatusCode) (Success)"
    Write-Host "Réponse du serveur : $($response.message)"
} catch {
    ## Capture des erreurs renvoyées par le backend
    if ($_.Exception.Response -ne $null) {
        # Erreurs retournées par le serveur (avec une réponse HTTP)
        Write-Host "Passage : traitement d'erreur. Existence d'une réponse HTTP"
        $responseContent = $_.Exception.Response.Content
        $statusCode = $_.Exception.Response.StatusCode

        # Cas spécifiques selon le statut HTTP
        # Tenter de convertir en JSON, ou afficher directement le contenu brut
        try {
            $errorResponse = $responseContent | ConvertFrom-Json
            # Cas spécifiques selon le statut HTTP
            if ($statusCode -eq 400) {
                Write-Host "Statut HTTP : 400 (Bad Request)"
                Write-Host "Erreur du serveur : $($errorResponse.message)"
            } elseif ($statusCode -eq 500) {
                Write-Host "Statut HTTP : 500 (Internal Server Error)"
                Write-Host "Erreur du serveur : $($errorResponse.error)"
            } else {
                Write-Host "Statut HTTP : $statusCode (Unexpected)"
                Write-Host "Erreur du serveur : $($errorResponse)"
            }
        } catch {
            # Contenu non-JSON détecté
            Write-Host "Statut HTTP : $statusCode"
            Write-Host "Réponse brute du serveur : $responseContent"
        }
    } elseif ($_.Exception.InnerException -is [System.Net.Sockets.SocketException]) {
        # Erreur réseau (par exemple, port incorrect ou serveur inaccessible)
        Write-Host "Erreur réseau : $($_.Exception.InnerException.Message)"
        } else {
            # Gestion des erreurs réseau ou imprévues
            Write-Host "Erreur inattendue : $($_.Exception.Message)"
        }   
}
