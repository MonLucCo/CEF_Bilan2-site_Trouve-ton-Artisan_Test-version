# Script pour tester l'API Back-End des messages historisés
Write-Host "*** Test amélioré de l'historisation des messages dans le Back-End ***"

# URL du backend
$baseUrl = "http://localhost:3000/api/messages"

# Fonction pour vérifier les réponses HTTP
function Check-Response($response, $description) {
    if ($response -eq $null) {
        Write-Host "$description : OK (Aucune donnée n'a été retournée - Cela peut être normal)"
    } elseif ($response.Count -eq 0) {
        Write-Host "$description : OK (Aucune donnée trouvée, mais réponse valide)"
    } else {
        Write-Host "$description : OK"
    }
}

# 1. Test GET (Récupérer tous les messages)
Write-Host "=== [GET] Récupérer tous les messages ==="
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method GET
    Check-Response $response "Récupération des messages"
    $response | ForEach-Object { Write-Output "Message: $_" }
} catch {
    Write-Host "ERREUR : Impossible de récupérer les messages. $_"
}

# 2. Test POST (Ajouter un message)
Write-Host "=== [POST] Ajouter un message ==="
$newMessage = @{
    id = "5"
    from = "example4@example.com"
    to = "example5@example.com"
    subject = "Hello 5"
    body = "Message content 5"
    date = "2025-03-16"
}
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method POST -Body ($newMessage | ConvertTo-Json -Depth 10) -ContentType "application/json"
    Check-Response $response "Ajout d'un nouveau message"
    Write-Output "Réponse : $response"
} catch {
    Write-Host "ERREUR : Impossible d'ajouter le message. $_"
}

# 3. Test GET (Vérifier l'ajout)
Write-Host "=== [GET] Récupérer tous les messages (vérifier ajout) ==="
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method GET
    Check-Response $response "Récupération après ajout"
    $response | ForEach-Object { Write-Output "Message: $_" }
} catch {
    Write-Host "ERREUR : Impossible de récupérer les messages après l'ajout. $_"
}

# 4. Test DELETE spécifique (Supprimer le message avec ID=1)
Write-Host "=== [DELETE] Supprimer le message avec ID=2 ==="
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/2" -Method DELETE
    Check-Response $response "Suppression du message avec ID=2"
    Write-Output "Réponse : $response"
} catch {
    Write-Host "ERREUR : Impossible de supprimer le message avec ID=2. $_"
}

# 5. Test GET (Vérifier suppression)
Write-Host "=== [GET] Récupérer tous les messages (vérifier suppression) ==="
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method GET
    Check-Response $response "Récupération après suppression"
    $response | ForEach-Object { Write-Output "Message: $_" }
} catch {
    Write-Host "ERREUR : Impossible de récupérer les messages après suppression. $_"
}

# 6. Test DELETE (Supprimer tous les messages)
Write-Host "=== [DELETE] Supprimer tous les messages ==="
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method DELETE
    Check-Response $response "Suppression de tous les messages"
    Write-Output "Réponse : $response"
} catch {
    Write-Host "ERREUR : Impossible de supprimer tous les messages. $_"
}

# 7. Test final GET (Vérifier suppression complète)
Write-Host "=== [GET] Vérification des messages après suppression de tous les messages ==="
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method GET
    Check-Response $response "Vérification finale"
    if ($response -eq $null -or $response.Count -eq 0) {
        Write-Host "Tous les messages ont été correctement supprimés."
    } else {
        $response | ForEach-Object { Write-Output "Message restant: $_" }
    }
} catch {
    Write-Host "ERREUR : Impossible de vérifier les messages après suppression complète. $_"
}

# 8. Test POST (Ajouter un message)
Write-Host "=== [POST] Ajouter un message ==="
$newMessage = @{
    id = "6"
    from = "example4@example.com"
    to = "example5@example.com"
    subject = "Hello 6"
    body = "Message content 6"
    date = "2025-03-16"
}
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method POST -Body ($newMessage | ConvertTo-Json -Depth 10) -ContentType "application/json"
    Check-Response $response "Ajout d'un nouveau message"
    Write-Output "Réponse : $response"
} catch {
    Write-Host "ERREUR : Impossible d'ajouter le message. $_"
}

# 9. Test GET (Vérifier l'ajout)
Write-Host "=== [GET] Récupérer tous les messages (vérifier ajout) ==="
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method GET
    Check-Response $response "Récupération après ajout"
    $response | ForEach-Object { Write-Output "Message: $_" }
} catch {
    Write-Host "ERREUR : Impossible de récupérer les messages après l'ajout. $_"
}

# 10. Test DELETE spécifique (Supprimer le message avec ID=2)
Write-Host "=== [DELETE] Supprimer le message avec ID=2 ==="
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/2" -Method DELETE
    Check-Response $response "Suppression du message avec ID=2"
    Write-Output "Réponse : $response"
} catch {
    Write-Host "ERREUR : Impossible de supprimer le message avec ID=2. $_"
}

# 5. Test GET (Vérifier suppression)
Write-Host "=== [GET] Récupérer tous les messages (vérifier suppression) ==="
try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method GET
    Check-Response $response "Récupération après suppression"
    $response | ForEach-Object { Write-Output "Message: $_" }
} catch {
    Write-Host "ERREUR : Impossible de récupérer les messages après suppression. $_"
}
